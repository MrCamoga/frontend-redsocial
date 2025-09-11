import { CloseOutlined } from "@ant-design/icons";
import "./Overlay.scss" ;

const Overlay = ({ children, onClose }) => {
    const handleClose = (event) => {
        event.stopPropagation();
        onClose();
    }
    return <div onClick={handleClose} className="overlay">
        <div onClick={e => e.stopPropagation()} className="overlayContainer">
            {children}
        </div>
        <CloseOutlined className="icon-close" onClick={handleClose}/>
    </div>
};

export default Overlay;