const TIMEOUT_ERROR = 'TIMEOUT_ERROR';

export async function conductInterviews(
	subjects: string[],
	interview: (subject: string) => Promise<any>,
	timeConstraint: number
): Promise<string[]> {
	const results: string[] = [];

	for (const subject of subjects) {
		try {
			const timeOutPromise = new Promise((resolve) => {
				setTimeout(() => {
					resolve(TIMEOUT_ERROR);
				}, timeConstraint);
			});

			const result = await Promise.race([interview(subject), timeOutPromise]);

			if (result !== TIMEOUT_ERROR) {
				results.push(result);
			}
		} catch (e) {
			if (e instanceof Error) {
				results.push(`Error: ${e.message}`);
			}
		}
	}
	return results;
}
