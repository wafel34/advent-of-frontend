export type Gift = {
	value: number;
	weight: number;
	volume: number;
};

export function calculateMaxGiftValue(gifts: Gift[], maxWeight: number, maxVolume: number): number {
	const sortedGifts = [...gifts].sort((a,b ) => b.value - a.value);
	let highestValue = 0;

	for (let i = 0; i < sortedGifts.length; i++) {
		const topLevelGift = sortedGifts[i];
		let currentWeight = 0;
		let currentVolume = 0;
		let currentValue = 0;

		if (topLevelGift.weight <= maxWeight && topLevelGift.volume <= maxVolume) {
			currentWeight = topLevelGift.weight;
			currentVolume = topLevelGift.volume;
			currentValue = topLevelGift.value;
		}

		for (let j = 0; j < sortedGifts.length; j++) {
			const innterLevelGifgt = sortedGifts[j];
			if (topLevelGift === innterLevelGifgt) {
				continue;
			}
			const weightCandidate = currentWeight + innterLevelGifgt.weight;
			const volumeCandidate = currentVolume + innterLevelGifgt.volume;
			const valueCandidate = currentValue + innterLevelGifgt.value

			if (weightCandidate <= maxWeight && volumeCandidate <= maxVolume) {
				currentWeight = weightCandidate;
				currentVolume = volumeCandidate;
				currentValue = valueCandidate;
			}
		}

		if (currentValue > highestValue) {
			highestValue = currentValue;
		}
		console.log(`gift ${i}: weight: ${currentWeight}, volume: ${currentVolume}, value: ${currentValue}`)
	}
	return highestValue;
}
