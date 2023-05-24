import styles from './DashboardTable.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';


const cx = classNames.bind(styles);
function DashboardTable({ data = {}, primary = false }) {
    const ref = useRef();
    const handleMap = (e) => {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${e.target.innerText}`,'_blank');
    };

    return (
       <div className={cx('wrap')}>
            <div className={cx('header')}>
                {primary ?<h1 className={cx('',{primary})}>Cảnh báo những nơi xảy ra cháy.!</h1>: <h1> Danh sách các hộ sử dụng thiết bị báo cháy.!</h1>}
            </div>
            <table className={cx('container')}>
                <thead>
                    <tr className={cx('',{
                        main : true,
                    })}>
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
                                      <td>{Math.round(value.Smoke_value*100 / 7000)}%</td>
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
       </div>
    );
}
export default DashboardTable;
