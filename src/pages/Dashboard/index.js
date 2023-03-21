import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import RoundChart from '~/components/RoundChart';

import { useContext } from 'react';
import LineChart from '~/components/LineChart';
import DashboardTable from '~/components/DashboardTable';
import { StateContext } from '~/App';
const cx = classNames.bind(styles);
function Dashboard() {
    const { data, mq2Value, fireValue, admin } = useContext(StateContext);
    let text;
    // eslint-disable-next-line default-case
    switch (admin) {
        case 'adminA':
            text = 'From_HCMUT';
            break;
        case 'adminB':
            text = 'From_UTE';
            break;
    }

    return (
        <div className={cx('wrap')}>
            <div className={cx('heading')}>
                <h1 className={cx('title')}>Dashboard</h1>
            </div>
            <div className={cx('container')}>
                {admin ? (
                    <DashboardTable data={data[text]} primary={false} />
                ) : (
                    <>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('cell')}>
                                <span className={cx('parameter')}>
                                    <RoundChart
                                        value={{
                                            value: mq2Value,
                                            maxValue: 1000,
                                        }}
                                    />
                                </span>
                                <span className={cx('cell-title')}>
                                    <h2>Phát hiện khói</h2>
                                </span>
                            </div>
                            <div className={cx('cell')}>
                                <span className={cx('parameter')}>
                                    <RoundChart
                                        value={{
                                            value: fireValue,
                                            maxValue: 1,
                                        }}
                                    />
                                </span>
                                <span className={cx('cell-title')}>
                                    <h2>Phát hiện lửa</h2>
                                </span>
                            </div>
                        </div>
                        <div className={cx('line-chart')}>
                            <LineChart dataValue={mq2Value} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
