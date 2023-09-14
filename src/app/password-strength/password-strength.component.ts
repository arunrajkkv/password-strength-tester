import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-password-strength',
    templateUrl: './password-strength.component.html',
    styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnChanges {

    @Input() public passwordToCheck: string = '';
    @Output() passwordStrength = new EventEmitter<boolean>();
    @Output() strengthEvent = new EventEmitter<string>();

    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    message = '';

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        const PASSWORD = changes.passwordToCheck.currentValue;
        this.setBarColors(4, '#DDD');
        this.getStrengthMessage(PASSWORD);
    }

    setBarColors(noOfBars: number, colorCode: string) {
        for (let i = 0; i < noOfBars; i++) {
            this['bar' + i] = colorCode;
        }
    }

    getStrengthMessage(password: any) {
        if (password) {
            const STRENGTH = this.checkStrength(password);
            const COLOR = this.getColor(STRENGTH);
            this.setBarColors(COLOR.index, COLOR.colorCode);
            if (STRENGTH === 40) {
                this.passwordStrength.emit(true);
            } else {
                this.passwordStrength.emit(false);
            }
            this.setMessage(COLOR.index);
        } else {
            this.message = '';
        }
    }

    checkStrength(password: any) {
        const SAMPLE_PASSWORD_PATTERN = /[$-/:-?{-~!"^_@`\[\]]/g;
        const LOWER_LETTERS = /[a-z]+/.test(password);
        const UPPER_LETTERS = /[A-Z]+/.test(password);
        const NUMBERS = /[0-9]+/.test(password);
        const SYMBOLS = SAMPLE_PASSWORD_PATTERN.test(password);
        const FLAGS = [LOWER_LETTERS, UPPER_LETTERS, NUMBERS, SYMBOLS];
        let force = 0;
        let passedMatches = 0;
        for (const flag of FLAGS) {
            passedMatches += flag === true ? 1 : 0;
        }
        force += 2 * password.length + ((password.length >= 10) ? 1 : 0);
        force += passedMatches * 10;
        if (password.length <= 6 || passedMatches === 1) {
            return Math.min(force, 10);
        } else if (passedMatches === 2) {
            return Math.min(force, 20);
        } else if (passedMatches === 3) {
            return Math.min(force, 30);
        } else if (passedMatches === 4) {
            return Math.min(force, 40);
        } else {
            return force;
        }
    }

    setMessage(index: number) {
        switch (index) {
            case 1:
                this.message = 'Poor';
                break;
            case 2:
                this.message = 'Not Good';
                break;
            case 3:
                this.message = 'Average';
                break;
            case 4:
                this.message = 'Good';
                break;
        }
        this.strengthEvent.emit(this.message);
    }


    getColor(strength: number) {
        let index = 0;
        let colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];
        if (strength <= 10) {
            index = 0;
        } else if (strength <= 20) {
            index = 1;
        } else if (strength <= 30) {
            index = 2;
        } else if (strength <= 40) {
            index = 3;
        } else {
            index = 4;
        }
        return {
            index: index + 1,
            colorCode: colors[index]
        };
    }

}
