import { Toaster } from 'react-hot-toast';

import { RouterProvider } from 'react-router-dom';
import { routers } from './app/router';

import { AuthProvider } from './features/auth/AuthProvider';

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={routers} />
			<Toaster />
		</AuthProvider>
	);
}

export default App;
