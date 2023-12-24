abstract class Component {
	abstract template(): string;
	public state: Record<string, any> = {
		...this.props
	}
	constructor(private props?: Record<string, any>, public style?: string) {
	}

	setState(state: Record<string, any>): void {
		this.state = state;
	}

}

function renderComponent(component: Component): string {
	return component.template();

}

export { Component, renderComponent };
