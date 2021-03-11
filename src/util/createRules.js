import createRule from './createRule';

export default function createRules(rules, postcss) {
	return rules.map((rule) => createRule(rule, postcss));
}
