import { describe, expect, test } from "bun:test";
import { parseSrt } from "./srt";

describe("parseSrt", () => {
	test("parses numbered cues", () => {
		const result = parseSrt({
			input:
				"1\n00:00:01,000 --> 00:00:02,500\nHello\n\n2\n00:00:03,000 --> 00:00:04,000\nWorld",
		});
		expect(result.skippedCueCount).toBe(0);
		expect(result.captions).toEqual([
			{ text: "Hello", startTime: 1, duration: 1.5 },
			{ text: "World", startTime: 3, duration: 1 },
		]);
	});

	test("parses cues without an index and with CRLF", () => {
		const result = parseSrt({
			input: "00:00:00.500   -->   00:00:01.000\r\nHi",
		});
		expect(result.captions).toEqual([
			{ text: "Hi", startTime: 0.5, duration: 0.5 },
		]);
	});

	test("skips malformed cues", () => {
		const result = parseSrt({
			input:
				"1\n00:00:02,000 --> 00:00:01,000\nBackwards\n\n2\nnot a time --> nope\nBad\n\n3\n00:00:01,000 --> 00:00:02,000\n",
		});
		expect(result.captions).toEqual([]);
		expect(result.skippedCueCount).toBe(3);
	});

	test("keeps markup in cue text as plain text without stripping", () => {
		const result = parseSrt({
			input: "1\n00:00:01,000 --> 00:00:02,000\n<b>Bold</b> <!-- x -->",
		});
		expect(result.captions[0]?.text).toBe("<b>Bold</b> <!-- x -->");
	});

	test("returns empty result for blank input", () => {
		expect(parseSrt({ input: "  \n" })).toEqual({
			captions: [],
			skippedCueCount: 0,
			warnings: [],
		});
	});
});
