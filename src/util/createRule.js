export default function createRule(rule, postcss) {
	// const newRule = postcss.rule({ selector: rule.selector });
	// newRule.append({ prop: rule.prop, value: rule.value });
	let newRule;

	if (rule.properties) {
		newRule = postcss.parse(`${rule.selector} {
			${rule.properties
				.map((property) => {
					return `${property.prop}: ${property.value};`;
				})
				.join('')}
		 }`);
	} else {
		newRule = postcss.parse(`${rule.selector} { ${rule.prop}: ${rule.value}; }`);
	}
	//console.log('rule', newRule.nodes[0]);
	return newRule.nodes[0];
}
