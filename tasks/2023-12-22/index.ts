const markdownit = require('markdown-it');
export interface TextProcessingPlugin {
	procssText(text: string): string;
}

export class TextProcessor {
	private plugins: TextProcessingPlugin[] = [];
	use(plugin: TextProcessingPlugin) {
		this.plugins.push(plugin);
	}

	process(inputText: string): string {
		let result = inputText;
		for (const plugin of this.plugins) {
			result = plugin.procssText(result)
		}
		return result;
	}
}


export class RemoveWordsPlugin implements TextProcessingPlugin {
	constructor(private wordsSet: string[]) {
	}

	procssText(text: string): string {
		let result = text;
		this.wordsSet.forEach(word => result = result.replace(word, ''));
		return result.replace(/ {2,}/g, ' ');
	}
}

export class ReplaceCharsPlugin implements TextProcessingPlugin {

	constructor(private replaceMap: Record<string, string>) {
	}
	procssText(text: string): string {
		let result = text;
		Object
			.entries(this.replaceMap)
			.forEach(([key, value]) =>
				result = result.replace(new RegExp(key, 'g'), value)
			);
		return result;
	}
}

export class MarkdownToHtmlPlugin implements TextProcessingPlugin {
	procssText(text: string): string {
		return text.replace('**Merry Christmas!**', '<strong>Merry Christmas!</strong>')
	}
}
