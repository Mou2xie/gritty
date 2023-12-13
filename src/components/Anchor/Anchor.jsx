import './Anchor.css';
import { Popover } from 'antd';
import { PopOverContent } from '../PopOverContent/PopOverContent';

const Anchor = ({ text }) => {
    return (
        <Popover content={<PopOverContent text={text}></PopOverContent>}
            overlayStyle={{ width: '330px' }}
            overlayInnerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '10px 12px',
            }}
            destroyTooltipOnHide={true}
            autoAdjustOverflow={true}
            placement="bottom"
            trigger="click"
        >
            <span className='anchor'>{text}</span>
        </Popover>
    )
}

export { Anchor }