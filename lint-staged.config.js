module.exports = {
	'*.{js,json}': ['eslint --fix', 'prettier --write'],
	'*.{yaml,yml,md}': ['prettier --write'],
};
