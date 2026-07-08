import { Routes } from "@angular/router";

export const FeeRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/fee-list/fee-list').then((c) => c.FeeList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./pages/fee-view/fee-view').then((c) => c.FeeView)
    },
    {
        path: "add",
        loadComponent: () => import('./pages/fee-add-edit/fee-add-edit').then((c) => c.FeeAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./pages/fee-add-edit/fee-add-edit').then((c) => c.FeeAddEdit)
    }
]