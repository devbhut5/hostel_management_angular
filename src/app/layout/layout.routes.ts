import { Routes } from "@angular/router";

export const LayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout.component').then((m) => m.LayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('../non-auth/pages/dashboard/dashboard').then((c) => c.Dashboard)
            },
            {
                path: 'hostel',
                loadChildren: () => import('../non-auth/pages/hostel-master/hostel.routes').then((m) => m.HostelRoutes)
            },
            {
                path: 'room',
                loadChildren: () => import('../non-auth/pages/room-master/room.routes').then((m) => m.RoomRoutes)
            },
            {
                path: 'student',
                loadChildren: () => import('../non-auth/pages/student/student.routes').then((m) => m.StudentRoutes)
            },
            {
                path: 'room-allocation',
                loadChildren: () => import('../non-auth/pages/room-allocation/room-allocation.routes').then((m) => m.RoomAllocationRoutes)
            },
            {
                path: 'fee',
                loadChildren: () => import('../non-auth/pages/fee/fee.routes').then((m) => m.FeeRoutes)
            },
            {
                path: 'setting',
                loadChildren: () => import('../non-auth/pages/setting/setting.routes').then((m) => m.SettingRoutes)
            },
        ]
    }
]