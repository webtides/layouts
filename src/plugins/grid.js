import createMediaAtRule from "../util/createMediaAtRule";
import createRules from "../util/createRules";
import rulesFromDefinitions from "../util/rulesFromDefinitions";

export default function layoutGrid(screens) {
    const definitions = {
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
        // rows: {
        //     1: { properties: [{ prop: 'grid-row', value: 'span 1' }] },
        //     2: { properties: [{ prop: 'grid-row', value: 'span 2' }] },
        //     3: { properties: [{ prop: 'grid-row', value: 'span 3' }] },
        //     4: { properties: [{ prop: 'grid-row', value: 'span 4' }] },
        //     5: { properties: [{ prop: 'grid-row', value: 'span 5' }] },
        //     6: { properties: [{ prop: 'grid-row', value: 'span 6' }] },
        //     7: { properties: [{ prop: 'grid-row', value: 'span 7' }] },
        //     8: { properties: [{ prop: 'grid-row', value: 'span 8' }] },
        //     9: { properties: [{ prop: 'grid-row', value: 'span 9' }] },
        //     10: { properties: [{ prop: 'grid-row', value: 'span 10' }] },
        //     11: { properties: [{ prop: 'grid-row', value: 'span 11' }] },
        //     12: { properties: [{ prop: 'grid-row', value: 'span 12' }] },
        // },
        gap: {
            0: {
                properties: [
                    { prop: 'grid-gap', value: '0' },
                ],
            },
            8: {
                properties: [
                    { prop: 'grid-gap', value: '8px' },
                ],
            },
            16: {
                properties: [
                    { prop: 'grid-gap', value: '16px' },
                ],
            },
            32: {
                properties: [
                    { prop: 'grid-gap', value: '32px' },
                ],
            },
        },
    };

    const rules = [
        ...createRules([
            { selector: 'grid', prop: 'display', value: 'grid' },
        ]),
        ...rulesFromDefinitions(definitions, 'grid'),
    ];

    for (let [name, size] of Object.entries(screens)) {
        const mediaAtRule = createMediaAtRule('min-width', size);
        mediaAtRule.append(...rulesFromDefinitions(definitions, 'grid', name));
        rules.push(mediaAtRule);
    }

    return rules;
}
