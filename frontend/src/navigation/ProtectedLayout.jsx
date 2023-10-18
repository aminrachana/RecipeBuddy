import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
    const { userToken } = useSelector((state) => state.auth);

    if (!userToken) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <>
            <Outlet />
        </>
    )
};