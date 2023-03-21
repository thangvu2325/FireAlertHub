import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
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
            </div>
        </div>
    );
}

export default Home;
