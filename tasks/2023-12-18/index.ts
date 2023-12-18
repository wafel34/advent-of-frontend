export class RateLimiter {

	attempts = 0;
	constructor(private maxRequests: number, private intervalMs: number) {
		setInterval(() => {
			this.attempts = 0;
		}, intervalMs);
	}

	attemptAccess() {
		if (this.attempts < this.maxRequests) {
			this.attempts++;
			return true;
		}
		return false;
	}
}
