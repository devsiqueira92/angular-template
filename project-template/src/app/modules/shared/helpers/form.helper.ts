import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// import { FilterValue, TgtradedNullableTimestamp } from '@app/api/openapi/v1';
import { logDebug } from './log.helper';

interface FormIsSubmiting {
  isSubmitting?: boolean;
}

interface PasswordCheck {
  passwordCheck?: string | undefined;
}

/* eslint-disable complexity, max-statements */
const checkForm = <T>(
  formGroup: FormGroupTyped<T> | FormGroup | FormControl
) => {
  if (formGroup instanceof FormGroup) {
    for (const key of Object.keys(formGroup.controls)) {
      // @ts-ignore
      const control = formGroup.controls[key];
      control.updateValueAndValidity();

      if (control instanceof FormArray) {
        const formArray = control as FormArray;
        formArray.controls.forEach((c: any) => {
          checkForm(c);
        });
      }

      if (control instanceof FormGroup) {
        checkForm(control);
      }

      if (control.invalid) {
        logDebug(`${key} control is invalid with value `, control.value, '.');
      }
    }
  }

  if (formGroup instanceof FormControl) {
    const control = formGroup;
    control.updateValueAndValidity();

    if (control.invalid) {
      logDebug(`control is invalid with value `, control.value, '.');
    }
  }

  return formGroup.valid === true;
};
/* eslint-enable */

const requiredIf =
  (test: (control: AbstractControl) => boolean) =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || test(control) === false) {
      return null;
    }
    return Validators.required(control);
  };

function greaterThan(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }
    const forbidden = Number(control.value) <= value;
    return forbidden ? { greaterThan: { value: control.value } } : null;
  };
}

// const mapToSelectOptions = (value: FilterValue): { label: string; value: any } => ({
//     label: value.key as string,
//     value: value.key as string,
// });

const generateFakeId = (length = 20): string => {
  const result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join('');
};

const getChangedValues = <T>(formGroup: FormGroupTyped<T>) => {
  const dirtyValues: Partial<T> = {};
  type K = keyof T;

  Object.keys(formGroup.controls).forEach((key) => {
    const currentControl = formGroup.controls[key as K];
    if (currentControl.dirty) {
      dirtyValues[key as K] = currentControl.value;
    }
  });

  return dirtyValues;
};

// eslint-disable-next-line no-undefined
const isNullOrUndefined = (a: any) => a === undefined || a === null;

const deleteEmptyKeysAndArrays = (object: any) => {
  const cleanEntity = { ...object };
  Object.keys(cleanEntity).forEach(
    (k) =>
      (isNullOrUndefined(cleanEntity[k]) ||
        (cleanEntity[k] as Array<any>).length === 0) &&
      delete cleanEntity[k]
  );
  return cleanEntity;
};

// const toDate = (value?: string | TgtradedNullableTimestamp) =>
//     typeof value === 'object' ? (value as TgtradedNullableTimestamp)?.value : value;

const getFormInvalidFields = (form: FormGroup) =>
  Object.keys(form.controls)
    .map((key) => {
      const controlErrors: ValidationErrors = form.get(key)
        ?.errors as ValidationErrors;
      return controlErrors ? key : null;
    })
    .filter((it) => Boolean(it));

export {
  checkForm,
  requiredIf,
  greaterThan,
  FormIsSubmiting,
  PasswordCheck,
  // mapToSelectOptions,
  generateFakeId,
  getChangedValues,
  deleteEmptyKeysAndArrays,
  // toDate,
  getFormInvalidFields,
  isNullOrUndefined,
};
