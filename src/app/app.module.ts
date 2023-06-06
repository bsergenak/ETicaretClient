import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt'
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorInterceptorService } from './services/common/http-error-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AdminModule, UiModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("accessToken"),
                allowedDomains: ["localhost:7083"]
            }
        }),
        SocialLoginModule
    ],
    providers: [
        { provide: "baseUrl", useValue: "https://localhost:7083/api", multi: true },
        {
            provide: "SocialAuthServiceConfig",
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider("416772859083-bhud8877dt72ll9e8o1ai38cog79bepl.apps.googleusercontent.com")
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider("3440249389576505")
                    }
                ],
                onError: err => console.log(err)
            } as SocialAuthServiceConfig
        },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }