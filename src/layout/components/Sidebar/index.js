import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import SidebarHeader from '~/components/SidebarHeader';
import SidebarItem from '~/components/SidebarItem';
import { BookIcon, DashboardIcon, HomeIcom, PackageIcon, ServiceIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
function Sidebar() {
    const MENU_ITEM = [
        {
            icon: <HomeIcom />,
            title: 'Trang chủ',
            to: 'home',
            ref: 'homeLink',
        },
        {
            icon: <DashboardIcon />,
            title: 'Dashboard',
            to: 'dashboard',
            ref: 'dashboardLink',
        },
        {
            icon: <BookIcon />,
            title: 'Hướng dẫn',
            to: 'instruct',
            ref: 'instructLink',
        },
        {
            icon: <ServiceIcon />,
            title: 'Service',
            to: 'services',
            ref: 'servicesLink',
        },
        {
            locate: 'footer',
            icon: <PackageIcon />,
            title: 'Setting',
            to: 'setting',
            ref: 'settingLink',
        },
        {
            locate: 'footer',
            icon: <PackageIcon />,
            title: 'Bảo Mật',
            to: 'security',
            ref: 'securityLink',
        },
    ];
    return (
        <aside className={cx('wrap')}>
            <div className={cx('container')}>
                <SidebarHeader />
                <SidebarItem items={MENU_ITEM} />
            </div>
        </aside>
    );
}
export default Sidebar;
