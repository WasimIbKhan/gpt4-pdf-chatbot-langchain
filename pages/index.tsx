import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Login from './LoginPage'; // Your Login component
export default function Home() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log(token)
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    if (isAuthenticated) {
        router.push('/ChatPage'); // Redirect to ChatPage if authenticated
        return null;
    }

    return <Login />; // Render the Login component if not authenticated
}
