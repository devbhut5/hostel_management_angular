import { Routes } from "@angular/router";

export const SettingRoutes: Routes = [
    {
        path: "hostel-information",
        loadChildren: () => import('./pages/hostel-information/hostel-information.routes').then((c) => c.HostelInformationRoutes)
    },
    {
        path: "fee-configuration",
        loadChildren: () => import('./pages/fee-configuration/fee-configuration.routes').then((c) => c.FeesConfigurationRoutes)
    },

]