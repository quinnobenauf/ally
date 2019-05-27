import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TableListComponent } from '../table-list/table-list.component';
import { TypographyComponent } from '../typography/typography.component';
import { IconsComponent } from '../icons/icons.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { LoginComponent } from '../auth/login/login.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AuthGuard } from 'app/layouts/auth/auth.guard';
import { CreateUserComponent } from '../auth/create-user/create-user.component';

const adminLayoutRoutes: Routes = [
    {
        path: 'create-user',
        component: CreateUserComponent,
        children: [
            {
                path: '',
                component: AdminLayoutComponent,
                children: [
                    { path: 'dashboard',      component: DashboardComponent },
                    { path: 'user-profile',   component: UserProfileComponent },
                    { path: 'table-list',     component: TableListComponent },
                    { path: 'typography',     component: TypographyComponent },
                    { path: 'icons',          component: IconsComponent },
                    { path: 'maps',           component: MapsComponent },
                    { path: 'notifications',  component: NotificationsComponent }
                ]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        children: [
            {
                path: '',
                component: AdminLayoutComponent,
                children: [
                    { path: 'user', redirectTo: '/dashboard', pathMatch: 'full' },
                    { path: 'dashboard',      component: DashboardComponent },
                    { path: 'user-profile',   component: UserProfileComponent },
                    { path: 'table-list',     component: TableListComponent },
                    { path: 'typography',     component: TypographyComponent },
                    { path: 'icons',          component: IconsComponent },
                    { path: 'maps',           component: MapsComponent },
                    { path: 'notifications',  component: NotificationsComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminLayoutRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminLayoutRoutingModule {}