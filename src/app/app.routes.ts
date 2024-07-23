import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    // Redirect empty path to dashboard
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
        data: { title: "Dashboard" }
    },
    // Admin routes
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
                data: { title: "Dashboard" }

            },
            {
                path: "users",
                component: UsersComponent,
                data: { title: "Users" }

            },
        ]
    },
    // Blank routes
    {
        path: "login",
        loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent),
    },

    //Unknown routes
    {
        path: "**",
        redirectTo: "dashboard"
    }
];
