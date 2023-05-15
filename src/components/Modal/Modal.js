import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import {Button} from "bootstrap"
const cx = classNames.bind(styles);
function Modal() {
    return (<Button type="button" class="btn">Base class</Button>
   );
}

export default Modal;