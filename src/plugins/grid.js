import createMediaAtRule from "../util/createMediaAtRule";
import createRules from "../util/createRules";
import rulesFromDefinitions from "../util/rulesFromDefinitions";

export default function layoutGrid(config) {
    const definitions = {
        gap: {},
        cols: {
            1: { properties: [{ prop: 'grid-template-columns', value: 'repeat(1, 1fr)' }] },
            2: { properties: [{ prop: 'grid-template-columns', value: 'repeat(2, 1fr)' }] },
            3: { properties: [{ prop: 'grid-template-columns', value: 'repeat(3, 1fr)' }] },
            4: { properties: [{ prop: 'grid-template-columns', value: 'repeat(4, 1fr)' }] },
            5: { properties: [{ prop: 'grid-template-columns', value: 'repeat(5, 1fr)' }] },
            6: { properties: [{ prop: 'grid-template-columns', value: 'repeat(6, 1fr)' }] },
            7: { properties: [{ prop: 'grid-template-columns', value: 'repeat(7, 1fr)' }] },
            8: { properties: [{ prop: 'grid-template-columns', value: 'repeat(8, 1fr)' }] },
            9: { properties: [{ prop: 'grid-template-columns', value: 'repeat(9, 1fr)' }] },
            10: { properties: [{ prop: 'grid-template-columns', value: 'repeat(10, 1fr)' }] },
            11: { properties: [{ prop: 'grid-template-columns', value: 'repeat(11, 1fr)' }] },
            12: { properties: [{ prop: 'grid-template-columns', value: 'repeat(12, 1fr)' }] },
        },
    };

    for (let [key, value] of Object.entries(config.gap)) {
        definitions.gap[key] = {
            properties: [
                { prop: 'grid-gap', value: value },
            ],
        }
    }

    const rules = [
        ...createRules([
            { selector: 'grid', prop: 'display', value: 'grid' },
        ]),
        ...rulesFromDefinitions(definitions, 'grid'),
    ];

    for (let [name, size] of Object.entries(config.screens)) {
        const mediaAtRule = createMediaAtRule('min-width', size);
        mediaAtRule.append(...rulesFromDefinitions(definitions, 'grid', name));
        rules.push(mediaAtRule);
    }

    return rules;
}
