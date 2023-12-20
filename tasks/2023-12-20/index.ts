type MapFn = (val: string) => string;

export class GiftStream {

	private convertedGifts = [...this.gitfts];
	constructor(private gitfts: string[]) {
	}

	map(mapFn: MapFn): this {
		this.convertedGifts = this.convertedGifts.map(mapFn);
		return this;
	}

	skip(number: number): this {
		this.convertedGifts = this.convertedGifts.filter((gift, i) => i+1 > number);
		return this;
	}

	take(number: number): this {
		this.convertedGifts = this.convertedGifts.filter((gift, i) => i+1 <= number);
		return this;
	}

	getGifts(): string[] {
		return this.convertedGifts;
	}
}
