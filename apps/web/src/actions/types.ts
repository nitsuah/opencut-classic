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

const ACTIONS_WITH_OPTIONAL_ARGS = new Set<TActionWithOptionalArgs>([
	"toggle-play",
	"stop-playback",
	"seek-forward",
	"seek-backward",
	"frame-step-forward",
	"frame-step-backward",
	"jump-forward",
	"jump-backward",
	"goto-start",
	"goto-end",
	"split",
	"split-left",
	"split-right",
	"delete-selected",
	"copy-selected",
	"paste-copied",
	"toggle-snapping",
	"toggle-ripple-editing",
	"toggle-source-audio",
	"select-all",
	"cancel-interaction",
	"deselect-all",
	"duplicate-selected",
	"toggle-elements-muted-selected",
	"toggle-elements-visibility-selected",
	"toggle-bookmark",
	"undo",
	"redo",
]);

export function isActionWithOptionalArgs(value: unknown): value is TActionWithOptionalArgs {
	return (
		typeof value === "string" &&
		ACTIONS_WITH_OPTIONAL_ARGS.has(value as TActionWithOptionalArgs)
	);
}
