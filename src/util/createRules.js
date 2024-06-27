import createRule from './createRule.js';

export default function createRules(rules, postcss) {
    return rules.map((rule) => createRule(rule, postcss));
}
