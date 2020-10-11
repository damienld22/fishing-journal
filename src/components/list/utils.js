export function sortElementsByCategory(elements) {
	const result = [];
	elements.forEach(elt => {
		const indexCategory = result.findIndex(item => item.category === elt.category);
		if (indexCategory > -1) {
			result[indexCategory] = {category: elt.category, elements: [...result[indexCategory].elements, {id: elt.id, category: elt.category, name: elt.name, checked: elt.checked}]};
		} else {
			result.push({
				category: elt.category,
				elements: [{id: elt.id, name: elt.name, checked: elt.checked, category: elt.category}]
			});
		}
	});

	return result;
}
