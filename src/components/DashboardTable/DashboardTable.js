import styles from './DashboardTable.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { createContext } from 'react';
import Table from 'react-bootstrap/Table';
export const DashboardTableContext = createContext();
const cx = classNames.bind(styles);
function DashboardTable({ data = [], primary = false, tram = '' }) {
    // const handleMap = (e) => {
    //     window.open(
    //         `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${e.target.innerText}`,
    //         '_blank',
    //     );
    // };
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                {primary ? (
                    <h1 className={cx('', { primary })}>Cảnh báo những nơi xảy ra cháy gần {tram}.!</h1>
                ) : (
                    <h1> Danh sách các hộ sử dụng thiết bị báo cháy gần {tram}.!</h1>
                )}
            </div>
            <div className={cx('container')}>
                <Table bordered hover className={cx('table')}>
                    <thead>
                        <tr>
                            <th>GateWay</th>
                            <th>Node</th>
                            <th>Khói</th>
                            <th>Gas</th>
                            <th>Lửa</th>
                            <th>Vị trí</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length &&
                            data.map((gateway) => (
                                <Fragment key={gateway.gateway}>
                                    <tr className={cx('first')}>
                                        <td>{gateway.gateway}</td>
                                    </tr>
                                    {gateway.nodes.map((node, index) => (
                                        <tr key={index}>
                                            <td>{node.node_name}</td>
                                            <td>{node.Smoke_value[node.Smoke_value.length - 1].y}</td>
                                            <td>{node.Gas_value[node.Gas_value.length - 1].y}</td>
                                            <td>{node.Fire_value[node.Fire_value.length - 1].y}</td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
export default DashboardTable;
