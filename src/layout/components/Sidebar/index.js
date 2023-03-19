import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import SidebarHeader from '~/components/SidebarHeader';
import SidebarItem from '~/components/SidebarItem';
import { BookIcon, DashboardIcon, HomeIcon, ServiceIcon } from '~/components/Icons';
import { StateContext } from '~/App';
import { useContext } from 'react';

const cx = classNames.bind(styles);
function Sidebar() {
    const styleState = useContext(StateContext);
    const checked = styleState.sidebarWidth;
    const MENU_ITEM = [
        {
            icon: <HomeIcon className={cx('svg-inline')} />,
            title: 'Trang chủ',
            to: 'home',
            ref: 'homeLink',
        },
        {
            icon: <DashboardIcon className={cx('svg-inline')} />,
            title: 'Dashboard',
            to: 'dashboard',
            ref: 'dashboardLink',
        },
        {
            icon: <BookIcon className={cx('svg-inline')} />,
            title: 'Hướng dẫn',
            to: 'instruct',
            ref: 'instructLink',
        },
        {
            icon: <ServiceIcon className={cx('svg-inline')} />,
            title: 'Service',
            to: 'services',
            ref: 'servicesLink',
        },
        {
            locate: 'footer',
            icon: <ServiceIcon className={cx('svg-inline')} />,
            title: 'Setting',
            to: 'setting',
            ref: 'settingLink',
        },
        {
            locate: 'footer',
            icon: <ServiceIcon className={cx('svg-inline')} />,
            title: 'Bảo Mật',
            to: 'security',
            ref: 'securityLink',
        },
    ];
    return (
        <aside
            className={cx('wrap', {
                checked,
            })}
        >
            <div className={cx('container')}>
                <SidebarHeader />
                <SidebarItem items={MENU_ITEM} />
            </div>
        </aside>
    );
}
export default Sidebar;
