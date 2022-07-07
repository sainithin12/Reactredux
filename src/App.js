import About from './components/about/About';
import Home from './components/home/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import PageNotFound from './components/PageNotFound';
import Courses from './components/courses/Courses';
import ManageCourse from './components/courses/ManageCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div id="app" className="container-fluid">
                <Header />
                <Routes>
                    <Route path="/react-courses/" element={<Home />} />
                    <Route path="/react-courses/about" element={<About />} />
                    <Route path="/react-courses/courses" element={<Courses />} />
                    <Route path="/react-courses/course/:slug" element={<ManageCourse />} />
                    <Route path="/react-courses/course" element={<ManageCourse />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <ToastContainer hideProgressBar autoClose={3000} />
            </div>
        </Router>
    );
}

export default App;
