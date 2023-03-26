import styles from './DashboardTable.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';

const cx = classNames.bind(styles);
function DashboardTable({ data = {}, primary = false }) {
    console.log(data);
    const ref = useRef();
    const handleMap = (e) => {
        console.log(e.target.innerText);
    };
    return (
        <table className={cx('container')}>
            <thead>
                <tr>
                    <th>
                        <h1>User</h1>
                    </th>

                    <th>
                        <h1>Nồng độ khối</h1>
                    </th>
                    <th>
                        <h1>Lửa</h1>
                    </th>

                    <th>
                        <h1>Room</h1>
                    </th>
                    <th>
                        <h1>Sites</h1>
                    </th>
                </tr>
            </thead>
            <tbody>
                {!!data
                    ? Object.entries(data).map(([key, value]) => {
                          return (
                              <tr
                                  key={key}
                                  className={cx({
                                      primary,
                                  })}
                              >
                                  <td>{key}</td>
                                  <td>{value.MQ2_value / 10}%</td>
                                  <td>{value.Fire_value}</td>
                                  <td>{value.Room}</td>
                                  <td onClick={handleMap} ref={ref}>
                                      {value.locate}
                                  </td>
                              </tr>
                          );
                      })
                    : null}
            </tbody>
        </table>
    );
}
export default DashboardTable;
