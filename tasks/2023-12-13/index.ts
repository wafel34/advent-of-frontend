const TEMPLATE_INTERPOLATION_REGEX = /{{\s?\w*\s?}}/g; // {{ some_key }}
const INTERPOLATION_CHARACTERS_REGEX = /(\s|{|})/g; // {{ }} and spaces
const CAESAR_REGEX = /c\d\d?/; // c13, c14 etc.

type DecodeStrategy = (value: string) => string;

const decodeFactory = (decodeType: string): DecodeStrategy => {
	const decodeStrategies: Record<string, DecodeStrategy> = {
		b64: value => atob(value),
		uri: value => decodeURIComponent(value),
		default: () => ''
	};

	const isCaesar = CAESAR_REGEX.test(decodeType);
	if (isCaesar) {
		const shift = Number(decodeType.replace('c', ''));
		return (value) => caesarShift(value, shift);
	}
	return decodeStrategies[decodeType] || decodeStrategies.default;
}

export function decodeMessage(template: string, values: Record<string, string>): string {

	return template.replace(TEMPLATE_INTERPOLATION_REGEX, templateEntry => {
		const templateKey = templateEntry.replace(INTERPOLATION_CHARACTERS_REGEX, '');
		const valueToDecode = values[templateKey];

		if (!valueToDecode) {
			return '';
		}
		const [decodeType, decodeValue] = valueToDecode.split(':');

		const decodeStrategy = decodeFactory(decodeType);

		return decodeStrategy(decodeValue);
	});
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
