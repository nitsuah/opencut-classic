import { expect, test } from "bun:test";
import { quoteFontFamily } from "./primitives";

test("quotes and escapes font-family strings", () => {
  expect(quoteFontFamily({ fontFamily: 'Open Sans "Display" \\ Test' })).toBe(
    '"Open Sans \\"Display\\" \\\\ Test"',
  );
  expect(quoteFontFamily({ fontFamily: 'Open Sans\n"Display" \\ Test' })).toBe(
    '"Open Sans\\a \\"Display\\" \\\\ Test"',
  );
});
