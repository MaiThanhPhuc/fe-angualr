import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { RegisterComponent } from './pages/register/register.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoadingComponent } from './components/loading/loading.component'
import { BadgeComponent } from './components/badge/badge.component'
import { DialogComponent } from './components/dialog/dialog.component'
import { SettingComponent } from './pages/setting/setting.component'
import { TabComponent } from './pages/tab/tab.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './token.interceptor'
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { AuthGuardService } from './auth-guard.service'
import { LoginGuardService } from './login-guard.service'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        LoadingComponent,
        BadgeComponent,
        DialogComponent,
        SettingComponent,
        TabComponent,
        ResetPasswordComponent,
        VerifyEmailComponent,
        ForgotPasswordComponent,
        SidebarComponent,
        NavbarComponent,
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        AuthGuardService,
        LoginGuardService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
