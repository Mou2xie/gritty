import React from 'react';
import ReactDOM from 'react-dom/client';
import { markWords } from '../lib/markWords';
import { countDistance } from '../lib/countDistance';
import { Anchor } from '../components/Anchor/Anchor';

document.addEventListener('contextmenu', (e) => {

    const x = e.clientX;
    const y = e.clientY;
    const clickPoint = { x, y };

    chrome.runtime.sendMessage({
        action: {
            type: 'openContextMenu',
            clickPoint
        }
    });
});

document.addEventListener('selectionchange', (e) => {
    let contextArr = window.getSelection().anchorNode.parentElement.textContent.split('.');
    var currentUrl = window.location.href;

    chrome.runtime.sendMessage({
        action: {
            type: 'selectionContext',
            contextArr,
            currentUrl
        }
    });
})

chrome.runtime.onMessage.addListener((message) => {
    const { action } = message;
    if (action.type === 'selectionText') {

        const rootList = [];

        markWords([action.selectionText], document);

        let achList = document.querySelectorAll('ach');

        for (let ach of achList) {
            const root = ReactDOM.createRoot(ach);
            root.render(<Anchor text={ach.innerText}></Anchor>);
            rootList.push(root);
        }

        setTimeout(() => {
            for (let root of rootList) {
                root.distance = countDistance(action.clickPoint, root._internalRoot.containerInfo)
            }
            rootList.sort((a, b) => a.distance - b.distance);
            rootList[0]._internalRoot.containerInfo.children[0].click();
        }, 500)
    }
});



