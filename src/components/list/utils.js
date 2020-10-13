export function sortElementsByCategory(elements) {
	const result = [];
	elements.forEach(elt => {
		const indexCategory = result.findIndex(item => item.category === elt.category);
		if (indexCategory > -1) {
			result[indexCategory] = {
				category: elt.category,
				elements: [...result[indexCategory].elements, {...elt}]};
		} else {
			result.push({
				category: elt.category,
				elements: [{...elt}]
			});
		}
	});

	return result;
}
