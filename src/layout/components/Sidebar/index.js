import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import SidebarHeader from '~/components/SidebarHeader';
import SidebarItem from '~/components/SidebarItem';
import { BookIcon, DashboardIcon, ServiceIcon, SettingIcon } from '~/components/Icons';
import { StateContext } from '~/App';
import { useContext } from 'react';
import { IconAssembly, IconHome2, IconUser } from '@tabler/icons-react';
const cx = classNames.bind(styles);
function Sidebar({isTabletOrMobile}) {
    const { admin } = useContext(StateContext);
    const styleState = useContext(StateContext);
    const checked = styleState.sidebarWidth;
    const MENU_ITEM = [
        {
            icon: <IconHome2 className={cx('svg-inline')} />,
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
            icon: <SettingIcon className={cx('svg-inline')} />,
            title: 'Setting',
            to: 'setting',
            ref: 'settingLink',
        },
        {
            icon: <IconAssembly className={cx('svg-inline')} />,
            title: 'About us',
            to: 'security',
            ref: 'securityLink',
        },
    ];
    const MENU_Admin = [
        {
            icon: <IconHome2 className={cx('svg-inline')} />,
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
            icon: <ServiceIcon className={cx('svg-inline')} />,
            title: 'Analyst',
            to: 'services',
            ref: 'servicesLink',
        },
        {
            icon: <SettingIcon className={cx('svg-inline')} />,
            title: 'Setting',
            to: 'setting',
            ref: 'settingLink',
        },
        {
            icon: <IconUser className={cx('svg-inline')} />,
            title: 'User',
            to: 'services',
            ref: 'securityLink',
        },
    ];
    return (
        <aside
            className={cx('wrap', {
                checked,
                isDesktop : !isTabletOrMobile,
            })}
        >
            <div className={cx('container')}>
                {isTabletOrMobile ? '' : <SidebarHeader />}
                <SidebarItem isTabletOrMobile items={admin ? MENU_Admin : MENU_ITEM} />
            </div>
        </aside>
    );
}
export default Sidebar;
