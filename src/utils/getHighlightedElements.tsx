const tokenPattern = /\{(.*?)\}/g;

export const getHighlightedElements = (value: string): React.ReactNode[] => {
	const match = value.match(tokenPattern);
	let elements: React.ReactNode[] = [];

	if (match) {
		let remaining = value;

		match.forEach((m, index) => {
			const tokenIndex = remaining.indexOf(m);

			const beforeToken = remaining.slice(0, tokenIndex);
			elements.push(beforeToken);

			const tokenValue = m.replaceAll(/[{}]/g, "");
			elements.push(
				<span className="highlight" key={index}>
					{tokenValue}
				</span>,
			);

			remaining = remaining.slice(m.length + tokenIndex);
		});

		return [...elements, remaining];
	}

	return [value];
};
