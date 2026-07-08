import { Routes } from "@angular/router";

export const HostelInformationRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./hostel-information-list/hostel-information-list').then((c) => c.HostelInformationList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./hostel-information-view/hostel-information-view').then((c) => c.HostelInformationView)
    },
    {
        path: "add",
        loadComponent: () => import('./hostel-information-add-edit/hostel-information-add-edit').then((c) => c.HostelInformationAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./hostel-information-add-edit/hostel-information-add-edit').then((c) => c.HostelInformationAddEdit)
    }
]