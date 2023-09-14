import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/services/app.service';
declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    password: any;
    isLoadStrengthComponent = false;
    isShowPassword = false;
    strengthMessage: string;
    passwordMinLength = 4;
    isCapsLockEnabled = false;

    constructor(private formBuilder: FormBuilder,
        private appService: AppService) { }

    ngOnInit(): void {
        this.initializePasswordField();
        this.resetFormValues();
        // this.getMessageFromBackend();
    }

    getMessageFromBackend(): void {
        this.appService.getMessageFromBackend().subscribe((data: any) => {
            console.log('data:', data);
        })
    }

    initializePasswordField(): void {
        this.loginForm = this.formBuilder.group({
            password: [null, this.setPasswordFeatures()]
        });
    }

    // const PATTERN = new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{${this.passwordMinLength},})`);
    setPasswordFeatures(): any {
        const PATTERN = new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{${this.passwordMinLength},})`);
        const PASSWORD_FEATURES = [
            Validators.required,
            Validators.pattern(PATTERN)
        ];
        return PASSWORD_FEATURES;
    }

    checkIfCapsLockEnabled(): void {
        var input = document.getElementById("input-password");
        var text = document.getElementById("text");
        input.addEventListener("keyup", function (event) {
            text.style.display = event.getModifierState("CapsLock") ? "block" : "none";
        });
    }

    resetFormValues(): void {
        this.loginForm.controls.password.setValue(null);
    }

    checkStrength(): void {
        if (!this.password) {
            alert('Please provide a password to check the strength');
        }
        this.isLoadStrengthComponent = true;
        this.password = this.loginForm.controls.password.value;
    }

    onChangeInputPassword(): void {
        this.isLoadStrengthComponent = false;
    }

    showPassword(): void {
        this.isShowPassword = !this.isShowPassword;
        document.getElementById('input-password')['type'] = this.isShowPassword ? "text" : "password";
    }

    getStrengthFromPasswordComponent(event: any) {
        if (event) {
            this.strengthMessage = event;
        }
    }

    suggestPassword() {
        if (this.password.length <= 3) {
            this.password = this.password + '#$%123' + this.password.charAt(0).toUpperCase() +
                this.getAsciValue(this.password) + this.password.toUpperCase();
        }
    }

    getAsciValue(inputString: string): number {
        return inputString.charCodeAt(0);
    }

    isExistInCommonPasswords(): boolean {
        const COMMON_PASSWORDS = ['abc123', 'aaaaa', '12345', '01234'];
        return COMMON_PASSWORDS.includes(this.password);
    }

    setLength(): void {
        let inputField = document.getElementById('password-min-length');
        this.passwordMinLength = parseInt(inputField['value']);
    }

    hasSpecialCharacterAtStart() {
        const SPECIAL_CHAR_PATTERN = /^[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        return SPECIAL_CHAR_PATTERN.test(this.password);
    }

}
