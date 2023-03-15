import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Phòng cháy, Chữa cháy!</h1>
                <div className={cx('menu-item')}>
                    <a href={config.routes.home} className={cx('item')}>
                        Home
                    </a>
                    <a href={config.routes.aboutUs} className={cx('item')}>
                        About Us
                    </a>
                    <a href={config.routes.services} className={cx('item')}>
                        Services
                    </a>
                    <a href={config.routes.contact} className={cx('item')}>
                        Contact
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
