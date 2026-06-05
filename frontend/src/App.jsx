import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Layout from "./components/Layout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Jobs from "./components/Jobs.jsx";
import AddJobs from "./components/AddJobs.jsx";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/jobs" element={
          <Layout>
            <Jobs />
          </Layout>
        } />
        <Route path="/add-job" element={
          <Layout>
            <AddJobs />
          </Layout>
        } />
      </Routes>

    </BrowserRouter>
  );
};

export default App;