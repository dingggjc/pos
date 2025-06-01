import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '@/components/layout/main';
import LandingPage from '../pages/landing/LandingPage';
import Login from '@/auth/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import Transaction from '@/pages/dashboard/Transaction';

const UnauthenticatedRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />

            <Route path='/dashboard' element={<Main />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<Transaction />} />
            </Route>
        </Routes>
    );
};

export default UnauthenticatedRoute;
