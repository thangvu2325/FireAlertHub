import Header from '~/layout/components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [checked, setChecked] = useState(false);
    const callbackFunction = (childData) => {
        setChecked(childData);
    };
    return (
        <div className={cx('wrapper')}>
            <Sidebar checked={checked} />
            <div className={cx('wrapper-content')}>
                <Header parentCallback={callbackFunction} />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
