import { trigger, transition, style, animate } from '@angular/animations';

const TIMING = '0.2s';

export const DescentLeftAnimation = (timing: string = TIMING) =>
  trigger('descentLeft', [
    transition(':enter', [
      style({ opacity: 0, width: 0, overflow: 'hidden' }),
      animate(`${timing} ease-out`, style({ opacity: 1, width: '*' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, width: '*', overflow: 'hidden' }),
      animate(`${timing} ease-out`, style({ opacity: 0, width: 0 })),
    ]),
  ]);

export const DescentTopAnimation = (timing: string = TIMING) =>
  trigger('descentTop', [
    transition(':enter', [
      style({ opacity: 0, height: 0, overflow: 'hidden' }),
      animate(`${timing} ease-out`, style({ opacity: 1, height: '*' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, height: '*', overflow: 'hidden' }),
      animate(`${timing} ease-out`, style({ opacity: 0, height: 0 })),
    ]),
  ]);
