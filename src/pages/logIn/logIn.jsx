import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { verifyEmail, verifyPassWord } from '../../lib/verifyInput';
import { supabase } from '../../lib/supabaseClient';
import { Loading } from '../../components/Loading/Loading';
import { ConfigProvider } from 'antd';
import './logIn.css';

function LogIn() {

    const [pageState, setPageState] = useState('logIn');
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(res => {
            const { data: { session } } = res;
            if (session) {
                chrome.tabs.update({
                    url: '../../../home.html?item=0'
                });
            }
        })
    }, []);

    let pageContent = null;

    (function () {
        switch (pageState) {
            case 'logIn': {
                pageContent = (
                    <div className='outer-most'>
                        <Loading isLoading={isLoading} size={'large'}></Loading>
                        <div className='title'>欢迎使用<span>Gritty</span></div>
                        <div className='subtitle'>登录Gritty，保存与回顾标记的单词</div>
                        <input placeholder='邮箱' onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input placeholder='密码' onChange={(e) => { setPassWord(e.target.value) }}></input>
                        <div className='btn'>
                            <div onClick={() => {
                                if (
                                    verifyEmail(email) && verifyPassWord(passWord)
                                ) {
                                    setLoading(true);

                                    supabase.auth.signInWithPassword({
                                        email,
                                        password: passWord
                                    }).then(
                                        res => {
                                            setLoading(false);

                                            if (!res.data.session) {
                                                alert('登录失败，请确认账号和密码后再次尝试。')
                                            } else {
                                                chrome.tabs.update({
                                                    url: '../../../home.html?item=0'
                                                });
                                            }
                                        }
                                    ).catch(
                                        err => console.log(err)
                                    );
                                } else {
                                    alert('邮箱或密码有误，请确认后再次尝试。');
                                }
                            }}>登录</div>
                            <div></div>
                        </div>
                        <div onClick={() => {
                            clearInputValue();
                            setPageState('signUp');
                        }}>注册账号</div>
                    </div >
                );
                break;
            }
            case 'signUp': {
                pageContent = (
                    <div className='outer-most'>
                        <Loading isLoading={isLoading} size={'large'}></Loading>
                        <div className='title'>注册新账号</div>
                        <div className='subtitle'>请使用常用电子邮箱注册</div>
                        <input placeholder='邮箱' onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input placeholder='密码' onChange={(e) => { setPassWord(e.target.value) }}></input>
                        <div className='btn'>
                            <div onClick={() => {
                                if (
                                    verifyEmail(email) && verifyPassWord(passWord)
                                ) {
                                    setLoading(true);

                                    supabase.auth.signUp({
                                        email,
                                        password: passWord
                                    }).then(res => {
                                        setLoading(false);

                                        if (res.data.user) {
                                            setPageState('validation');
                                        }
                                    }).catch(err => {
                                        console.log(err);
                                    });
                                } else {
                                    alert('邮箱或密码有误，请确认后再次尝试。');
                                }
                            }}>注册</div>
                            <div></div>
                        </div>
                        <div onClick={() => {
                            clearInputValue();
                            setPageState('logIn');
                        }}>登录已有账号</div>
                    </div>
                );
                break;
            }
            case 'validation': {
                pageContent = (
                    <div className='outer-most'>
                        <div className='title'>账号验证</div>
                        <div className='subtitle'>已向<span className='email'>{email}</span>发送验证邮件，请登录邮箱完成验证。</div>
                        <div className='tip'>验证完成后可关闭该页面</div>
                    </div>
                );
                break;
            }
            default: {
                <h2>页面异常</h2>
            }
        }
    })()

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#83D9F4',
                colorText: '#98A6B4',
            }
        }}>{pageContent}</ConfigProvider>
    )

    function clearInputValue() {
        for (let input of document.getElementsByTagName('input')) {
            input.value = '';
        }
        setEmail('');
        setPassWord('');
    }
}

const root = createRoot(document.getElementById('root'));
root.render(<LogIn></LogIn>);