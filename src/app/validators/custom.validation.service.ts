import { Injectable } from '@angular/core'
import { ValidatorFn, AbstractControl } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class CustomValidationService {
    confirmPasswordValidator(controlName: string, matchingControlName: string) {
        return (controls: AbstractControl) => {
            let control = controls.get(controlName)
            let matchingControl = controls.get(matchingControlName)
            if (
                matchingControl?.errors &&
                !matchingControl.errors['confirmPasswordValidator']
            ) {
                return
            }
            if (control?.value !== matchingControl?.value) {
                matchingControl?.setErrors({ confirmPasswordValidator: true })
            } else {
                matchingControl?.setErrors(null)
            }
        }
    }
}
