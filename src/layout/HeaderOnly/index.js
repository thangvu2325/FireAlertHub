import Header from '~/layout/components/Header';
import classNames from 'classnames/bind';
import styles from '~/layout/DefaultLayout/DefaultLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content')}>
                <Header />
                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
