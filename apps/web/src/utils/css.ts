export function escapeCssString(value: string): string {
	return value
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/[\0-\x1f\x7f]/g, (character) => `\\${character.charCodeAt(0).toString(16)} `);
}
