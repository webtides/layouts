import createMediaAtRule from "../util/createMediaAtRule";
import createRule from "../util/createRule";
import createRules from "../util/createRules";
import rulesFromDefinitions from "../util/rulesFromDefinitions";

export default function layoutContainer(config) {
    const definitions = {
        gap: {},
        width: {
            fluid: {
                properties: [
                    { prop: 'max-width', value: '100%' },
                ],
            }
        },
    };

    for (let [key, value] of Object.entries(config.gap)) {
        definitions.gap[key] = {
            properties: [
                { prop: 'padding-left', value: value },
                { prop: 'padding-right', value: value },
            ],
        }
    }

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

    for (let [name, size] of Object.entries(config.screens)) {
        const mediaAtRule = createMediaAtRule('min-width', size);
        mediaAtRule.append(createRule({ selector: 'container', prop: 'max-width', value: size }));
        rules.push(mediaAtRule);
    }

    return rules;
}
