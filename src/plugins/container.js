import createMediaAtRule from "../util/createMediaAtRule";
import createRule from "../util/createRule";
import createRules from "../util/createRules";
import rulesFromDefinitions from "../util/rulesFromDefinitions";

export default function layoutContainer(screens, gaps) {
    const definitions = {
        gap: {
            0: {
                properties: [
                    { prop: 'padding-left', value: '0' },
                    { prop: 'padding-right', value: '0' },
                ],
            },
            16: {
                properties: [
                    { prop: 'padding-left', value: '16px' },
                    { prop: 'padding-right', value: '16px' },
                ],
            },
            32: {
                properties: [
                    { prop: 'padding-left', value: '32px' },
                    { prop: 'padding-right', value: '32px' },
                ],
            },
        },
        width: {
            fluid: {
                properties: [
                    { prop: 'max-width', value: '100%' },
                ],
            }
        },
    };

    const rules = [
        ...createRules([
            {
                selector: 'container',
                properties: [
                    { prop: 'display', value: 'block' },
                    { prop: 'margin-left', value: 'auto' },
                    { prop: 'margin-right', value: 'auto' },
                    { prop: 'width', value: '100%' },
                    { prop: 'max-width', value: '1440px' },
                ],
            },
        ]),
        ...rulesFromDefinitions(definitions, 'container'),
    ];

    for (let [name, size] of Object.entries(screens)) {
        const mediaAtRule = createMediaAtRule('min-width', size);
        mediaAtRule.append(createRule({ selector: 'container', prop: 'max-width', value: size }));
        rules.push(mediaAtRule);
    }

    return rules;
}
