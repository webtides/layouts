module.exports = {
	'*.{js}': ['eslint --fix', 'prettier --write'],
	'*.{yaml,yml,md}': ['prettier --write'],
};
