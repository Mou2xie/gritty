import './SetUp.css';
import { useContext } from 'react';
import { LogInContext } from '../../lib/contexts';
import { NoLogIn } from '../NoLogIn/NoLogIn';
import { supabase } from '../../lib/supabaseClient';

const SetUp = () => {

    const isLogIn = useContext(LogInContext);

    return (
        <div className='setUp_container' >
            {
                isLogIn ?
                    <div className='setUp-item'>
                        <div className='btn-ghost' onClick={() => {
                            supabase.auth.signOut().then(() => {
                                chrome.tabs.update({
                                    url: '../../home.html?item=4'
                                });
                            });
                        }}>
                            退出登录
                        </div>
                    </div> : <NoLogIn></NoLogIn>
            }
        </div >
    )
}

export { SetUp }