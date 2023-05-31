import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private formBuilder: FormBuilder) { }

    frm: FormGroup;
    ngOnInit(): void {
        this.frm = this.formBuilder.group({
            nameSurname: ["", [Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3)
            ]],
            username: ["", [Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3)
            ]],
            email: ["", [Validators.required,
            Validators.maxLength(250),
            Validators.email
            ]],
            password: ["", [
                Validators.required
            ]],
            passwordConfirm: ["", [
                Validators.required
            ]],
        }, {
            validators: (group: AbstractControl): ValidationErrors | null => {
                let pw = group.get("password").value;
                let pwConfirm = group.get("passwordConfirm").value;
                return pw === pwConfirm ? null : { notSame: true };
            }
        })
    }

    get component() {
        return this.frm.controls;
    }

    submitted: boolean = false;
    onSubmit(data: User) {
        this.submitted = true;
        if (this.frm.invalid)
            return;
    }
}
