import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import RoundChart from '~/components/RoundChart';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import DashboardTable from '~/components/DashboardTable';
import { useDispatch, useSelector } from 'react-redux';
import { IconPlugConnectedX } from '@tabler/icons-react';
import { adminSelector, currentUserSelector, nodesSelector } from '~/redux/selectors';
import { createAxios } from '~/createInstance';
import { refreshToken as refreshTokenAction } from '~/redux/authSlice';
import { useEffect, memo, useState } from 'react';
import { getalluserinUserManager, sendConnectToDevice } from '~/api/managerRequest';
import { useContext } from 'react';
import { StateContext } from '~/App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Dashboard() {
    const [callAPI, setCallAPI] = useState(false);
    const nodesData = useSelector(nodesSelector);
    const [activeKey, setActiveKey] = useState(nodesData?.length && nodesData[0]?.node_name);
    const [formSelect, setFormSelect] = useState('Default');
    const { requestCallAPI, setRequestCallAPI } = useContext(StateContext);
    const found = true;
    const [dashboard, setDashboard] = useState([]);
    const admin = useSelector(adminSelector);
    const currentUser = useSelector(currentUserSelector);
    const accessToken = currentUser.accessToken;
    const userID = currentUser._doc._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(currentUser, dispatch, refreshTokenAction, toast, navigate);
    async function fetchDataManager() {
        try {
            const data = await getalluserinUserManager(userID, accessToken, axiosJWT);
            setDashboard(data);
        } catch (error) {
            // Xử lý lỗi ở đây
            console.log(error);
        }
    }
    const nodeSelect = nodesData?.filter((e) => e?.node_name === activeKey)[0];
    const handleSendConnectToDevice = async () => {
        try {
            await sendConnectToDevice(userID, accessToken, axiosJWT);
        } catch (err) {
            console.log(err);
        }
    };
    const handleSelectTab = (k) => {
        setActiveKey(k);
    };
    const handleChangeFormSelect = (e) => {
        setFormSelect(e.target.value);
    };

    useEffect(() => {
        if (callAPI) {
            if (admin !== 'user') {
                fetchDataManager();
            } else {
                // fetchData();
            }
        }
        setCallAPI(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodesData, callAPI]);
    useEffect(() => {
        if (admin !== 'user') {
            fetchDataManager();
        } else {
            // fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin]);
    useEffect(() => {
        if (requestCallAPI) {
            setCallAPI(true);
        }
        setRequestCallAPI(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestCallAPI]);
    return (
        <div
            className={cx('wrap', {
                backgroundShadow: !found,
            })}
        >
            <div className={cx('heading')}>
                <h1 className={cx('title')}>Dashboard</h1>
                {admin === 'user' ? (
                    <Button primary className={cx('btn-connect')} onClick={handleSendConnectToDevice}>
                        Connect
                    </Button>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('container')}>
                {admin !== 'user' ? (
                    <DashboardTable
                        tram={admin === 'HCMUT_STATION' ? 'Đại học Bách Khoa' : 'Đại học Sư Phạm Kỹ Thuật'}
                        data={dashboard}
                        primary={false}
                    />
                ) : (
                    <>
                        {found && admin === 'user' ? (
                            ''
                        ) : (
                            <div className={cx('shadow')}>
                                <IconPlugConnectedX size="400" stroke="0.7" className={cx('plug-icon')} />
                            </div>
                        )}
                        <div className={cx('top')}>
                            {nodesData?.length && formSelect === 'Default' ? (
                                <div className={cx('wrap-tab')}>
                                    <Tabs
                                        defaultActiveKey={nodesData[0].node_name}
                                        id="fill-tab-example"
                                        className="mb-5 ml-3"
                                        fill
                                        onSelect={handleSelectTab}
                                    >
                                        {nodesData?.map((node, index) => {
                                            return (
                                                <Tab eventKey={node.node_name} title={node.node_name} key={index}>
                                                    <h4 className={cx('tab-text')}>Tab content for {node.node_name}</h4>
                                                </Tab>
                                            );
                                        })}
                                    </Tabs>
                                </div>
                            ) : (
                                ''
                            )}
                            <Form.Select
                                size="lg"
                                className={cx('top-form-sellect')}
                                value={formSelect}
                                onChange={handleChangeFormSelect}
                            >
                                <option value="Default">Default</option>
                                <option value="Table">Table</option>
                            </Form.Select>
                        </div>
                        {formSelect === 'Table' ? (
                            <div className={cx('content-title')}>
                                <h2>Content for Table</h2>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className={cx('content-wrapper')}>
                            {formSelect === 'Default' ? (
                                <>
                                    <div className={cx('cell')}>
                                        <span className={cx('parameter')}>
                                            <RoundChart
                                                value={{
                                                    value:
                                                        nodeSelect?.Gas_value[nodeSelect.Gas_value?.length - 1]?.y ?? 0,
                                                    maxValue: 4096,
                                                }}
                                            />
                                        </span>
                                        <span className={cx('cell-title')}>
                                            <h2>Phát hiện gas</h2>
                                        </span>
                                    </div>
                                    <div className={cx('cell')}>
                                        <span className={cx('parameter')}>
                                            <RoundChart
                                                value={{
                                                    value:
                                                        nodeSelect?.Smoke_value[nodeSelect?.Smoke_value?.length - 1]
                                                            ?.y ?? 0,
                                                    maxValue: 4096,
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
                                                    value:
                                                        nodeSelect?.Fire_value[nodeSelect?.Fire_value?.length - 1]?.y ??
                                                        0,
                                                    maxValue: 1,
                                                }}
                                            />
                                        </span>
                                        <span className={cx('cell-title')}>
                                            <h2>Phát hiện lửa</h2>
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Table bordered hover className={cx('form-table')}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Gas Value</th>
                                                <th>Fire Value</th>
                                                <th>Smoke Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nodesData.map((node) => {
                                                return (
                                                    <tr key={node.node_name}>
                                                        <td>{node.node_name}</td>
                                                        <td>{node.Gas_value[node.Gas_value?.length - 1]?.y ?? 0}</td>
                                                        <td>{node.Fire_value[node.Fire_value?.length - 1]?.y ?? 0}</td>
                                                        <td>
                                                            {node.Smoke_value[node.Smoke_value?.length - 1]?.y ?? 0}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(Dashboard);
