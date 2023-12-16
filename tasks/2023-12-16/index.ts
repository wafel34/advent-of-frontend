type GalacticHistoryTracer<T> = {
	add(andromeda: T): void;
	undo(): void;
	current(): T | null;
	redo(): any;
};

export function createTracer<T>(): GalacticHistoryTracer<T> {
	return new Tracer<T>();
}

class Tracer<T> implements GalacticHistoryTracer<T>{
	private previousStates: (T | null)[] = [];
	private currentState: T | null = null;
	private nextStates: (T | null) [] = [];
	add(value: T): void {
		this.nextStates = [];
		this.previousStates.push(this.currentState);
		this.currentState = value;
	}

	current(): T | null {
		return this.currentState;
	}

	undo(): void {
		this.nextStates.unshift(this.currentState);
		this.currentState = this.previousStates.pop() || null;
	}

	redo(): any {
		const nextState = this.nextStates.shift();

		if (!nextState) {
			throw new Error('No more galaxies to explore');
		}

		this.previousStates.push(this.currentState)
		this.currentState = nextState;
	}


}
