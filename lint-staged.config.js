export default {
    '*.{js}': ['eslint --fix', 'prettier --write'],
    '*.{json,yaml,yml,md}': ['prettier --write'],
};
