import createMediaAtRule from "../util/createMediaAtRule";
import createRules from "../util/createRules";
import rulesFromDefinitions from "../util/rulesFromDefinitions";

export default function layoutRow(screens) {
    const definitions = {};

    // TODO: maybe I could try this with disply: grid and some auto flow thing?!

    const rules = [
        ...createRules([
            { selector: 'row', prop: 'display', value: 'flex' },
            { selector: 'row', prop: 'flex-wrap', value: 'wrap' },
            { selector: 'row', prop: 'margin-bottom', value: '-32px' },
            { selector: 'row', prop: 'margin-left', value: '-16px' },
            { selector: 'row', prop: 'margin-right', value: '-16px' },
            { selector: 'row > item', prop: 'padding-left', value: '16px' },
            { selector: 'row > item', prop: 'padding-right', value: '16px' },
            { selector: 'row > item', prop: 'margin-bottom', value: '32px' },
        ]),
        ...rulesFromDefinitions(definitions, 'flex'),
    ];

    for (let [name, size] of Object.entries(screens)) {
        const mediaAtRule = createMediaAtRule('min-width', size);
        mediaAtRule.append(...rulesFromDefinitions(definitions, 'row', name));
        rules.push(mediaAtRule);
    }

    return rules;
}
