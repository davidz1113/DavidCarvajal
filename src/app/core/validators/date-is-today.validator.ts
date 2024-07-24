import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateIsTodayValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const controlDate = new Date(control.value);
    const currentDate = new Date();

    controlDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    currentDate.setDate(currentDate.getDate() - 1);

    const isToday = controlDate.getTime() === currentDate.getTime();

    return !isToday ? { notToday: true } : null;
  };
}
