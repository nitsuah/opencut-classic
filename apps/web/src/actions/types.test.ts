import { expect, test } from "bun:test";
import { isActionWithOptionalArgs } from "./types";

test("accepts no-argument and optional-argument actions", () => {
  for (const action of [
    "toggle-play",
    "copy-selected",
    "seek-forward",
    "seek-backward",
    "jump-forward",
    "jump-backward",
  ]) {
    expect(isActionWithOptionalArgs(action)).toBe(true);
  }
});

test("rejects actions whose arguments are required and unknown actions", () => {
  expect(isActionWithOptionalArgs("remove-media-asset")).toBe(false);
  expect(isActionWithOptionalArgs("remove-media-assets")).toBe(false);
  expect(isActionWithOptionalArgs("not-an-action")).toBe(false);
});
