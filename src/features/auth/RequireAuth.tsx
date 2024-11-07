import toast from 'react-hot-toast';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/app/useAuth';

function RequireAuth({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		toast('권한 없음');
		return <Navigate to="/auth" state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuth;
