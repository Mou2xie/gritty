import './loading.css';
import { Spin } from 'antd';

//父组件的position需为relative
const Loading = ({ isLoading, size }) => {
    if (isLoading) {
        return (
            <div className='loading_container'>
                <div className='background'></div>
                <Spin size={size || 'default'}></Spin>
            </div>
        )
    } else {
        return null
    }
}

export { Loading }