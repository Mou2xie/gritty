import { Pagination } from 'antd';
import { WordItem } from '../WordItem/wordItem';
import { supabase } from '../../lib/supabaseClient';
import { useEffect, useState, useContext, useReducer } from 'react';
import { LogInContext } from '../../lib/contexts';
import { Loading } from '../Loading/Loading';
import { NoLogIn } from '../NoLogIn/NoLogIn';
import './wordsBook.css';


const WordsBook = () => {

    const isLogIn = useContext(LogInContext);
    const [userId, setUserId] = useState(undefined);
    const [totalNum, setTotalNum] = useState(-1);
    const [words, dispatch] = useReducer(wordsHandler, []);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLogIn) {
            supabase.auth.getUser().then(res => {
                if (res?.data?.user?.id) {
                    setUserId(res.data.user.id);

                    //获取单词总数
                    supabase.from('words')
                        .select('*', { count: 'estimated', head: true })
                        .eq('user', res.data.user.id)
                        .then(res => {
                            setTotalNum(res.count);
                        });

                    //获取单词列表
                    supabase.from('words').select().eq('user', res.data.user.id).limit(8).then(res => {
                        dispatch({
                            type: 'setWords',
                            data: res.data
                        });
                        setLoading(false);
                    });
                }
            });
        }
    }, [isLogIn]);

    return (
        <div className='words-book'>
            {
                isLogIn ?
                    <>
                        {
                            loading ? <Loading isLoading={loading} size={'large'}></Loading> :
                                <>
                                    <div className='total'>已标记<span>{totalNum}</span>个单词</div>
                                    {
                                        totalNum > 0 ? <>
                                            <div className='words'>
                                                {
                                                    words.map((item, index) => {
                                                        return <WordItem wordData={item} id={index} dispatch={dispatch}></WordItem>
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <Pagination className='pagination' current={currentPage} defaultPageSize={8} total={totalNum} showSizeChanger={false}
                                                    onChange={(page, pageSize) => {
                                                        supabase.from('words').select().eq('user', userId).range((page - 1) * 8, (page - 1) * 8 + 7).limit(8).then(res => {
                                                            dispatch({
                                                                type: 'setWords',
                                                                data: res.data
                                                            });
                                                            setCurrentPage(page);
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </> :
                                            <div className='empty'>
                                                <div>Nothing Here</div>
                                                <div>现在就开始聚沙成塔的学习之旅吧</div>
                                            </div>
                                    }
                                </>

                        }
                    </>
                    : <NoLogIn></NoLogIn>
            }
        </div>
    )
}

export { WordsBook }

function wordsHandler(state, action) {
    switch (action.type) {
        case 'setWords': {
            return action.data
        }
        case 'delete': {
            let _state = [...state];
            for (let i = 0; i < _state.length; i++) {
                if (action.id === _state[i].id) {
                    _state.splice(i, 1);
                }
            }
            return _state
        }
    }

}