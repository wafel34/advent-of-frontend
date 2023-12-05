export class ChristmasEmitter {

	private eventsRegistry: Record<string, Function[]> = {};

	on(event: string, letterCallback: Function) {
		this.eventsRegistry[event] = this.eventsRegistry[event] || [];
		this.eventsRegistry[event].push(letterCallback);
	}

	emit(event: string) {
		if (!this.eventsRegistry[event]) {
			return;
		}
		this.eventsRegistry[event].forEach(c => c());
	}

	off(event: string, mockCallback: Function) {
		if (!this.eventsRegistry[event]) {
			return;
		}
		this.eventsRegistry[event] = this.eventsRegistry[event].filter(fn => fn !== mockCallback);
	}
}
