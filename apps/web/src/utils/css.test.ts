import { expect, test } from "bun:test";
import { escapeCssString } from "./css";

test("escapes quotes and backslashes as CSS string content", () => {
  expect(escapeCssString('Open Sans "Display" \\ Test')).toBe(
    'Open Sans \\"Display\\\" \\\\ Test',
  );
});

test("escapes C0 control characters and DEL", () => {
  expect(escapeCssString("A\tB\rC\nD\u0000\u007f")).toBe(
    "A\\9 B\\d C\\a D\\0 \\7f ",
  );
});
