import createMediaAtRule from '../util/createMediaAtRule';
import createRules from '../util/createRules';
import rulesFromDefinitions from '../util/rulesFromDefinitions';
import createRule from '../util/createRule';

export default (config) => {
	const pluginConfig = config.plugins && config.plugins.grid ? config.plugins.grid : undefined;
	const selector = pluginConfig ? pluginConfig.selector : 'grid';

	// default rules for plugin
	const defaultRules = [{ prop: 'display', value: 'grid' }];

	// check if default gap is defined in plugin config
	if (pluginConfig && pluginConfig.defaults) {
		const defaults = pluginConfig.defaults;
		if (defaults.gap && defaults.gap.default) {
			const defaultValue = defaults.gap.default;
			defaultRules.push({ prop: 'grid-gap', value: defaultValue });
		}
	}

	// all possible attributes/modifiers for plugin
	const definitions = {
		gap: {},
		rows: {
			1: { properties: [{ prop: 'grid-template-rows', value: 'repeat(1, minmax(0, 1fr))' }] },
			2: { properties: [{ prop: 'grid-template-rows', value: 'repeat(2, minmax(0, 1fr))' }] },
			3: { properties: [{ prop: 'grid-template-rows', value: 'repeat(3, minmax(0, 1fr))' }] },
			4: { properties: [{ prop: 'grid-template-rows', value: 'repeat(4, minmax(0, 1fr))' }] },
			5: { properties: [{ prop: 'grid-template-rows', value: 'repeat(5, minmax(0, 1fr))' }] },
			6: { properties: [{ prop: 'grid-template-rows', value: 'repeat(6, minmax(0, 1fr))' }] },
			7: { properties: [{ prop: 'grid-template-rows', value: 'repeat(7, minmax(0, 1fr))' }] },
			8: { properties: [{ prop: 'grid-template-rows', value: 'repeat(8, minmax(0, 1fr))' }] },
			9: { properties: [{ prop: 'grid-template-rows', value: 'repeat(9, minmax(0, 1fr))' }] },
			10: { properties: [{ prop: 'grid-template-rows', value: 'repeat(10, minmax(0, 1fr))' }] },
			11: { properties: [{ prop: 'grid-template-rows', value: 'repeat(11, minmax(0, 1fr))' }] },
			12: { properties: [{ prop: 'grid-template-rows', value: 'repeat(12, minmax(0, 1fr))' }] },
		},
		cols: {
			1: { properties: [{ prop: 'grid-template-columns', value: 'repeat(1, minmax(0, 1fr))' }] },
			2: { properties: [{ prop: 'grid-template-columns', value: 'repeat(2, minmax(0, 1fr))' }] },
			3: { properties: [{ prop: 'grid-template-columns', value: 'repeat(3, minmax(0, 1fr))' }] },
			4: { properties: [{ prop: 'grid-template-columns', value: 'repeat(4, minmax(0, 1fr))' }] },
			5: { properties: [{ prop: 'grid-template-columns', value: 'repeat(5, minmax(0, 1fr))' }] },
			6: { properties: [{ prop: 'grid-template-columns', value: 'repeat(6, minmax(0, 1fr))' }] },
			7: { properties: [{ prop: 'grid-template-columns', value: 'repeat(7, minmax(0, 1fr))' }] },
			8: { properties: [{ prop: 'grid-template-columns', value: 'repeat(8, minmax(0, 1fr))' }] },
			9: { properties: [{ prop: 'grid-template-columns', value: 'repeat(9, minmax(0, 1fr))' }] },
			10: { properties: [{ prop: 'grid-template-columns', value: 'repeat(10, minmax(0, 1fr))' }] },
			11: { properties: [{ prop: 'grid-template-columns', value: 'repeat(11, minmax(0, 1fr))' }] },
			12: { properties: [{ prop: 'grid-template-columns', value: 'repeat(12, minmax(0, 1fr))' }] },
		},
	};

	// add gap rules to definitions
	for (let [key, value] of Object.entries(config.gap)) {
		definitions.gap[key] = {
			properties: [{ prop: 'grid-gap', value: value }],
		};
	}

	// create default rules
	const rules = [
		...createRules([
			{
				selector: selector,
				properties: defaultRules,
			},
		]),
		...rulesFromDefinitions(definitions, selector),
	];

	// create responsive rules for definitions
	for (let [name, size] of Object.entries(config.screens)) {
		const mediaAtRule = createMediaAtRule('min-width', size);
		mediaAtRule.append(...rulesFromDefinitions(definitions, selector, name));
		rules.push(mediaAtRule);
	}

	// create responsive rules for defaults
	if (pluginConfig && pluginConfig.defaults) {
		const defaults = pluginConfig.defaults;
		if (defaults.gap) {
			for (let [viewport, value] of Object.entries(defaults.gap)) {
				if (viewport === 'default') continue;

				// either viewport is a key from config.screens map - otherwise assume viewport is size in px
				const size = config.screens[viewport] || viewport;
				const mediaAtRule = createMediaAtRule('min-width', size);
				mediaAtRule.append(createRule({ selector: selector, prop: 'grid-gap', value: value }));
				rules.push(mediaAtRule);
			}
		}
	}

	return rules;
};
