import postcss from'postcss';

import container from "./src/plugins/container";
import flex from "./src/plugins/flex";
import row from "./src/plugins/row";

export default postcss.plugin('postcss-layouts', function (options) {
	options = options || {};

	return function (css) {
		css.walkAtRules((atRule) => {
			if (atRule.name === 'layouts') {
				console.log('found @layouts', atRule);

				const screens = {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
				};

				const gaps = {
					0: '0',
					4: '4px',
					8: '8px',
					16: '16px',
					24: '24px',
					32: '32px',
					64: '64px',
				};

				const rules = [...container(screens, gaps), ...flex(screens), ...row(screens)];
				//const rules = [];

				rules.forEach((rule) => {
					atRule.parent.insertBefore(atRule, rule);
				});

				atRule.remove();
			}
		});
	};
});
