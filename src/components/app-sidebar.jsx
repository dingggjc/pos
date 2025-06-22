import * as React from 'react';
import {
    CarFront,
    Grid2X2Check,
    LayoutDashboard,
    SlidersHorizontal,
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
    navMainLabelService: 'Services',
    navMainService: [
        {
            title: 'Services Management',
            icon: SlidersHorizontal,
            isActive: true,
            collapsible: true,
            items: [
                {
                    title: 'Manage Categories',
                    url: '/dashboard/manage-categories',
                },
                {
                    title: 'Manage Products',
                    url: '/dashboard/manage-products',
                },
                {
                    title: 'Manage Packages',
                    url: '/dashboard/manage-packages',
                },
                {
                    title: 'Manage Add Ons',
                    url: '/dashboard/manage-addons',
                },
            ],
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
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
