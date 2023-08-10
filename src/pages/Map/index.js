import styles from './Map.module.scss';
import classNames from 'classnames/bind';
import Leaflet from '~/components/Leaflet/Leaflet';

const cx = classNames.bind(styles);

function Map() {
    return (
        <div className={cx('wrap')}>
            <Leaflet />
        </div>
    );
}

export default Map;
