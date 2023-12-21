export class InjectionToken<T> {
	constructor(public token: T) {
	}
}

export class FactoryInjector {

	private injector = new Map();

	registerClass<T>(token: new(...args: any) => T) {
		this.injector.set(token, new token());
	}

	get<T>(token: InjectionToken<T> | (new (args: any) => T)) {
		const instance = this.injector.get(token);

		if (!instance) {
			throw new Error(`No class registered for token: ${token}`);
		}

		return instance;
	}

	provideValue<T>(TOKEN: InjectionToken<T>, gloves: string) {
		this.injector.set(TOKEN, gloves);
	}
}

