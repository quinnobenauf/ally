import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TableListComponent } from '../table-list/table-list.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AuthGuard } from '../../auth/auth.guard';

const adminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard',      component: DashboardComponent },
            { path: 'user-profile',   component: UserProfileComponent },
            { path: 'table-list',     component: TableListComponent }
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