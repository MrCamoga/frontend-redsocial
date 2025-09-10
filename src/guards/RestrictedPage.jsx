import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";


const RestrictedPage = ({children, logged = true}) => {
    const { token } = useSelector((state) => state.auth);
    // const token = localStorage.getItem("token");
    if(logged)
        return token ? children : <Navigate to="/login" />;
    else
        return token ? <Navigate to="/" /> : children;
}

export default RestrictedPage;