import createMediaAtRule from "../util/createMediaAtRule";
import createRules from "../util/createRules";
import rulesFromDefinitions from "../util/rulesFromDefinitions";

export default function layoutFlex(config) {
    const definitions = {
        direction: {
            col: { prop: 'flex-direction', value: 'column' },
            row: { prop: 'flex-direction', value: 'row' },
        },
        align: {
            stretch: { prop: 'align-items', value: 'stretch' },
            start: { prop: 'align-items', value: 'start' },
            center: { prop: 'align-items', value: 'center' },
            end: { prop: 'align-items', value: 'end' },
            baseline: { prop: 'align-items', value: 'baseline' },
        },
        justify: {
            start: { prop: 'justify-content', value: 'start' },
            center: { prop: 'justify-content', value: 'center' },
            end: { prop: 'justify-content', value: 'end' },
            between: { prop: 'justify-content', value: 'space-between' },
            around: { prop: 'justify-content', value: 'space-around' },
        },
    };

    const rules = [
        ...createRules([
            { selector: 'flex', prop: 'display', value: 'flex' },
            { selector: 'flex', prop: 'align-items', value: 'center' },
            { selector: 'flex', prop: 'justify-content', value: 'space-between' },
        ]),
        ...rulesFromDefinitions(definitions, 'flex'),
    ];

    for (let [name, size] of Object.entries(config.screens)) {
        const mediaAtRule = createMediaAtRule('min-width', size);
        mediaAtRule.append(...rulesFromDefinitions(definitions, 'flex', name));
        rules.push(mediaAtRule);
    }

    return rules;
}
