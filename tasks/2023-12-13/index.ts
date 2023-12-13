const TEMPLATE_INTERPOLATION_REGEX = /{{\s?\w*\s?}}/g;

const decodeStrategies: Record<string, (val: string) => string> = {
	b64: val => atob(val),
	uri: val => decodeURIComponent(val),
	c13: val => caesarShift(val, 13),
	default: val => ''
} as const

export function decodeMessage(template: string, values: Record<string, string>): string {

	return template.replace(TEMPLATE_INTERPOLATION_REGEX, val => {
		const templateKey = val.replace(/(\s|{|})/g, '');
		const templateValue = values[templateKey];

		if (!templateValue) {
			return '';
		}
		const [decodeType, decodeValue] = templateValue.split(':');

		const decodeStrategy = decodeStrategies[decodeType] || decodeStrategies['default'];

		return decodeStrategy(decodeValue);
	})
}
const caesarShift = function (str: string, amount: number): string {
	let resultArray: string[] = [];
	str.split('').forEach((_, i) => {
		let code = str.charCodeAt(i) + amount;
		while (code > 122) {
			code = (code - 122) + 96
		}
		resultArray.push(String.fromCharCode(code));
	})
	return resultArray.join('');
};
