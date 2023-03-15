import classNames from 'classnames/bind';
import styles from './SidebarHeader.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SidebarHeader() {
    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('container')}>
                <FontAwesomeIcon className={cx('logo')} icon={faHome} />
            </Link>
        </div>
    );
}

export default SidebarHeader;
