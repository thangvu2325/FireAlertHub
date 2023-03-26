import classNames from 'classnames/bind';
import DashboardTable from '../DashboardTable';
import styles from './ModalBox.module.scss';
import { StateContext } from '~/App';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
function ModalBox() {
    const { data, admin } = useContext(StateContext);
    const [open, setOpen] = useState(false);
    const [warningData, setWarningData] = useState({});
    let text;
    console.log(warningData);
    // eslint-disable-next-line default-case
    switch (admin) {
        case 'adminA':
            text = 'From_HCMUT';
            break;
        case 'adminB':
            text = 'From_UTE';
            break;
    }
    useEffect(() => {
        if (!!data[text]) {
            var obj = {};

            for (const key in data[text]) {
                const value = data[text][key];
                if (value.Warning) {
                    obj = { ...obj, [key]: value };
                }
            }
            if (obj) {
                setWarningData({ ...obj });
                setOpen(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleClose = () => {
        setOpen(false);
        setWarningData([]);
    };
    return (
        <>
            {open && warningData ? (
                <>
                    <div className={cx('shadow')}></div>

                    <div className={cx('wrapper')}>
                        <button className={cx('btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                        <DashboardTable primary data={warningData} />
                    </div>
                </>
            ) : null}
        </>
    );
}

export default ModalBox;
