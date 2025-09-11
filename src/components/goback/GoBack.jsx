import { useNavigate } from "react-router-dom";

import "./GoBack.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";

const GoBack = ({text}) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return <div className="goBack"><ArrowLeftOutlined onClick={handleBack}/><b>{text}</b></div>
};

export default GoBack;