import { Routes } from "@angular/router";

export const HostelRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/hostel-list/hostel-list').then((c) => c.HostelList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./pages/hostel-view/hostel-view').then((c) => c.HostelView)
    },
    {
        path: "add",
        loadComponent: () => import('./pages/hostel-add-edit/hostel-add-edit').then((c) => c.HostelAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./pages/hostel-add-edit/hostel-add-edit').then((c) => c.HostelAddEdit)
    }
]