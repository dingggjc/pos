import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Main from '@/components/layout/main';
import LandingPage from '../pages/landing/LandingPage';
import Login from '@/auth/Login';
import RouteLoader from '@/components/loader/RouteLoader';

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Transaction = lazy(() => import('@/pages/dashboard/Transaction'));
const ServicesProducts = lazy(() =>
    import('@/pages/services/ServicesProducts')
);
const ServicesCategories = lazy(() =>
    import('@/pages/services/ServicesCategories')
);
const ServicesPackages = lazy(() =>
    import('@/pages/services/ServicesPackages')
);
const ServicesAddOns = lazy(() => import('@/pages/services/ServicesAddOns'));

const OperationsStaffManagement = lazy(() =>
    import('@/pages/operations/OperationsStaffManagement')
);

const OperationsSalesReport = lazy(() =>
    import('@/pages/operations/OperationsSalesReport')
);

const OperationsTransactionReport = lazy(() =>
    import('@/pages/operations/OperationsTransactionReport')
);

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
                    path='services-products'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ServicesProducts />
                        </Suspense>
                    }
                />
                <Route
                    path='services-categories'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ServicesCategories />
                        </Suspense>
                    }
                />
                <Route
                    path='services-packages'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ServicesPackages />
                        </Suspense>
                    }
                />
                <Route
                    path='services-addons'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <ServicesAddOns />
                        </Suspense>
                    }
                />
                <Route
                    path='operations-staff'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <OperationsStaffManagement />
                        </Suspense>
                    }
                />
                <Route
                    path='operations-sales-report'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <OperationsSalesReport />
                        </Suspense>
                    }
                />
                <Route
                    path='operations-transaction-report'
                    element={
                        <Suspense fallback={<RouteLoader />}>
                            <OperationsTransactionReport />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};

export default UnauthenticatedRoute;
