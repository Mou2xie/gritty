import { supabase } from './lib/supabaseClient';
import localforage from 'localforage';

let clickPoint = null;//单词的页面坐标
let selectionContext = null;//单词所在的段落（句子数组）
let sentence = null;//单词所在的句子
let currentUrl = null;//单词所在的文章链接

chrome.runtime.onInstalled.addListener(()=>{
    chrome.tabs.create({
        url:'../tutorial.html'
    });
})

//创建右键菜单项
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(
        {
            id: 'translation',
            title: "标记：%s",
            contexts: ["selection"]
        }
    );
});

//message监听器
chrome.runtime.onMessage.addListener((message, sender) => {
    const { action } = message;
    const { tab: { id } } = sender;

    switch (action.type) {
        //获取浏览器本地存储的所有单词
        case 'getStoredWords': {
            localforage.keys()
                .then(res => {
                    chrome.tabs.sendMessage(id, {
                        action: {
                            type: 'storedWords',
                            storedWords: res
                        }
                    })
                });
            break;
        }
        //要翻译的单词
        case 'wordToTranslate': {
            const word = action.wordToTranslate.toLowerCase();

            //找到单词所在句
            let reg = new RegExp(word, 'i');
            for (let _sentence of selectionContext) {
                if (reg.test(_sentence)) {
                    sentence = _sentence;
                    break;
                }
            }

            supabase
                .from('dictionary')
                .select()
                .eq('word', word)
                .then(res => {
                    let { data } = res;
                    chrome.tabs.sendMessage(id, {
                        action: {
                            type: 'wordTranslation',
                            wordTranslation: data
                        }
                    });

                    //如果查到单词
                    if (data.length != 0) {

                        let word_id = data[0].id;

                        //浏览器本地存储
                        localforage.getItem(word)
                            .then(res => {
                                if (!res) {
                                    localforage.setItem(word, word);
                                }
                            });

                        //存储到supabase
                        supabase.auth.getSession().then(res => {

                            console.log(res.data.session);

                            if (res?.data?.session?.user?.id) {

                                let { data: { session: { user: { id, email } } } } = res;

                                supabase.from('words').select().eq('word', word).then(res => {
                                    if (!res.data.length) {
                                        supabase.from('words').insert({
                                            word,
                                            sentence,
                                            url: currentUrl,
                                            user: id,
                                            email,
                                            word_id
                                        })
                                            .then(res => console.log(res));
                                    }
                                });
                            }
                        });
                    }
                });
            break;
        }
        //获取单词所在段落和链接
        case 'selectionContext': {
            selectionContext = action.contextArr;
            currentUrl = action.currentUrl;
            break;
        }
        //获取单词的页面坐标
        case 'openContextMenu': {
            clickPoint = action.clickPoint;
            break;
        }
    }
});

//右键菜单点击事件监听器
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const { selectionText } = info;
    const { id } = tab;

    chrome.tabs.sendMessage(id, {
        action: {
            type: 'selectionText',
            selectionText,
            clickPoint
        }
    });
});


