import createMediaAtRule from '../util/createMediaAtRule';
import createRule from '../util/createRule';
import createRules from '../util/createRules';
import rulesFromDefinitions from '../util/rulesFromDefinitions';

export default (config) => {
	const selector = config.plugins && config.plugins.container ? config.plugins.container.selector : 'container';
	// default rules for plugin
	const defaultRules = [
		{ prop: 'display', value: 'block' },
		{ prop: 'margin-left', value: 'auto' },
		{ prop: 'margin-right', value: 'auto' },
		{ prop: 'width', value: '100%' },
		{ prop: 'max-width', value: '1440px' },
	];

	// check if default gap and reset is defined in config via plugins
	if (config.plugins && config.plugins.container && config.plugins.container.defaults) {
		const defaults = config.plugins.container.defaults;
		if (defaults.gap && defaults.gap.default) {
			const defaultGap = defaults.gap.default;
			defaultRules.push({ prop: 'padding-left', value: defaultGap });
			defaultRules.push({ prop: 'padding-right', value: defaultGap });
		}

		if (defaults.reset && defaults.reset.default) {
			const defaultReset = defaults.reset.default;
			defaultRules.push({ prop: 'margin-left', value: defaultReset });
			defaultRules.push({ prop: 'margin-right', value: defaultReset });
		}
	}

	// all possible attributes/modifiers for plugin
	const definitions = {
		gap: {},
		reset: {},
		width: {
			fluid: {
				properties: [{ prop: 'max-width', value: '100%' }],
			},
		},
	};

	// add gap rules to definitions
	for (let [key, value] of Object.entries(config.gap)) {
		definitions.gap[key] = {
			properties: [
				{ prop: 'padding-left', value: value },
				{ prop: 'padding-right', value: value },
			],
		};
	}

	// add reset rules to definitions
	for (let [key, value] of Object.entries(config.reset)) {
		definitions.reset[key] = {
			properties: [
				{ prop: 'margin-left', value: value },
				{ prop: 'margin-right', value: value },
			],
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
		mediaAtRule.append(createRule({ selector: selector, prop: 'max-width', value: size }));
		rules.push(mediaAtRule);
	}

	// create responsive rules for definitions with modifier
	for (let [name, size] of Object.entries(config.screens)) {
		const mediaAtRule = createMediaAtRule('min-width', size);
		mediaAtRule.append(...rulesFromDefinitions(definitions, selector, name));
		rules.push(mediaAtRule);
	}

	// create responsive rules for defaults
	if (config.plugins && config.plugins.container && config.plugins.container.defaults) {
		const defaults = config.plugins.container.defaults;
		if (defaults.gap) {
			for (let [viewport, value] of Object.entries(defaults.gap)) {
				if (viewport === 'default') continue;

				// either viewport is a key from config.screens map - otherwise assume viewport is size in px
				const size = config.screens[viewport] || viewport;
				const mediaAtRule = createMediaAtRule('min-width', size);
				mediaAtRule.append(createRule({ selector: selector, prop: 'padding-left', value: value }));
				mediaAtRule.append(createRule({ selector: selector, prop: 'padding-right', value: value }));
				rules.push(mediaAtRule);
			}
		}

		if (defaults.reset) {
			for (let [viewport, value] of Object.entries(defaults.reset)) {
				if (viewport === 'default') continue;

				// either viewport is a key from config.screens map - otherwise assume viewport is size in px
				const size = config.screens[viewport] || viewport;
				const mediaAtRule = createMediaAtRule('min-width', size);
				mediaAtRule.append(createRule({ selector: selector, prop: 'margin-left', value: value }));
				mediaAtRule.append(createRule({ selector: selector, prop: 'margin-right', value: value }));
				rules.push(mediaAtRule);
			}
		}
	}

	return rules;
};
