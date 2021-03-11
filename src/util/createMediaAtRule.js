export default function createMediaAtRule(key, value, postcss) {
	//const newAtRule = postcss.atRule({ name: 'media', params: `(${key}: ${value})` });
	const newAtRule = postcss.parse(`@media (${key}: ${value}) {}`);
	//console.log('test', newAtRule.nodes[0]);
	return newAtRule.nodes[0];
}
