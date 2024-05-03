import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../../public/Dockerboard_logo.png';
import '../styles/Dashboard.css';
import Images from './Images.jsx';
import Containers from './Containers.jsx';
import Volumes from './Volumes.jsx';

const Dashboard = () => {
    return (
        <Router>
            <div className="dashboardContainer">
                <div className="dashboardSidebar">
                <img src={logo} alt='Logo' className='logo' />
                  <nav>
                    <Link to="/images">Images</Link>
                    <Link to="/containers">Containers</Link>
                    <Link to="/volumes">Volumes</Link>
                  </nav>
                </div>
                <div className="dashboardContent">
                    <Routes>
                        <Route path="/images" element={<Images />} />
                        <Route path="/containers" element={<Containers />} />
                        <Route path="/volumes" element={<Volumes />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default Dashboard;