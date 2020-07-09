import createRule from './createRule';

export default function createRules(rules) {
	return rules.map((rule) => createRule(rule));
}
