import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '~/AuthContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faGear,
    faSignOut,
    faBars,
    faHome,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import config from '~/config';
import { auth } from '~/firebase_setup/firebase';
import SwitchMode from '~/components/SwitchMode';
const cx = classNames.bind(styles);
const handleSignOut = async () => {
    try {
        await signOut(auth);
        return false;
    } catch (error) {
        return false;
    }
};

const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
        case 'Language':
            // console.log(menuItem.type);
            break;
        default:
    }
    switch (menuItem.title) {
        case 'Logout':
            handleSignOut();
            break;
        default:
    }
};
const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                { type: 'Language', code: 'en', title: 'English' },
                { type: 'Language', code: 'vi', title: 'Tiếng Việt' },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: 'feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const { currentUser } = useContext(AuthContext);
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Logout',
            to: config.routes.home,
            separate: false,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <FontAwesomeIcon icon={currentUser ? faBars : faHome} />
            </Link>
            <div className={cx('actions')}>
                <SwitchMode />
                {currentUser ? (
                    <>
                        <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                                <span className={cx('badge')}>12</span>
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button to={config.routes.login} primary>
                            Log in
                        </Button>
                        <Button to={config.routes.signup} outline>
                            Sign Up
                        </Button>
                    </>
                )}
                <>
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://64.media.tumblr.com/0720d562319a714c020710344ed67383/84bd6032ff13f728-fa/s1280x1920/085d228f71280869ce592e242cc1173c4a7c225f.jpg"
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                fallBack="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=E70viSc53w0AX8GYSY7&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfD2dw7Et-gbPGBMYZTT12RlM223MEMvX0QErMevYJpl6w&oe=63FE15F8"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </>
            </div>
        </header>
    );
}

export default Header;
