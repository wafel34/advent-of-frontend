type QueueEntry<T> = {
	priority: number;
	data: T
}


export class ChristmasQueue<T> {

	private queue: QueueEntry<T>[] = [];

	isEmpty() {
		return this.queue.length === 0;
	}

	enqueue(item: T, priority: number) {
		this.queue.push({priority, data: item});
		this.queue.sort((a,b) => b.priority - a.priority);
	}

	dequeue(): T {
		const item = this.queue.shift();
		if (!item) {
			throw new Error('There are no letters in the queue!');
		}
		return item.data;
	}
}
