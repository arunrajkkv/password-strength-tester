import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/services/app.service';

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

    constructor(private formBuilder: FormBuilder,
      private appService: AppService) { }

    ngOnInit(): void {
        this.initializePasswordField();
        this.resetFormValues();
        this.getMessageFromBackend();
    }

    getMessageFromBackend() {
      this.appService.getMessageFromBackend().subscribe((data: any) => {
        console.log('data:', data);
      })
    }

    initializePasswordField(): void {
        this.loginForm = this.formBuilder.group({
            password: [null, this.setPasswordFeatures()]
        });
    }

    setPasswordFeatures(): any {
        const PASSWORD_FEATURES = [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
            Validators.minLength(4)
        ];
        return PASSWORD_FEATURES;
    }

    checkIfCapsLockEnabled(): void {
        var input = document.getElementById("input-password");
        var text = document.getElementById("text");
        input.addEventListener("keyup", function(event) {
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

    showPassword() {
        this.isShowPassword = !this.isShowPassword;
        document.getElementById('input-password')['type'] = this.isShowPassword ? "text" : "password";
    }

}
