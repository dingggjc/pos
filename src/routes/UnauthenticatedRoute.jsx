import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';

const UnauthenticatedRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
        </Routes>
    );
};

export default UnauthenticatedRoute;
