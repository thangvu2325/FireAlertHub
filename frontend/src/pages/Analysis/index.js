import LineChart from '~/components/LineChart/LineChart';
import styles from './Analysis.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/images';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IconAlertOctagon, IconInfoCircle, IconMail, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { inboxsSelector, nodesSelector } from '~/redux/selectors';
const cx = classNames.bind(styles);
const findMaxYElement = (dataArray) => {
    let maxYElement = dataArray[0]; // Giả sử phần tử đầu tiên có y lớn nhất

    for (let i = 1; i < dataArray.length; i++) {
        if (dataArray[i].y > maxYElement.y) {
            maxYElement = dataArray[i]; // Cập nhật maxYElement nếu tìm thấy y lớn hơn
        }
    }

    return maxYElement;
};
function Analysis() {
    const [activeKey, setActiveKey] = useState('Smoke_value');
    const handleSelectTab = (k) => {
        setActiveKey(k);
    };
    const inboxs = useSelector(inboxsSelector);
    const data = useSelector(nodesSelector);
    const BiggestSmokeperNode = [];
    const BiggestGasperNode = [];
    data?.forEach((element) => {
        BiggestSmokeperNode.push({ ...findMaxYElement(element.Smoke_value), name: element.node_name });
        BiggestGasperNode.push({ ...findMaxYElement(element.Gas_value), name: element.node_name });
        console.log(element.Gas_value.length);
    });
    return (
        <div className={cx('wrap')}>
            <div className={cx('top')}>
                <div className={cx('top-container')}>
                    <div className={cx('top-analysis')}>
                        <div className={cx('analysis-icon')}>
                            <Image
                                src={images.smokeIcon}
                                className={cx('analysis-icon')}
                                alt="icon for analysis"
                                fallBack="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=E70viSc53w0AX8GYSY7&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfD2dw7Et-gbPGBMYZTT12RlM223MEMvX0QErMevYJpl6w&oe=63FE15F8"
                            />
                        </div>
                        <div className={cx('analyst-content')}>
                            <div className={cx('analyst-title')}> Khói cao nhất:</div>
                            <div className={cx('analyst-parameter')}>
                                {findMaxYElement(BiggestSmokeperNode)?.name} : {findMaxYElement(BiggestSmokeperNode)?.y}{' '}
                                lúc {findMaxYElement(BiggestSmokeperNode)?.x}
                            </div>
                        </div>
                    </div>
                    <div className={cx('top-analysis')}>
                        <div className={cx('analysis-icon')}>
                            <Image
                                src={images.smokeIcon}
                                className={cx('analysis-icon')}
                                alt="icon for analysis"
                                fallBack="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=E70viSc53w0AX8GYSY7&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfD2dw7Et-gbPGBMYZTT12RlM223MEMvX0QErMevYJpl6w&oe=63FE15F8"
                            />
                        </div>
                        <div className={cx('analyst-content')}>
                            <div className={cx('analyst-title')}>Lượng gas cao nhất:</div>
                            <div className={cx('analyst-parameter')}>
                                {findMaxYElement(BiggestGasperNode)?.name} : {findMaxYElement(BiggestGasperNode)?.y} lúc{' '}
                                {findMaxYElement(BiggestGasperNode)?.x}
                            </div>
                        </div>
                    </div>
                    <div className={cx('top-analysis')}>
                        <div className={cx('analysis-icon')}>
                            <IconInfoCircle className={cx('analysis-icon')} stroke={1} />
                        </div>
                        <div className={cx('analyst-content')}>
                            <div className={cx('analyst-title')}>Số lượng request:</div>
                            <div className={cx('analyst-parameter')}>{data?.[0]?.Smoke_value?.length}</div>
                        </div>
                    </div>
                    <div className={cx('top-analysis')}>
                        <div className={cx('analysis-icon')}>
                            <IconAlertOctagon className={cx('analysis-icon')} stroke={1} />
                        </div>
                        <div className={cx('analyst-content')}>
                            <div className={cx('analyst-title')}>Số lượng phát hiện cảnh báo:</div>
                            <div className={cx('analyst-parameter')}>{inboxs.length}</div>
                        </div>
                    </div>
                    <div className={cx('top-analysis')}>
                        <div className={cx('analysis-icon')}>
                            <IconMail className={cx('analysis-icon')} stroke={1} />
                        </div>
                        <div className={cx('analyst-content')}>
                            <div className={cx('analyst-title')}>Tổng số Email cảnh báo đã gửi:</div>
                            <div className={cx('analyst-parameter')}>{inboxs.length}</div>
                        </div>
                    </div>
                    <div className={cx('top-analysis')}>
                        <div className={cx('analysis-icon')}>
                            <IconPhone className={cx('analysis-icon')} stroke={1} />
                        </div>
                        <div className={cx('analyst-content')}>
                            <div className={cx('analyst-title')}>Tổng số SMS cảnh báo đã gửi:</div>
                            <div className={cx('analyst-parameter')}>{inboxs.length}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('container-left')}>
                    <div className={cx('left-tab')}>
                        <Tabs
                            defaultActiveKey={`Smoke_value`}
                            id="fill-tab-example"
                            className="mb-5 ml-3"
                            fill
                            onSelect={handleSelectTab}
                        >
                            <Tab eventKey="Smoke_value" title="Smoke">
                                <h4 className={cx('tab-text')}>Tab content for Smoke</h4>
                            </Tab>
                            <Tab eventKey="Gas_value" title="Gas">
                                <h4 className={cx('tab-text')}>Tab content for Gas</h4>
                            </Tab>
                            <Tab eventKey="Fire_value" title="Fire">
                                <h4 className={cx('tab-text')}>Tab content for Fire</h4>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className={cx('left-lineChart')}>
                        <LineChart dataValue={data} activeKey={activeKey} />
                    </div>
                </div>
                <div className={cx('container-content')}></div>
            </div>
        </div>
    );
}

export default Analysis;
