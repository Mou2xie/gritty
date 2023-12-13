function getTextNodes(document) {

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];

    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (
            node.parentElement.nodeType == 1
            && node.parentElement.nodeName !== 'SCRIPT'
            && node.parentElement.nodeName !== 'NOSCRIPT'
            && node.parentElement.nodeName !== 'STYLE'
            && node.data.trim() !== "\n"
            && node.data.trim() !== ""
        ) {
            textNodes.push(node);
        }
    }

    return textNodes
}

export { getTextNodes }