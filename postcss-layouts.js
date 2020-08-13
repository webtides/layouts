import postcss from 'postcss';

import container from './src/plugins/container';
import flex from './src/plugins/flex';
import grid from './src/plugins/grid';
import item from './src/plugins/item';

export default postcss.plugin('postcss-layouts', (options = {}) => {
	const config = {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		gap: {
			0: '0',
			4: '4px',
			8: '8px',
			16: '16px',
			24: '24px',
			32: '32px',
			64: '64px',
		},
		plugins: {
			container: {
				selector: 'container',
				center: true,
				defaults: {
					gap: {
						default: '16px',
						// md: '24px',
						// xl: '32px',
					},
				},
			},
			flex: { selector: 'flex' },
			grid: {
				selector: 'grid',
				defaults: {
					gap: {
						default: '16px',
						// md: '24px',
						// xl: '32px',
					},
				},
			},
			item: { selector: 'item' },
		},
		...options,
	};

	return (css) => {
		css.walkAtRules((atRule) => {
			if (atRule.name === 'layouts') {
				const rules = [...container(config), ...flex(config), ...grid(config), ...item(config)];

				rules.forEach((rule) => {
					atRule.parent.insertBefore(atRule, rule);
				});

				atRule.remove();
			}
		});
	};
});
