import styles from './DashboardTable.module.scss';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEnd } from '~/redux/mapRoutingMachineSlice';
export const DashboardTableContext = createContext();
const cx = classNames.bind(styles);
const ModalForm = ({ gateway, location, action }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setEnd(location.split(',')));
        navigate('/map');
    };
    return (
        <div
            className="modal show"
            style={{
                display: 'block',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-30%)',
                color: '#000',
            }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{gateway}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{location}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            action(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClick}>
                        To
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};
function DashboardTable({ data = [], primary = false, tram = '' }) {
    const [open, setOpen] = useState(false);
    const [gateway, setGateway] = useState('');
    const [location, setLocation] = useState('');
    const handleOpenModalForm = (gateway, location) => {
        setGateway(gateway);
        setLocation(location);
        setOpen(true);
    };
    return (
        <>
            {open ? <div className={cx('dark')}></div> : ''}
            <div className={cx('wrap')}>
                {open ? <ModalForm gateway={gateway} location={location} action={setOpen} /> : ''}
                <div className={cx('header')}>
                    {primary ? (
                        <h1 className={cx('', { primary })}>Cảnh báo những nơi xảy ra cháy gần {tram}.!</h1>
                    ) : (
                        <h1> Danh sách các hộ sử dụng thiết bị báo cháy gần {tram}.!</h1>
                    )}
                </div>
                <div className={cx('container')}>
                    <Table bordered className={cx('table')}>
                        <thead>
                            <tr>
                                <th>GateWay</th>
                                <th>Node</th>
                                <th>Khói</th>
                                <th>Gas</th>
                                <th>Lửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length ? (
                                data.map((gateway) => (
                                    <Fragment key={gateway.gateway}>
                                        <tr key={gateway.gateway}>
                                            <td
                                                rowSpan={3}
                                                onClick={() => handleOpenModalForm(gateway.gateway, gateway.location)}
                                                className={cx('first')}
                                            >
                                                {gateway.gateway}
                                            </td>
                                            <td>{gateway.nodes[0].node_name}</td>
                                            <td>
                                                {
                                                    gateway.nodes[0].Smoke_value[
                                                        gateway.nodes[0].Smoke_value.length - 1
                                                    ].y
                                                }
                                            </td>
                                            <td>
                                                {gateway.nodes[0].Gas_value[gateway.nodes[0].Gas_value.length - 1].y}
                                            </td>
                                            <td>
                                                {gateway.nodes[0].Fire_value[gateway.nodes[0].Fire_value.length - 1].y}
                                            </td>
                                        </tr>
                                        {gateway.nodes.slice(1).map((node, index) => (
                                            <tr key={node.node_name}>
                                                <td>{node.node_name}</td>
                                                <td>{node.Smoke_value[node.Smoke_value.length - 1].y}</td>
                                                <td>{node.Gas_value[node.Gas_value.length - 1].y}</td>
                                                <td>{node.Fire_value[node.Fire_value.length - 1].y}</td>
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default DashboardTable;
