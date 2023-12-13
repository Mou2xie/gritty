import { markWords } from '../lib/markWords';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Anchor } from '../components/Anchor/Anchor';

window.addEventListener('load', () => {
    chrome.runtime.sendMessage({
        action: {
            type: 'getStoredWords'
        }
    });
});

chrome.runtime.onMessage.addListener((message) => {
    const { action } = message;
    if (action.type === 'storedWords') {

        if (action.storedWords.length != 0) {
            const { storedWords } = action;

            markWords(storedWords, document);

            let achList = document.querySelectorAll('ach');

            for (let ach of achList) {
                const root = ReactDOM.createRoot(ach);
                root.render(<Anchor text={ach.innerText}></Anchor>)
            }
        }
    }
});









