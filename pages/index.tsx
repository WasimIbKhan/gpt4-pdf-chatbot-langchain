import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Login from './LoginPage'; // Your Login component
import { useSelector } from 'react-redux';

interface RootState {
  auth: {
    isAuthenticated: boolean;
  };
  // ... other slices of state
}

export default function Home() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    console.log(authenticated)
    useEffect(() => {
        if (authenticated) {
            setIsAuthenticated(true);
        }
    }, [authenticated]); // Added dependency to re-run effect when authenticated changes

    if (isAuthenticated) {
        router.push('/ChatPage'); // Redirect to ChatPage if authenticated
        return null;
    }

    return <Login />; // Render the Login component if not authenticated
}
