import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public authService: AuthService, private toastrService: CustomToastrService) {
        authService.identityCheck();
    }

    signOut() {
        localStorage.removeItem("accessToken");
        this.authService.identityCheck();
        this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
        });
    }
}