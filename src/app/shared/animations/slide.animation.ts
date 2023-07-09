import { trigger, transition, style, animate } from '@angular/animations';

const TIMING = '0.2s';

export const SlideLeftToRightAnimation = (timing: string = TIMING) =>
  trigger('slideLeftToright', [
    transition(':enter', [
      style({ opacity: 0, width: 0, 'max-width': 0, 'min-width': 0, overflow: 'hidden' }),
      animate(`${timing} ease-out`, style({ opacity: 1, width: '*', 'max-width': '*', 'min-width': '*' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, width: '*', 'max-width': '*', 'min-width': '*', overflow: 'hidden' }),
      animate(`${timing} ease-out`, style({ opacity: 0, width: 0, 'max-width': 0, 'min-width': 0 })),
    ]),
  ]);

export const SlideTopToBottomAnimation = (timing: string = TIMING) =>
  trigger('slideTopToBottom', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20%)' }),
      animate(`${timing} ease-out`, style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0)' }),
      animate(`${timing} ease-out`, style({ opacity: 0, transform: 'translateY(-20%)' })),
    ]),
  ]);
