export const getFormattedDate = (timespan: string) => {
	const date = Number(timespan);
	if (date + 24 * 60 * 60 * 1000 > Date.now()) {
		const diff = Date.now() - date;

		const h = Math.trunc(diff / 1000 / 60 / 60);
		const m = Math.trunc((diff - h * 60 * 60 * 1000) / 60 / 1000);

		if (h === 0 && m === 0) {
			return 'just now';
		}

		return `${h ? h === 1 ? h + ' hour' : h + ' hours' : ''} ${((h && m > 0) || !h) ? (m === 1 ? m + ' minute' : m + ' minutes') : ''} ago`;
	} else {
		const dateValue = new Date(date);
		return `${('0' + dateValue.getDate()).slice(-2)}.${('0' + dateValue.getMonth()).slice(-2)}.${dateValue.getFullYear()}`;
	}
}