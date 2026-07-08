import { Routes } from "@angular/router";

export const RoomRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/room-list/room-list').then((c) => c.RoomList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./pages/room-view/room-view').then((c) => c.RoomView)
    },
    {
        path: "add",
        loadComponent: () => import('./pages/room-add-edit/room-add-edit').then((c) => c.RoomAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./pages/room-add-edit/room-add-edit').then((c) => c.RoomAddEdit)
    }
]