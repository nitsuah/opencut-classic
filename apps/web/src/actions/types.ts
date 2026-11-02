import type { MutableRefObject } from "react";
import type { TAction } from "./definitions";

export type { TAction };

export type TActionArgsMap = {
	"seek-forward": { seconds: number } | undefined;
	"seek-backward": { seconds: number } | undefined;
	"jump-forward": { seconds: number } | undefined;
	"jump-backward": { seconds: number } | undefined;
	"remove-media-asset": { projectId: string; assetId: string };
	"remove-media-assets": { projectId: string; assetIds: string[] };
};

const TActionArgsMapKeys = [
	"seek-forward",
	"seek-backward",
	"jump-forward",
	"jump-backward",
	"remove-media-asset",
	"remove-media-assets",
] as const satisfies readonly (keyof TActionArgsMap)[];

type TKeysWithValueUndefined<T> = {
	[K in keyof T]: undefined extends T[K] ? K : never;
}[keyof T];

export type TActionWithArgs = keyof TActionArgsMap;

export type TActionWithOptionalArgs =
	| TActionWithNoArgs
	| TKeysWithValueUndefined<TActionArgsMap>;

export type TActionWithNoArgs = Exclude<TAction, TActionWithArgs>;

export type TArgOfAction<A extends TAction> = A extends TActionWithArgs
	? TActionArgsMap[A]
	: undefined;

export type TActionFunc<A extends TAction> = A extends TActionWithArgs
	? (arg: TArgOfAction<A>, trigger?: TInvocationTrigger) => void
	: (_?: undefined, trigger?: TInvocationTrigger) => void;

export type TInvocationTrigger = "keypress" | "mouseclick";

export type TBoundActionList = {
	[A in TAction]?: Array<TActionFunc<A>>;
};

export type TActionHandlerOptions =
	| MutableRefObject<boolean>
	| boolean
	| undefined;

export function isActionWithOptionalArgs(value: string): value is TActionWithOptionalArgs {
	return [
		...TActionArgsMapKeys,
		"play", "pause", "stop", "undo", "redo",
		"copy", "cut", "paste", "delete", "select-all",
		"split", "join", "trim-start", "trim-end",
		"zoom-in", "zoom-out", "zoom-fit", "zoom-reset",
		"next-frame", "prev-frame", "next-keyframe", "prev-keyframe",
		"add-text", "add-image", "add-video", "add-audio",
		"toggle-snapping", "toggle-grid", "toggle-rulers",
		"save", "export", "import", "new-project",
	].includes(value);
}
