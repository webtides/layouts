import createMediaAtRule from '../util/createMediaAtRule';
import createRules from '../util/createRules';
import rulesFromDefinitions from '../util/rulesFromDefinitions';

export default (config, postcss) => {
	const selector = config.plugins && config.plugins.flex ? config.plugins.flex.selector : 'flex';

	const definitions = {
		direction: {
			col: { prop: 'flex-direction', value: 'column' },
			row: { prop: 'flex-direction', value: 'row' },
		},
		align: {
			stretch: { prop: 'align-items', value: 'stretch' },
			start: { prop: 'align-items', value: 'flex-start' },
			'flex-start': { prop: 'align-items', value: 'flex-start' },
			center: { prop: 'align-items', value: 'center' },
			end: { prop: 'align-items', value: 'flex-end' },
			'flex-end': { prop: 'align-items', value: 'flex-end' },
			baseline: { prop: 'align-items', value: 'baseline' },
		},
		justify: {
			start: { prop: 'justify-content', value: 'flex-start' },
			'flex-start': { prop: 'justify-content', value: 'flex-start' },
			center: { prop: 'justify-content', value: 'center' },
			end: { prop: 'justify-content', value: 'flex-end' },
			'flex-end': { prop: 'justify-content', value: 'flex-end' },
			between: { prop: 'justify-content', value: 'space-between' },
			around: { prop: 'justify-content', value: 'space-around' },
		},
	};

	const rules = [
		...createRules(
			[
				{ selector: selector, prop: 'display', value: 'flex' },
				{ selector: selector, prop: 'align-items', value: 'center' },
				{ selector: selector, prop: 'justify-content', value: 'space-between' },
			],
			postcss,
		),
		...rulesFromDefinitions(definitions, selector, undefined, postcss),
	];

	for (let [name, size] of Object.entries(config.screens)) {
		const mediaAtRule = createMediaAtRule('min-width', size, postcss);
		mediaAtRule.append(...rulesFromDefinitions(definitions, selector, name, postcss));
		rules.push(mediaAtRule);
	}

	return rules;
};
