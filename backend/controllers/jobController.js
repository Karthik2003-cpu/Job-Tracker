import Job from '../models/Jobs.js';

const addJob = async (req, res) => {
    const { company, type, role, status, remarks } = req.body;
    try {
        const newJob = new Job({
            userId: req.user._id,
            company,
            type,
            role,
            status,
            remarks,
        });

        await newJob.save();

        res.status(201).json({
            message: 'Job created Successfully!!',
            newJob
        });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }

};

const getAllJobs = async (req, res) => {
    try {
        const Jobs = await Job.find({ userId: req.user._id });

        if (Jobs.length === 0) {
            return res.status(404).json({
                message: 'No jobs applied yet!!'
            });
        }

        res.status(200).json({
            message: `${Jobs.length} Jobs found!!`,
            Jobs
        });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const getJob = async (req, res) => {
    const JobId = req.params.id;
    try {
        const job = await Job.findById(JobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job not found!'
            });
        }
        else if (job.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Not Authorized!!'
            });
        }

        res.status(200).json({
            message: 'Job found!',
            job
        });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const updateJob = async (req, res) => {
    const JobId = req.params.id;
    const { company, type, role, status, remarks, interviewOn, codingTestOn } = req.body;
    try {
        const job = await Job.findById(JobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job not found!!'
            });
        }

        else if (job.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Not Authorized!!'
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            JobId,
            { company, type, role, status, remarks, interviewOn, codingTestOn },
            { returnDocument: 'after' }
        );

        res.status(200).json({
            message: 'Job updated Successfully!!',
            updatedJob
        });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const deleteJob = async (req, res) => {
    const JobId = req.params.id;

    try {
        const job = await Job.findById(JobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job not found!!'
            });
        }

        else if (job.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'Not Authorized!!'
            });
        }

        await Job.findByIdAndDelete(JobId);

        res.status(200).json({ message: 'Job deleted Successfully!!' })
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

export { addJob, getAllJobs, getJob, updateJob, deleteJob };