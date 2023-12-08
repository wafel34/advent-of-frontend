export interface Letter {
	content: string;
	country: 'pl' | 'de' | 'us';
	priority: 'high' | 'medium' | 'low';
}

export interface SortingStrategyInterface {
	sortLetters(letters: Letter[]): Letter[]
}

export class LetterSorter {
	constructor(private sortingStrategy: SortingStrategyInterface) {

	}

	sortLetters(letters: Letter[]): Letter[] {
		return this.sortingStrategy.sortLetters(letters);
	}
}

export class PriorityStrategy implements SortingStrategyInterface {
	private priorityMap = {
		'high': 30,
		'medium': 20,
		'low': 10
	} as const;

	sortLetters(letters: Letter[]): Letter[] {
		return letters.sort((a, b) =>
			this.priorityMap[b.priority] - this.priorityMap[a.priority]
		);
	}
}

export class CountryStrategy implements SortingStrategyInterface {
	sortLetters(letters: Letter[]): Letter[] {
		return letters.sort((a, b) => a.country.localeCompare(b.country));
	}
}

export class LengthStrategy implements SortingStrategyInterface {
	sortLetters(letters: Letter[]): Letter[] {
		return letters.sort((a, b) => a.content.length - b.content.length);
	}
}
