import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from '../utils/Axios';

const AddJobs = () => {
    const [job, setJob] = useState(" ");
    const [user, setUser] = useState(" ");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(" ")

    const [formData, setFormData] = useState({
        userId: "",
        company: "",
        type: "",
        role: "",
        status: "",
        remarks: "",
        logo: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await instance.get('/auth/me');
                setUser(response.data.user);
                setFormData(prev => ({ ...prev, userId: response.data.user._id }));
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

    const handleAddJob = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await instance.post('/jobs', formData);
            setJob(response.data.newJob);
            alert("Job added Successfully!");
            setFormData(prev => ({
                userId: prev.userId,
                company: "",
                type: "",
                role: "",
                status: "",
                remarks: "",
                logo: ""
            }));
        } catch (error) {
            setError(error.response?.data?.message);
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error && error !== " ") return <p>{error}</p>;
    return (

        <form onSubmit={handleAddJob} className="row g-3">
            <div className="col-md-6">
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
            </div>
            <button
                type="button"
                onClick={() => {
                    if (window.cloudinary) {
                        window.cloudinary.openUploadWidget({
                            cloudName: "dyeazuh1y",
                            uploadPreset: "ml_default",
                            sources: ["local", "url", "camera"],
                        }, (error, result) => {
                            if (!error && result && result.event === "success") {
                                setFormData(prev => ({
                                    ...prev,
                                    logo: result.info.secure_url
                                }));
                            }
                        });
                    } else {
                        alert("Upload widget is loading, please try again");
                    }
                }}
                className="btn btn-secondary"
            >
                Upload logo (Optional)
            </button>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Type</label>
                <select
                    className="form-select"
                    id="inputGroupSelect01"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                >
                    <option value="">Select Type</option>
                    <option value="service">Service</option>
                    <option value="product">Product</option>
                </select>
            </div>

            <div className="col-12">
                <label htmlFor="role" className="form-label">Role</label>
                <input
                    type="text"
                    className="form-control"
                    id="role"
                    placeholder="Software Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                />
            </div>

            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="statusSelect">Status</label>
                <select
                    className="form-select"
                    id="statusSelect"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value="">Select Status</option>
                    <option value="applied">Applied</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                    <option value="interview">Interview</option>
                </select>
            </div>

            <div className="col-md-6">
                <label htmlFor="remarks" className="form-label">Remarks</label>
                <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Job</button>
        </form>
    );
}

export default AddJobs;