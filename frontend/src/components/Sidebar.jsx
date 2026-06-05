import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h2>Job Tracker</h2>
            <nav>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button onClick={() => navigate('/jobs')}>My Jobs</button>
                <button onClick={() => navigate('/add-job')}>Add Job</button>
            </nav>
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>Logout</button>
        </div>
    );
};

export default Sidebar;