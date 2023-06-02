import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AuthService } from '../../../services/common/auth.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

    constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService) {
        super(spinner)
    }

    ngOnInit(): void {
    }

    async login(usernameOrEmail: string, password: string) {
        this.showSpinner(SpinnerType.BallAtom);
        await this.userService.login(usernameOrEmail, password, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
        });
    }
}