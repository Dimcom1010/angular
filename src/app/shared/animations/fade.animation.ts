import { trigger, transition, style, animate } from '@angular/animations';

const TIMING = '0.2s';

export const FadeAnimation = (timing: string = TIMING) =>
  trigger('fade', [
    transition(':enter', [style({ opacity: 0 }), animate(`${timing} ease-out`, style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate(`${timing} ease-out`, style({ opacity: 0 }))]),
  ]);
