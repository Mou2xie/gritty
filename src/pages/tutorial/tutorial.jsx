import './tutorial.css';
import { Steps, ConfigProvider } from 'antd';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import a from '../../../assets/a.png';
import b from '../../../assets/b.png';
import c from '../../../assets/c.png';
import d from '../../../assets/d.png';
import e from '../../../assets/e.png';
import f from '../../../assets/f.png';

const Tutorial = () => {

    let [currentPage, setCurrentPage] = useState(0);

    const stepItems = [
        { title: '欢迎' },
        { title: '标记单词' },
        { title: '查看单词' },
        { title: '注册账号' },
    ];

    const pageContent = [
        (
            <div className='outermost1'>
                <div>你好，欢迎使用<span>Gritty</span></div>
                <div>这是一个单词翻译/标记工具</div>
                <div>它能让你在阅读英文网页的同时自然而然提升词汇量</div>
            </div>
        ),
        (
            <div className='outermost2'>
                <div>在网页上标记单词</div>
                <div className='img-list'>
                    <div className='img-item'>
                        <img src={a} alt='01'></img>
                        <div>
                            <div>1</div>
                            <div>选中网页中任意单词。</div>
                        </div>
                    </div>
                    <div className='img-item'>
                        <img src={b} alt='02'></img>
                        <div>
                            <div>2</div>
                            <div>点击鼠标右键，在弹出的菜单中选择Gritty。</div>
                        </div>
                    </div>
                    <div className='img-item'>
                        <img src={c} alt='01'></img>
                        <div>
                            <div>3</div>
                            <div>单词被划线并弹出释义。再次遇到标记的单词点击划线即可查看释义。</div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        (
            <div className='outermost2'>
                <div>查看标记的单词</div>
                <div className='img-list'>
                    <div className='img-item'>
                        <img src={d} alt='01'></img>
                        <div>
                            <div>1</div>
                            <div>点击浏览器地址栏右侧的“拼图”图标。</div>
                        </div>
                    </div>
                    <div className='img-item'>
                        <img src={e} alt='02'></img>
                        <div>
                            <div>2</div>
                            <div>在插件菜单中选择Gritty插件即可查看已标记的单词。</div>
                        </div>
                    </div>
                    <div className='img-item'>
                        <img src={f} alt='01'></img>
                        <div>
                            <div>3</div>
                            <div>点击右侧的“图钉”可以将插件入口固定在地址栏右侧。</div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        (
            <div className='outermost4'>
                <div>现在 开启你的学习之旅吧！</div>
                <div>注册Gritty账号，以便保存标记的单词</div>
                <div className='regBtn' onClick={()=>{
                    chrome.tabs.create({
                        url:'../login.html'
                    });
                }}>注册Gritty账号</div>
            </div>
        )
    ];

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#83D9F4',
                colorText: '#98A6B4',
            }
        }}>
            <div className='page'>
            <Steps className='steps' size='default' current={currentPage} items={stepItems}></Steps>
                <div className='content-container'>
                    {pageContent[currentPage]}
                    {
                        currentPage === 0 ? null : <svg className='prev' viewBox="0 0 1024 1024" width="50" height="50" onClick={() => {
                            setCurrentPage(currentPage - 1);
                        }}>
                            <path d="M512 64.731C264.98 64.731 64.731 264.98 64.731 512S264.98 959.269 512 959.269 959.269 759.02 959.269 512 759.02 64.731 512 64.731zM608.958 641.571c12.178 12.177 12.178 31.919 0 44.097-6.088 6.088-14.068 9.132-22.048 9.132s-15.96-3.044-22.049-9.132l-151.019-151.02c-12.177-12.178-12.177-31.92 0-44.097l152.219-152.219c12.176-12.177 31.919-12.177 44.097 0 12.177 12.177 12.177 31.92 0 44.097L479.987 512.6 608.958 641.571z" fill="#83D9F4" p-id="15485"></path>
                        </svg>
                    }
                    {
                        currentPage === 3 ? null : <svg className='next' viewBox="0 0 1024 1024" width="50" height="50" onClick={() => {
                            setCurrentPage(currentPage + 1);
                        }}>
                            <path d="M512 959.269c247.02 0 447.269-200.249 447.269-447.269S759.02 64.731 512 64.731 64.731 264.98 64.731 512 264.98 959.269 512 959.269zM415.042 382.429c-12.178-12.177-12.178-31.919 0-44.097 6.088-6.088 14.068-9.132 22.048-9.132s15.96 3.044 22.049 9.132l151.019 151.02c12.177 12.178 12.177 31.92 0 44.097L457.939 685.667c-12.176 12.177-31.919 12.177-44.097 0-12.177-12.177-12.177-31.92 0-44.097L544.013 511.4 415.042 382.429z" fill="#83D9F4" p-id="16757"></path>
                        </svg>
                    }
                </div>
            </div>
        </ConfigProvider>

    )
}

const root = createRoot(document.getElementById('root'));
root.render(<Tutorial></Tutorial>);