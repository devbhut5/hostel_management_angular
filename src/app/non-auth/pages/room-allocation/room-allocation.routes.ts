import { Routes } from "@angular/router";

export const RoomAllocationRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/room-allocation-list/room-allocation-list').then((c) => c.RoomAllocationList)
    },
    {
        path: "view/:id",
        loadComponent: () => import('./pages/room-allocation-view/room-allocation-view').then((c) => c.RoomAllocationView)
    },
    {
        path: "add",
        loadComponent: () => import('./pages/room-allocation-add-edit/room-allocation-add-edit').then((c) => c.RoomAllocationAddEdit)
    },
    {
        path: "edit/:id",
        loadComponent: () => import('./pages/room-allocation-add-edit/room-allocation-add-edit').then((c) => c.RoomAllocationAddEdit)
    }
]