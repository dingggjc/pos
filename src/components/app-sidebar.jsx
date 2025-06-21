import * as React from 'react';
import {
    CarFront,
    Grid2X2Check,
    LayoutDashboard,
    ShoppingCart,
    Sparkles,
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
    navMainLabel: 'Menu',
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
            isActive: true,
            collapsible: false,
            items: [
                {
                    title: 'History',
                    url: '#',
                },
                {
                    title: 'Starred',
                    url: '#',
                },
                {
                    title: 'Settings',
                    url: '#',
                },
            ],
        },
        {
            title: 'Transaction',
            url: '/dashboard/transaction',
            icon: Grid2X2Check,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Manage Categories',
            url: '/dashboard/manage-categories',
            icon: Sparkles,
            isActive: true,
            collapsible: false,
        },
        {
            title: 'Manage Products',
            url: '/dashboard/manage-products',
            icon: ShoppingCart,
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
                <NavMain items={data.navMain} label={data.navMainLabel} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
