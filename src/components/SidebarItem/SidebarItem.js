import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import React from 'react';
const cx = classNames.bind(styles);

function SidebarItem({ isTabletOrMobile, items }) {
    return (
        <div
            className={cx('wrapper', {
                isDesktop: !isTabletOrMobile,
            })}
        >
            {items.map((item, index) => {
                return (
                    <Link key={index} to={config.routes[item.to]} className={cx('container', {})}>
                        <div className={cx('content')}>
                            {item.icon}
                            {item.title}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default SidebarItem;
