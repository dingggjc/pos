import * as React from 'react';
import {
    CarFront,
    FileBarChart,
    Grid2X2Check,
    LayoutDashboard,
    Users,
    ChartColumnIncreasing,
    Package,
    Puzzle,
    Boxes,
    Layers,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';

import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFq-4yfk7_vJf6u1opG0vMQq_2sAGR89Opw&s',
    },
    teams: [
        {
            name: 'Carwash Shop',
            logo: CarFront,
            plan: 'Point of Sale',
        },
    ],
    navMainLabelMenu: 'Menu',
    navMainMenu: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Transaction',
            url: '/dashboard/transaction',
            icon: Grid2X2Check,
            isActive: true,
            collapsible: false,
        },
    ],
    title: 'Services Management',
    navMainLabelService: 'Services ',
    navMainService: [
        {
            title: 'Manage Categories',
            url: '/dashboard/services-categories',
            icon: Layers,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Manage Products',
            url: '/dashboard/services-products',
            icon: Boxes,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Manage Packages',
            url: '/dashboard/services-packages',
            icon: Package,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Manage Add Ons',
            url: '/dashboard/services-addons',
            icon: Puzzle,
            isActive: true,
            collapsible: false,
        },
    ],
    navMainLabelAdmin: 'Operations',
    navMainAdmin: [
        {
            title: 'Staff Management',
            url: '/dashboard/operations-staff',
            icon: Users,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Sales Report',
            url: '/dashboard/operations-sales-report',
            icon: ChartColumnIncreasing,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Transaction Report',
            url: '/dashboard/operations-transaction-report',
            icon: FileBarChart,
            isActive: true,
            collapsible: false,
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain
                    items={data.navMainMenu}
                    label={data.navMainLabelMenu}
                />
                <NavMain
                    items={data.navMainService}
                    label={data.navMainLabelService}
                />
                <NavMain
                    items={data.navMainAdmin}
                    label={data.navMainLabelAdmin}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
