import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
    const { userToken } = useSelector((state) => state.auth);

    if (userToken) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Outlet />
        </>
    )
};