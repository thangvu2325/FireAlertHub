import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import RoundChart from '~/components/RoundChart';
import { ref, onValue } from 'firebase/database';
import { database } from '~/firebase_setup/firebase';
import AuthContext from '~/AuthContext';
import { useContext, useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function Dashboard() {
    const [mq2Value, setMq2Value] = useState('');
    const [fireValue, setFireValue] = useState('');

    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (currentUser) {
            onValue(ref(database), (snapshot) => {
                var data = snapshot.val();
                if (!!data.From_HCMUT) {
                    Object.keys(data['From_HCMUT']).forEach((key) => {
                        if (data['From_HCMUT'][key].uid === currentUser.uid) {
                            setMq2Value(data['From_HCMUT'][key].MQ2_value);
                            setFireValue(data['From_HCMUT'][key].Fire_value);
                        }
                    });
                }
                if (!!data.From_UTE) {
                    Object.keys(data['From_UTE']).forEach((key) => {
                        if (data['From_UTE'][key].uid === currentUser.uid) {
                            setMq2Value(data['From_UTE'][key].MQ2_value);
                            setFireValue(data['From_UTE'][key].Fire_value);
                        }
                    });
                }
            });
        }
        // eslint-disable-next-line
    }, [currentUser]);
    return (
        <div className={cx('wrap')}>
            <div className={cx('heading')}>
                <h1 className={cx('title')}>Dashboard</h1>
            </div>
            <div className={cx('table')}>
                <div className={cx('content')}>
                    <div className={cx('cell')}>
                        <span className={cx('parameter')}>
                            <RoundChart value={mq2Value} maxValue="1000" className={cx('round-chart')} />
                        </span>
                        <span className={cx('cell-title')}>
                            <h2>Phát hiện khói</h2>
                        </span>
                    </div>
                    <div className={cx('cell')}>
                        <span className={cx('parameter')}>
                            <RoundChart value={fireValue} maxValue="1" className={cx('round-chart')} />
                        </span>
                        <span className={cx('cell-title')}>
                            <h2>Phát hiện lửa</h2>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
