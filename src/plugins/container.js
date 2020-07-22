import createMediaAtRule from '../util/createMediaAtRule';
import createRule from '../util/createRule';
import createRules from '../util/createRules';
import rulesFromDefinitions from '../util/rulesFromDefinitions';

export default (config) => {
	const selector = config.plugins && config.plugins.container ? config.plugins.container.selector : 'container';

	const definitions = {
		gap: {},
		width: {
			fluid: {
				properties: [{ prop: 'max-width', value: '100%' }],
			},
		},
	};

	for (let [key, value] of Object.entries(config.gap)) {
		definitions.gap[key] = {
			properties: [
				{ prop: 'padding-left', value: value },
				{ prop: 'padding-right', value: value },
			],
		};
	}

	const rules = [
		...createRules([
			{
				selector: selector,
				properties: [
					{ prop: 'display', value: 'block' },
					{ prop: 'margin-left', value: 'auto' },
					{ prop: 'margin-right', value: 'auto' },
					{ prop: 'width', value: '100%' },
					{ prop: 'max-width', value: '1440px' },
				],
			},
		]),
		...rulesFromDefinitions(definitions, selector),
	];

	for (let [name, size] of Object.entries(config.screens)) {
		const mediaAtRule = createMediaAtRule('min-width', size);
		mediaAtRule.append(createRule({ selector: selector, prop: 'max-width', value: size }));
		rules.push(mediaAtRule);
	}

	return rules;
};
