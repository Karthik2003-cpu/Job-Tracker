import { useEffect } from "react"
import instance from "../utils/Axios";
import { useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(" ");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(" ");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await instance.get('/auth/me');
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/jobs');
                setJobs(response.data.Jobs);
            } catch (error) {
                setError(error.response?.data?.message);
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <p>Loading....</p>;

    const welcomeStyle = {
        fontSize: '2.5rem',
        fontWeight: '300', // Light font weight is key for "premium"
        fontFamily: '"Inter", serif', // Or 'Inter', sans-serif
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        margin: '20px 0',
        // Premium Gradient (Champagne Gold to Soft Bronze)
        background: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fcf6ba, #aa771c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'block',
        textAlign: 'center'
    };

    const crazyStyle = {
        display: 'inline-block',
        padding: '2px 12px',
        fontWeight: '900',
        borderRadius: '4px',
        // Deep, vibrant colors that pop on white (Vivid Purple/Blue/Red)
        color: `hsl(${jobs.length * 137.5 % 360}, 70%, 45%)`,
        // Darker shadow to create depth on a light surface
        textShadow: `2px 2px 0px rgba(0,0,0,0.1), 0 0 8px currentColor`,
        background: 'rgba(0,0,0,0.03)', // Very faint grey to define the area
        transform: `skewX(${jobs.length % 2 === 0 ? '-10deg' : '10deg'})`,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };
    const h1Style = {
        fontSize: '3rem',
        color: '#222',
        textTransform: 'uppercase',
        letterSpacing: '-2px',
        // Creates a subtle 3D "stamped" look
        textShadow: '1px 1px 0px #555, 2px 2px 0px #111',
        fontFamily: '"Arial Black", sans-serif',
        background: '#f0f0f0',
        padding: '20px',
        borderRadius: '12px',
        borderLeft: '10px solid #333',
        lineHeight: '1.2'
    };

    return (
        <div>
            <p style={welcomeStyle}>Welcome {user.name}</p>
            <h1 style={h1Style}>You have applied to <span style={crazyStyle}>{jobs.length}</span> jobs</h1>
        </div>
    );
};

export default Dashboard;