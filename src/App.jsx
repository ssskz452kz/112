import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './layouts/DashboardLayout';
import JobBoard from './pages/student/JobBoard';
import ProfileForm from './pages/student/ProfileForm';
import ExploreJobs from './pages/student/ExploreJobs';
import StudentApplications from './pages/student/StudentApplications';
import HRLayout from './layouts/HRLayout';
import HRDashboard from './pages/hr/HRDashboard';
import HRCandidates from './pages/hr/HRCandidates';
import HRJobPost from './pages/hr/HRJobPost';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/student" element={<DashboardLayout />}>
          <Route index element={<ExploreJobs />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="explore" element={<ExploreJobs />} />
          <Route path="applications" element={<StudentApplications />} />
        </Route>

        {/* Protected Dashboard Routes (HR/Employer) */}
        <Route path="/hr" element={<HRLayout />}>
          <Route index element={<HRDashboard />} />
          <Route path="candidates" element={<HRCandidates />} />
          <Route path="post-job" element={<HRJobPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
