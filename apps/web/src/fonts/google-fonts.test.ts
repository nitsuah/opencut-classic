import { expect, test } from "bun:test";
import { clearFontAtlasCache, loadFullFont } from "./google-fonts";

test("loadFullFont uses CSS string escaping, not URL encoding, for font-family", async () => {
  clearFontAtlasCache();
  const fontLoads: string[] = [];
  const listeners = new Map<string, () => void>();
  const link = {
    rel: "",
    href: "",
    addEventListener: (type: string, listener: () => void) => {
      listeners.set(type, listener);
    },
  };
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const fakeDocument = {
    createElement: () => link,
    head: {
      appendChild: () => queueMicrotask(() => listeners.get("load")?.()),
    },
    fonts: {
      load: async (font: string) => {
        fontLoads.push(font);
        return [];
      },
    },
  };

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    writable: true,
    value: fakeDocument,
  });

  try {
    await loadFullFont({
      family: 'A&B\nOpen Sans "Display" \\ Test',
      weights: [400],
    });
    expect(fontLoads).toEqual(['400 16px "A&B\\a Open Sans \\"Display\\" \\\\ Test"']);
    expect(link.href).toContain("family=A%26B%0AOpen+Sans+%22Display%22+%5C+Test");
  } finally {
    clearFontAtlasCache();
    if (previousDocument) {
      Object.defineProperty(globalThis, "document", previousDocument);
    } else {
      Reflect.deleteProperty(globalThis, "document");
    }
  }
});
