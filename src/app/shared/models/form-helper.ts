import { FormControl } from '@angular/forms';

export type FormHelper<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
