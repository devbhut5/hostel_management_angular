import { Routes } from "@angular/router";

export const StudentRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/student-list/student-list').then((c) => c.StudentList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./pages/student-view/student-view').then((c) => c.StudentView)
    },
    {
        path: "add",
        loadComponent: () => import('./pages/student-add-edit/student-add-edit').then((c) => c.StudentAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./pages/student-add-edit/student-add-edit').then((c) => c.StudentAddEdit)
    }
]