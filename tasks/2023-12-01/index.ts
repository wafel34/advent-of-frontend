// Tutaj skopiuj kod zadania
export class GiftRegistry {

	private giftsCollection: Map<number, Set<string>> = new Map();
	addGift(childId: number, gift: string) {
		const gifts = this.giftsCollection.get(childId);
		if (gifts) {
			gifts.add(gift);
			return;
		}
		this.giftsCollection.set(childId, new Set([gift]));
	}

	getGiftsForChild(childId: number): string[] {
		const gifts = this.giftsCollection.get(childId);

		if (!gifts) {
			throw new Error('Id does not exist');
		}

		return Array.from(gifts);
	}

	removeGift(childId: number, gift: string) {
		const gifts = this.giftsCollection.get(childId);

		if (!gifts || !gifts.has(gift)) {
			throw new Error('Gift not found')
		}

		return gifts.delete(gift);
	}
}
