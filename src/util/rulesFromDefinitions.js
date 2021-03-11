import createRule from './createRule';

export default function rulesFromDefinitions(definitions, selector, modifier, postcss) {
	const rules = [];
	for (let [attribute, definition] of Object.entries(definitions)) {
		for (let [key, value] of Object.entries(definition)) {
			rules.push(
				createRule({
					selector: `${selector}[${attribute}~='${modifier ? modifier + ':' : ''}${key}']`,
					...value,
				}, postcss),
			);
		}
	}
	return rules;
}
