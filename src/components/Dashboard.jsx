import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../../public/Dockerboard_logo.png';
import homeIcon from '../../public/icons/home.png';
import imageIcon from '../../public/icons/image.png';
import containerIcon from '../../public/icons/container.png';
import volumeIcon from '../../public/icons/volume.png';
import learnIcon from '../../public/icons/learn.png';
import settingsIcon from '../../public/icons/ajustes.png';
import '../styles/Dashboard.css';
import Images from './Images.jsx';
import Containers from './Containers.jsx';
import Volumes from './Volumes.jsx';
import Learn from './Learn.jsx';
import Settings from './Settings.jsx';

const Dashboard = () => {
    return (
        <Router>
            <div className="dashboardContainer">
                <div className="dashboardSidebar">
                <img src={logo} alt='Dockerboard Logo' className='logo' />
                  <nav>
                    <div className="sidebarLink"><Link to="/images"><img src={imageIcon} alt="Images Icon" /> Images</Link></div>
                    <div className="sidebarLink"><Link to="/containers"><img src={containerIcon} alt="Containers Icon" /> Containers</Link></div>
                    <div className="sidebarLink"><Link to="/volumes"><img src={volumeIcon} alt="Volumes Icon" /> Volumes</Link></div>
                    <div className="sidebarLink"><Link to="/learn"><img src={learnIcon} alt="Learn Icon" /> Learn</Link></div>
                    <div className="sidebarLink settingsLink"><Link to="/settings"><img src={settingsIcon} alt="Settings Icon" /> Settings</Link></div>
                  </nav>
                </div>
                <div className="dashboardContent">
                    <Routes>
                        <Route path="/images" element={<Images />} />
                        <Route path="/containers" element={<Containers />} />
                        <Route path="/volumes" element={<Volumes />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default Dashboard;