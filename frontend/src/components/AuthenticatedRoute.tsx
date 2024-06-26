import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';
import { toast } from 'react-toastify';

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
    children,
}) => {
    const location = useLocation();
    const { loading, user } = useAuth();

    if (loading) {
        return <div>loading</div>;
    }
    if (user) return <>{children}</>;
    else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};