const STATE_UNKNOWN = 'unknown';

export class OrderController {

	private machines: Machine[] = [];
	registerMachine(machine: Machine) {
		this.machines.push(machine)
	}

	setState(state: string) {
		if (state === STATE_UNKNOWN) {
			throw new Error('Invalid state provided');
		}
		this.machines.forEach(m => m.setState(state));
	}

	unregisterMachine(machine: Machine) {
		this.machines = this.machines.filter(m => m !== machine);
	}
}

export class Machine {

	private stateRegistry: string[] = [];
	state: string | null =  null;

	performAudit(): string[] {
		return this.stateRegistry.map((state, i) => `Order #${i + 1} - ${state}`)
	}

	setState(state: string): void {
		this.stateRegistry.push(state);
		this.state = state;
	}
}
