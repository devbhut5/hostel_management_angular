import { Routes } from "@angular/router";

export const FeesConfigurationRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./fee-configuration-list/fee-configuration-list').then((c) => c.FeeConfigurationList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./fee-configuration-view/fee-configuration-view').then((c) => c.FeeConfigurationView)
    },
    {
        path: "add",
        loadComponent: () => import('./fee-configuration-add-edit/fee-configuration-add-edit').then((c) => c.FeeConfigurationAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./fee-configuration-add-edit/fee-configuration-add-edit').then((c) => c.FeeConfigurationAddEdit)
    }
]