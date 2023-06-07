import Header from '~/layout/components/Header';
import classNames from 'classnames/bind';
import styles from '~/layout/DefaultLayout/DefaultLayout.module.scss';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content')}>
                {isTabletOrMobile ?'':<Header />}
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderOnly;
