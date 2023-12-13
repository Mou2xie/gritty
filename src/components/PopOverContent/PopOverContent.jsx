import './PopOverContent.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { translationHandler } from '../../lib/translationHandler';

function PopOverContent({ text }) {

    const [wordInfo, setWordInfo] = useState('翻译中');

    useEffect(() => {
        chrome.runtime.sendMessage({
            action: {
                type: 'wordToTranslate',
                wordToTranslate: text
            }
        });
    }, []);

    useEffect(() => {
        function listenerFun(message) {
            const { action } = message;
            if (action.type === 'wordTranslation') {
                const { wordTranslation: [result] } = action;
                // console.log(result);
                if (result) {
                    setWordInfo(translationHandler(result));
                } else {
                    setWordInfo('无结果');
                }

            }

        }
        chrome.runtime.onMessage.addListener(listenerFun);
        return () => {
            chrome.runtime.onMessage.removeListener(listenerFun)
        }
    });

    return (
        <>
            {
                (() => {
                    switch (wordInfo) {
                        case '翻译中': {
                            return (<div className='loading'>翻译中</div>);
                        }
                        case '无结果': {
                            return (<div className='loading'>未查到该单词</div>);
                        }
                        default: {
                            return (
                                <>
                                    <audio autoPlay id='audioPlayer'>
                                        <source src={`http://dict.youdao.com/dictvoice?type=0&audio=${wordInfo.word}`} type='audio/mpeg'></source>
                                    </audio>
                                    <div className='word-card'>
                                        <div>
                                            <div className='word'>{wordInfo.word}</div>
                                            <div>
                                                {
                                                    wordInfo.tag ?
                                                        wordInfo.tag.map((item, index) => {
                                                            if (item === '雅思' || item === '托福' || item === 'GRE' || item === '考研') {
                                                                return (
                                                                    <div className='tag' key={index}>{item}</div>
                                                                )
                                                            }
                                                        })
                                                        : null
                                                }
                                            </div>
                                        </div>
                                        <div className='phonetic_container'>
                                            {
                                                wordInfo.phonetic ? <div className='phonetic'>
                                                    {wordInfo.phonetic}
                                                </div> : null
                                            }
                                            <svg onClick={() => {
                                                let player = document.getElementById('audioPlayer');
                                                player.play();
                                            }} viewBox="0 0 1024 1024" p-id="8587" width="20" height="20"><path d="M525.541411 131.503033l-230.494605 148.031475h-114.988917c-63.895239 0-115.679649 51.14996-115.679649 115.219161v230.898811c0 63.664995 51.150984 115.219161 115.679649 115.219161h114.988917l230.494605 147.915841c32.582069 14.128789 57.840336-0.980327 57.840336-33.04358V164.54559c0-32.120558-25.892717-46.825468-57.840336-33.042557z m194.223516 186.033997c-10.841929-11.649318-29.122271-12.283768-40.712237-1.384533-11.649318 10.899234-12.226462 29.122271-1.384533 40.770565 5.363148 5.76633 14.531971 18.511609 23.989367 37.772279 16.146749 32.870642 25.892717 71.449285 25.892717 115.507733 0 44.058448-9.745968 82.694397-25.892717 115.507734-9.457396 19.259646-18.626219 32.004925-23.989367 37.772278-10.899234 11.648294-10.264784 29.871331 1.384533 40.770566 11.648294 10.899234 29.871331 10.264784 40.770566-1.384533 9.054213-9.68764 21.509896-26.987654 33.620725-51.727105 19.895119-40.483017 31.774681-87.654362 31.774681-140.996245 0-53.341882-11.879562-100.514251-31.774681-140.996244-12.169157-24.62484-24.625864-41.983183-33.679054-51.612495z m176.806845-35.69599c-23.297612-39.444361-46.825468-66.778916-63.318094-81.483826-11.880585-10.609639-30.102598-9.572006-40.714284 2.36486-10.609639 11.936867-9.573029 30.101575 2.364861 40.712238 2.709715 2.421142 8.131191 7.842619 15.396665 16.261358 12.455683 14.416338 24.911366 31.601742 36.619012 51.439556 33.504068 56.860009 53.630455 123.349329 53.630455 199.066825s-20.126386 142.206816-53.68776 199.125153c-11.706623 19.836791-24.220634 37.022195-36.619012 51.438533-7.265474 8.41874-12.68695 13.840216-15.397689 16.261359-11.879562 10.610662-12.916171 28.833699-2.363837 40.714283 10.553357 11.879562 28.833699 12.916171 40.713261 2.363838 16.493649-14.70491 40.021505-41.98216 63.319117-81.483826 38.522362-65.336054 61.646012-141.745305 61.646012-228.41934 0.058328-86.614683-23.066345-163.023934-61.588707-228.361011z" fill="#83D9F4" p-id="8588"></path></svg>
                                        </div>
                                        {
                                            wordInfo.translation.map((item, index) => {
                                                return (
                                                    <div className='translation' key={index}>
                                                        {
                                                            item[0] ? <div className='speech'>{`${item[0]}.`}</div> : null
                                                        }
                                                        <div className='translation-info'>{item[1]}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            wordInfo.exchange ? <div className='line'></div> : null
                                        }
                                        {
                                            wordInfo.exchange ?
                                                wordInfo.exchange.map((item, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                item[0] ?
                                                                    <div className='exchange' key={index}>
                                                                        <div>{item[0]}</div>
                                                                        <div>{item[1]}</div>
                                                                    </div > : null
                                                            }
                                                        </>
                                                    )
                                                })
                                                : null
                                        }
                                    </div >
                                </>
                            )
                        }
                    }
                })()
            }
        </>
    )

}

export { PopOverContent };