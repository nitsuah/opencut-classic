import { expect, test } from "bun:test";
import { getDefaultShortcuts } from "./definitions";
import { isShortcutKey } from "./keybinding";

test("accepts single keys and canonical modifier combinations", () => {
  for (const value of [
    "a",
    "space",
    "ctrl+a",
    "ctrl+shift+z",
    "alt+shift+up",
    "ctrl+alt+a",
    "ctrl+alt+shift+a",
  ]) {
    expect(isShortcutKey(value)).toBe(true);
  }
});

test("rejects non-canonical modifier order, duplicates, and multiple keys", () => {
  for (const value of ["alt+ctrl+a", "shift+ctrl+a", "ctrl+ctrl+a", "a+b", "ctrl++a", "ctrl+unknown"]) {
    expect(isShortcutKey(value)).toBe(false);
  }
});

test("all registered default shortcuts remain valid", () => {
  for (const shortcut of getDefaultShortcuts().keys()) {
    expect(isShortcutKey(shortcut)).toBe(true);
  }
});
