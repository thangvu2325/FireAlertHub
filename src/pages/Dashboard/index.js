import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import RoundChart from '~/components/RoundChart';
import { useState } from 'react';
import { useContext } from 'react';
import LineChart from '~/components/LineChart';
import DashboardTable from '~/components/DashboardTable';
import { StateContext } from '~/App';
import { onValue, ref } from 'firebase/database';
import { database } from '~/firebase_setup/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '~/redux/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import {  IconPlugConnectedX } from '@tabler/icons-react';
const cx = classNames.bind(styles);

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mq2Value, setMq2Value] = useState('');
    const [fireValue, setFireValue] = useState('');
    const [found, setFound] = useState('');
    const [data, setData] = useState([]);
    const {admin } = useContext(StateContext);
    const currentUser = useSelector((state)=> state.auth.login.currentUser)
    console.log(found)
    // const userList = useSelector((state) => state.users.users?.allUsers);
    let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
    useEffect(()=>{
            onValue(ref(database), (snapshot) => {
                var data = snapshot.val();
                setData(data);
            });
            onValue(ref(database,`From_HCMUT/${currentUser._doc.inform}`),(snapshot)=>{
                if(snapshot.exists()){
                    setMq2Value(snapshot.val().Smoke_value);
                    setFireValue(snapshot.val().Fire_value);
                    setFound(true);
                }
            } )
            onValue(ref(database,`From_UTE/${currentUser._doc.inform}`),(snapshot)=>{
                if(snapshot.exists()){
                    setMq2Value(snapshot.val().Smoke_value);
                    setFireValue(snapshot.val().Fire_value);
                    setFound(true);
                }
            } )
           
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if (!currentUser) {
            navigate("/login");
          }
          if (currentUser?.accessToken) {
            getAllUsers(currentUser?.accessToken, dispatch, axiosJWT);
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
            <div className={cx('wrap',{
                backgroundShadow: !found
                })}
            >
            <div className={cx('heading')}>
                <h1 className={cx('title')}>Dashboard</h1>
            </div>
            <div className={cx('container')}>
                {admin ? (
                    <DashboardTable tram = {admin === 'adminA'? 'Đại học Bách Khoa':'Đại học Sư Phạm Kỹ Thuật'} data={data[admin === 'adminA'? 'From_HCMUT':'From_UTE']} primary={false} />
                ) : (
                    <>
                        {found && admin === '' ? '':<div className={cx('shadow')}>
                        <IconPlugConnectedX  
                            size="400"
                            stroke="0.7"
                            className={cx('plug-icon')}
                        />
                        </div>
                        }
                        <div className={cx('content-wrapper')}>
                            <div className={cx('cell')}>
                                <span className={cx('parameter')}>
                                    <RoundChart
                                        value={{
                                            value: mq2Value,
                                            maxValue: 7000,
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
                            <div className={cx('line-chart-content')}>
                                <LineChart dataValue={mq2Value} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
