import { getTextNodes } from './getTextNode';

function markWords(selectedWords, document) {

    const textNodes = getTextNodes(document);

    const wordsList = [...new Set(selectedWords)];

    const regList = [];

    for (let word of wordsList) {
        const _word = word.trim();
        const reg = new RegExp(`\\b${_word}\\b`, 'gi');
        regList.push(reg);
    }

    for (let textNode of textNodes) {
        const { data } = textNode;
        const matchWords = [];
        for (let reg of regList) {
            if (reg.test(data)) {
                const _matchWords = [...new Set(data.match(reg))];
                matchWords = matchWords.concat(_matchWords);
            }
        }

        if (matchWords.length > 0) {
            let innerHTML = data;
            for (let matchWord of matchWords) {
                innerHTML = innerHTML.replace(new RegExp(`\\b${matchWord}\\b`, 'g'), `<ach>${matchWord}</ach>`);
            }
            let injectElement = document.createElement('span');
            injectElement.innerHTML = innerHTML;
            textNode.replaceWith(injectElement);
        }
    }
}

export { markWords }