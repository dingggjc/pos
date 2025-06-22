import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Main from '@/components/layout/main';
import LandingPage from '../pages/landing/LandingPage';
import Login from '@/auth/Login';
import RouteLoader from '@/components/loader/RouteLoader';

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Transaction = lazy(() => import('@/pages/dashboard/Transaction'));
const ManageProducts = lazy(() => import('@/pages/dashboard/ManageProducts'));
const ManageCategories = lazy(() =>
    import('@/pages/dashboard/ManageCategories')
);
const ManagePackages = lazy(() => import('@/pages/dashboard/ManagePackages'));
const ManageAddOns = lazy(() => import('@/pages/dashboard/ManageAddOns'));

const UnauthenticatedRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />

            <Route path='/dashboard' element={<Main />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <Dashboard />
                        </Suspense>
                    }
                />
                <Route
                    path='transaction'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <Transaction />
                        </Suspense>
                    }
                />
                <Route
                    path='manage-products'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ManageProducts />
                        </Suspense>
                    }
                />
                <Route
                    path='manage-categories'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ManageCategories />
                        </Suspense>
                    }
                />
                <Route
                    path='manage-packages'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ManagePackages />
                        </Suspense>
                    }
                />
                <Route
                    path='manage-addons'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ManageAddOns />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};

export default UnauthenticatedRoute;
