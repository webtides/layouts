import createMediaAtRule from '../util/createMediaAtRule';
import createRule from '../util/createRule';
import createRules from '../util/createRules';
import rulesFromDefinitions from '../util/rulesFromDefinitions';

export default (config) => {
	const pluginConfig = config.plugins && config.plugins.container ? config.plugins.container : {};
	const selector = pluginConfig ? pluginConfig.selector : 'container';

	// default rules for plugin
	const defaultRules = [
		{ prop: 'display', value: 'block' },
		{ prop: 'width', value: '100%' },
		{ prop: 'max-width', value: pluginConfig.maxWidth || '1440px' },
	];

	// check if container should be centered automatically
	if (pluginConfig.center === true) {
		defaultRules.push({ prop: 'margin-left', value: 'auto' });
		defaultRules.push({ prop: 'margin-right', value: 'auto' });
	}

	// check if default gap is defined in config via plugins
	if (pluginConfig && pluginConfig.defaults) {
		const defaults = pluginConfig.defaults;
		if (defaults.gap && defaults.gap.default) {
			const defaultGap = defaults.gap.default;
			defaultRules.push({ prop: 'padding-left', value: defaultGap });
			defaultRules.push({ prop: 'padding-right', value: defaultGap });
		}
	}

	// all possible attributes/modifiers for plugin
	const definitions = {
		gap: {},
		reset: {},
		width: {
			contained: {
				properties: [{ prop: 'max-width', value: pluginConfig.maxWidth || '1440px' }],
			},
			fluid: {
				properties: [{ prop: 'max-width', value: '100%' }],
			},
			full: {
				properties: [
					{ prop: 'width', value: '100vw' },
					{ prop: 'max-width', value: '100vw' },
				],
			},
		},
	};

	// for each gap definition...
	for (let [key, value] of Object.entries(config.gap)) {
		// add gap rules to definitions
		definitions.gap[key] = {
			properties: [
				{ prop: 'padding-left', value: value },
				{ prop: 'padding-right', value: value },
			],
		};

		// add reset rules (with negative gap values) to definitions
		definitions.reset[key] = {
			properties: [
				{ prop: 'margin-left', value: '-' + value },
				{ prop: 'margin-right', value: '-' + value },
				{ prop: 'width', value: `calc(100% + ${value} + ${value})` },
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
			{
				selector: selector + '[reset]',
				properties: [{ prop: 'max-width', value: 'initial' }],
			},
		]),
		...rulesFromDefinitions(definitions, selector),
	];

	// should we fix the container's width to the current screen
	if (pluginConfig.fixWidthToScreen === true) {
		for (let [name, size] of Object.entries(config.screens)) {
			const mediaAtRule = createMediaAtRule('min-width', size);
			mediaAtRule.append(createRule({ selector: selector, prop: 'max-width', value: size }));
			rules.push(mediaAtRule);
		}
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
