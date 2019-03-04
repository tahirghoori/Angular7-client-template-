import { NgModule } from '@angular/core';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ProfileModule } from './profile/profile.module';
import { LogoutModule } from './logout/logout.module';
import { AuthenticationService } from './authentication.service';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        LogoutModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,

        // Profile
        ProfileModule,

     
    ]
})
export class AuthenticationModule {

}
