import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import Login from '@/auth/Login';

const UnauthenticatedRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};

export default UnauthenticatedRoute;
