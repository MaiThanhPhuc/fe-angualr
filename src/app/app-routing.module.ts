import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService } from './auth-guard.service'
import { LoginGuardService } from './login-guard.service'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { RegisterComponent } from './pages/register/register.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
import { SettingComponent } from './pages/setting/setting.component'
import { TabComponent } from './pages/tab/tab.component'
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component'

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuardService],
    },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:id/:token', component: ResetPasswordComponent },
    { path: 'verifyEmail/:id/:token', component: VerifyEmailComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'setting',
                component: SettingComponent,
            },
            {
                path: 'tab',
                component: TabComponent,
            },
        ],
        canActivate: [AuthGuardService],
    },
]

// back and continue keep

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
