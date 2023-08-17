import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logOut } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faGear,
    faSignOut,
    faBars,
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
import SwitchMode from '~/components/SwitchMode';
import ModalNotifyState from '~/components/ModalNotifyState';
import { useState } from 'react';
import { currentUserSelector, inboxsSelector, sidebarWidthSelector } from '~/redux/selectors';
import { toast } from 'react-toastify';
import { setSidebarWidth } from '~/redux/settingSlice';
const cx = classNames.bind(styles);

const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
        case 'Language':
            // console.log(menuItem.type);
            break;
        default:
    }
    switch (menuItem.title) {
        case 'Logout':
            menuItem.handleLogout();
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
export var barClickChecked = false;
function Header({ isTabletOrMobile, isScrolled }) {
    const user = useSelector(currentUserSelector);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const sidebarWidth = useSelector(sidebarWidthSelector);
    const inboxs = useSelector(inboxsSelector);
    const inboxsData = inboxs?.filter((inbox) => inbox.check === false);
    const accessToken = user?.accessToken;
    const id = user?._doc?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxios(user, dispatch, logOutSuccess, toast, navigate);
    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };
    const handleShowModalMessage = () => {
        setShowModalMessage(!showModalMessage);
    };

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
            handleLogout,
        },
    ];

    const handleClickBars = () => {
        dispatch(setSidebarWidth(!sidebarWidth));
    };

    return (
        <header
            className={cx('wrapper', {
                isDesktop: !isTabletOrMobile,
                isScrolled,
            })}
        >
            <ModalNotifyState
                inboxs={inboxs}
                showModalMessage={showModalMessage}
                setShowModalMessage={setShowModalMessage}
            />
            <div className={cx('logo-link')}>
                {user?.accessToken ? (
                    <FontAwesomeIcon icon={faBars} onClick={handleClickBars} />
                ) : (
                    <Link to={`/`}>
                        <h2 className={cx(cx('title'))}>FIRESTATION</h2>
                    </Link>
                )}
            </div>
            <div className={cx('actions')}>
                {user?.accessToken ? (
                    <>
                        {isTabletOrMobile ? (
                            ''
                        ) : (
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')} onClick={handleShowModalMessage}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>{inboxsData?.length}</span>
                                </button>
                            </Tippy>
                        )}
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
                <SwitchMode isTabletOrMobile />
                <>
                    <Menu items={user?.accessToken ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {user?.accessToken ? (
                            <Image
                                src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&cb=99be929b-3346023f&ccb=1-7&_nc_sid=7206a8&_nc_ohc=go7e2rSOKFwAX-DeyaZ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDZCky0cVvXwZpxG8o6ROgBNQffv9ef7zRCyFOIUwCIew&oe=64F11A78"
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
