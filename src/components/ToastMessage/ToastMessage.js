import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function ToastMessage({children}) {
    return ( 
            <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme= "light"
            />
     );
}

export default ToastMessage;