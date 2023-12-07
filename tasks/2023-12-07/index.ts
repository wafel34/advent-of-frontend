type Letter = { [key: string]: number };
type ChangeTracker = (item: string, quantity: number) => void;
export function createTrackedLetter(letter: Letter, changeTracker: ChangeTracker): Letter {
	const proxyHandler = {
		set(target: Letter, prop: string, receiver: number) {
			changeTracker(prop, receiver);
			return Reflect.set(target, prop, receiver)
		}
	}
	return new Proxy(letter, proxyHandler);
}
