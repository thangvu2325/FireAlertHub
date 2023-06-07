import classNames from 'classnames/bind';
import DashboardTable from '../DashboardTable';
import styles from './ModalBox.module.scss';
import { StateContext } from '~/App';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '~/firebase_setup/firebase';
const cx = classNames.bind(styles);
function ModalBox() {
    const { admin } = useContext(StateContext);
    const [open, setOpen] = useState(false);
    const [warningData, setWarningData] = useState({});
    const [data,setData] = useState([]);
    const obj = {};
    useEffect(()=>{
        onValue(ref(database), (snapshot) => {
            var dataFirebase = snapshot.val();
            setData(dataFirebase);
        });
    },[])
    
    useEffect(() => {
        if(admin){
            if (!!data[admin === 'adminA'?'From_HCMUT': 'From_UTE']) {
                for (const key in data[admin === 'adminA'?'From_HCMUT':'From_UTE']) {
                    const value = data[admin === 'adminA'?'From_HCMUT':'From_UTE'][key];
                    console.log(value)
                    if (value.Warning) {
                        obj[key] = value;
                    }
                    else if(obj[key]){
                        delete obj[key];
                    }
                }
                if (Object.keys(obj).length !== 0) {
                    setWarningData({ ...obj });
                    setOpen(true);
                }
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
            {warningData.length !== 0 && open  ? (
                <>
                    <div className={cx('shadow')}></div>

                    <div className={cx('wrapper')}>
                        <button className={cx('btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                        <DashboardTable tram = {admin === 'adminA'?'Đại học Bách Khoa':'Đại học Sư Phạm Kỹ Thuật'} primary data={warningData} />
                    </div>
                </>
            ) : null}
        </>
    );
}

export default ModalBox;
