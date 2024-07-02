import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";


export class ValidatorsCustom extends Validators {

  private static regexEmail:RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

  public static mustBeEquals(firtsControl: string, secondControl: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fControl = group.get(firtsControl);
      const sControl = group.get(secondControl);
      return fControl?.value === sControl?.value ? null : { mustBeEqual: true };
    }
  }

  public static passwordLength(): ValidatorFn{
    return ({ value }:AbstractControl): ValidationErrors | null => {
      return this.passwordRegex.test(value) ? null :  { passwordIncomplete: true }
    }
  }

  public static dependentField( control:string ):ValidatorFn {
    return (group:AbstractControl): ValidationErrors | null => {
      const fControl = group.get(control);
      return fControl?.value ? { emptyValue: true } : null;
    }
  }

  public static emailAddress(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      return this.regexEmail.test(value) ? null : { emailInvalid: true };
    }
  }
}

