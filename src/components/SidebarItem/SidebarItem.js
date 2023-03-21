import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import React from 'react';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

function SidebarItem(items) {
    const refs = useRef({});

    const getRef = (name) => {
        if (!refs.current[name]) {
            refs.current[name] = React.createRef();
        }
        return refs.current[name];
    };

    for (const refName of items.items) {
        getRef(refName.ref);
    }

    const [activeElement, setActiveElement] = useState();

    const handleClick = (e) => {
        const newActiveElement = e.currentTarget;
        // Nếu phần tử hiện tại đang được active, thì không cần làm gì cả
        if (newActiveElement === activeElement) {
            return;
        }

        // Xóa class active khỏi phần tử hiện tại nếu có
        if (activeElement) {
            activeElement.classList.remove('active');
        }

        // Thêm class active vào phần tử mới
        newActiveElement.classList.add('active');

        // Lưu trữ phần tử mới vào state
        setActiveElement(newActiveElement);
    };

    return (
        <div className={cx('wrapper')}>
            {items.items.map((item, index) => {
                return (
                    <Link
                        key={index}
                        to={config.routes[item.to]}
                        className={cx('container', {
                            active: activeElement === refs.current[item.ref].current,
                        })}
                        onClick={handleClick}
                        ref={refs.current[item.ref]}
                    >
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
