import createMediaAtRule from '../util/createMediaAtRule';
import createRules from '../util/createRules';
import rulesFromDefinitions from '../util/rulesFromDefinitions';

export default (config) => {
	const selector = config.plugins && config.plugins.item ? config.plugins.item.selector : 'item';

	const definitions = {
		order: {
			first: { properties: [{ prop: 'order', value: '-9999' }] },
			last: { properties: [{ prop: 'order', value: '9999' }] },
			none: { properties: [{ prop: 'order', value: '0' }] },
			1: { properties: [{ prop: 'order', value: '1' }] },
			2: { properties: [{ prop: 'order', value: '2' }] },
			3: { properties: [{ prop: 'order', value: '3' }] },
			4: { properties: [{ prop: 'order', value: '4' }] },
			5: { properties: [{ prop: 'order', value: '5' }] },
			6: { properties: [{ prop: 'order', value: '6' }] },
			7: { properties: [{ prop: 'order', value: '7' }] },
			8: { properties: [{ prop: 'order', value: '8' }] },
			9: { properties: [{ prop: 'order', value: '9' }] },
			10: { properties: [{ prop: 'order', value: '10' }] },
			11: { properties: [{ prop: 'order', value: '11' }] },
			12: { properties: [{ prop: 'order', value: '12' }] },
		},
		cols: {
			1: { properties: [{ prop: 'grid-column', value: 'span 1 / span 1' }] },
			2: { properties: [{ prop: 'grid-column', value: 'span 2 / span 2' }] },
			3: { properties: [{ prop: 'grid-column', value: 'span 3 / span 3' }] },
			4: { properties: [{ prop: 'grid-column', value: 'span 4 / span 4' }] },
			5: { properties: [{ prop: 'grid-column', value: 'span 5 / span 5' }] },
			6: { properties: [{ prop: 'grid-column', value: 'span 6 / span 6' }] },
			7: { properties: [{ prop: 'grid-column', value: 'span 7 / span 7' }] },
			8: { properties: [{ prop: 'grid-column', value: 'span 8 / span 8' }] },
			9: { properties: [{ prop: 'grid-column', value: 'span 9 / span 9' }] },
			10: { properties: [{ prop: 'grid-column', value: 'span 10 / span 10' }] },
			11: { properties: [{ prop: 'grid-column', value: 'span 11 / span 11' }] },
			12: { properties: [{ prop: 'grid-column', value: 'span 12 / span 12' }] },
		},
		'col-start': {
			1: { properties: [{ prop: 'grid-column-start', value: '1' }] },
			2: { properties: [{ prop: 'grid-column-start', value: '2' }] },
			3: { properties: [{ prop: 'grid-column-start', value: '3' }] },
			4: { properties: [{ prop: 'grid-column-start', value: '4' }] },
			5: { properties: [{ prop: 'grid-column-start', value: '5' }] },
			6: { properties: [{ prop: 'grid-column-start', value: '6' }] },
			7: { properties: [{ prop: 'grid-column-start', value: '7' }] },
			8: { properties: [{ prop: 'grid-column-start', value: '8' }] },
			9: { properties: [{ prop: 'grid-column-start', value: '9' }] },
			10: { properties: [{ prop: 'grid-column-start', value: '10' }] },
			11: { properties: [{ prop: 'grid-column-start', value: '11' }] },
			12: { properties: [{ prop: 'grid-column-start', value: '12' }] },
		},
		'col-end': {
			1: { properties: [{ prop: 'grid-column-end', value: '1' }] },
			2: { properties: [{ prop: 'grid-column-end', value: '2' }] },
			3: { properties: [{ prop: 'grid-column-end', value: '3' }] },
			4: { properties: [{ prop: 'grid-column-end', value: '4' }] },
			5: { properties: [{ prop: 'grid-column-end', value: '5' }] },
			6: { properties: [{ prop: 'grid-column-end', value: '6' }] },
			7: { properties: [{ prop: 'grid-column-end', value: '7' }] },
			8: { properties: [{ prop: 'grid-column-end', value: '8' }] },
			9: { properties: [{ prop: 'grid-column-end', value: '9' }] },
			10: { properties: [{ prop: 'grid-column-end', value: '10' }] },
			11: { properties: [{ prop: 'grid-column-end', value: '11' }] },
			12: { properties: [{ prop: 'grid-column-end', value: '12' }] },
			13: { properties: [{ prop: 'grid-column-end', value: '13' }] },
		},
		rows: {
			1: { properties: [{ prop: 'grid-row', value: 'span 1 / span 1' }] },
			2: { properties: [{ prop: 'grid-row', value: 'span 2 / span 2' }] },
			3: { properties: [{ prop: 'grid-row', value: 'span 3 / span 3' }] },
			4: { properties: [{ prop: 'grid-row', value: 'span 4 / span 4' }] },
			5: { properties: [{ prop: 'grid-row', value: 'span 5 / span 5' }] },
			6: { properties: [{ prop: 'grid-row', value: 'span 6 / span 6' }] },
			7: { properties: [{ prop: 'grid-row', value: 'span 7 / span 7' }] },
			8: { properties: [{ prop: 'grid-row', value: 'span 8 / span 8' }] },
			9: { properties: [{ prop: 'grid-row', value: 'span 9 / span 9' }] },
			10: { properties: [{ prop: 'grid-row', value: 'span 10 / span 10' }] },
			11: { properties: [{ prop: 'grid-row', value: 'span 11 / span 11' }] },
			12: { properties: [{ prop: 'grid-row', value: 'span 12 / span 12' }] },
		},
	};

	const rules = [
		// ...createRules([
		//     { selector: selector, prop: 'display', value: 'block' },
		// ]),
		...rulesFromDefinitions(definitions, selector),
	];

	for (let [name, size] of Object.entries(config.screens)) {
		const mediaAtRule = createMediaAtRule('min-width', size);
		mediaAtRule.append(...rulesFromDefinitions(definitions, selector, name));
		rules.push(mediaAtRule);
	}

	return rules;
};
