import './NoLogIn.css';

const NoLogIn = () => {
    return (
        <div className='nologin-container'>
            <div onClick={() => {
                chrome.tabs.update({
                    url: '../../../logIn.html'
                });
            }}>登录/注册</div>
        </div>
    )
}

export { NoLogIn }