import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Button from '~/components/Button';
import { IconFlame } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function Home() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const currentUser = useSelector((state) => state.auth.login.currentUser)
    return (
        <div className={cx('wrap')}>
            <div className={cx('container',{
                isDesktop : !isTabletOrMobile,
            })}>
                {!currentUser?.accessToken && isTabletOrMobile ? 
                (
                    <>
                            <div className={cx('img')}>
                                <IconFlame size = {400} stroke={0.8}/>
                            </div>
                            <Button className={cx('btn')} to={config.routes.login} primary>Đăng nhập</Button>
                            <Button className={cx('btn')} to={config.routes.signup} outline>Đăng ký</Button>
                    </>
                )
                 : 
                (
                     <>
                        <h1 className={cx('title')}>Phòng cháy, Chữa cháy!</h1>
                        <div className={cx('menu-item')}>
                            <Link to={config.routes.home} className={cx('item')}>
                                Home
                            </Link>
                            <Link to={config.routes.aboutUs} className={cx('item')}>
                                About Us
                            </Link>
                            <Link to={config.routes.services} className={cx('item')}>
                                Services
                            </Link>
                            <Link to={config.routes.contact} className={cx('item')}>
                                Contact
                            </Link>
                        </div>
                     </>
                )
                }
                
            </div>
        </div>
    );
}

export default Home;
