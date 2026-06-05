import { useState, useEffect } from 'react';
import instance from '../utils/Axios';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(" ");
    const [error, setError] = useState(" ");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await instance.get('/auth/me');
                setUser(response.data.user);
            } catch (error) {
                setError(error.response?.data?.message);
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

    const getStatusBadgeColor = (status) => {
        switch(status) {
            case 'applied': return 'bg-info';
            case 'interview': return 'bg-warning';
            case 'selected': return 'bg-success';
            case 'rejected': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    if (loading) return <p className="text-center mt-5">Loading....</p>

    return (
        <div className="container py-5">
            <h2 className="mb-4">My Job Applications</h2>
            
            {jobs.length > 0 ? (
                <div className="row g-4">
                    {jobs.map((job) => (
                        <div key={job._id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm hover-shadow" style={{ transition: 'box-shadow 0.3s' }}>
                                
                                {/* Logo Section */}
                                <div className="text-center p-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    {job.logo ? (
                                        <img 
                                            src={job.logo} 
                                            alt={job.company}
                                            className="rounded-circle"
                                            style={{ 
                                                width: '100px', 
                                                height: '100px', 
                                                objectFit: 'cover',
                                                border: '3px solid #dee2e6'
                                            }}
                                        />
                                    ) : (
                                        <div 
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{ 
                                                width: '100px', 
                                                height: '100px',
                                                backgroundColor: '#e9ecef',
                                                margin: '0 auto',
                                                border: '3px dashed #dee2e6'
                                            }}
                                        >
                                            <span className="text-muted">No Logo</span>
                                        </div>
                                    )}
                                </div>

                                {/* Card Body */}
                                <div className="card-body">
                                    <h5 className="card-title">{job.company}</h5>
                                    
                                    <div className="mb-3">
                                        <p className="card-text mb-2">
                                            <strong>Role:</strong> {job.role}
                                        </p>
                                        <p className="card-text mb-2">
                                            <strong>Type:</strong> 
                                            <span className="ms-2 badge bg-primary">{job.type}</span>
                                        </p>
                                        <p className="card-text mb-2">
                                            <strong>Status:</strong>
                                            <span className={`ms-2 badge ${getStatusBadgeColor(job.status)}`}>
                                                {job.status}
                                            </span>
                                        </p>
                                        {job.remarks && (
                                            <p className="card-text mb-2">
                                                <strong>Remarks:</strong> {job.remarks}
                                            </p>
                                        )}
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary btn-sm">Edit</button>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="card-footer bg-light text-muted small">
                                    <p className="mb-0">Applied on: {new Date(job.appliedOn).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    <p>You have not applied to any jobs yet.</p>
                </div>
            )}
        </div>
    );
}

export default Jobs;