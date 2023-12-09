export interface Tool {
	init(): void;
	update(): void;
	dispose(): void;
}

export class Equipment {

	private tools: Tool[] = [];
	private initialized = false;

	registerTools(tool: Tool): void {
		this.tools.push(tool);
	}

	initializeTools() {
		this.tools.forEach(t => t.init());
		this.initialized = true;
	}

	updateTools() {
		if (!this.initialized) {
			throw new Error('Cannot update any tools before initialization.');
		}
		this.tools.forEach(t => t.update());
	}

	disposeTools() {
		this.tools.forEach(t => t.dispose());
	}
}
