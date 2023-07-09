import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const RouteAnimation = trigger('routeAnimations', [
  //   transition('HomePage <=> AboutPage', [
  //     style({ position: 'relative' }),
  //     query(':enter, :leave', [
  //       style({
  //         position: 'absolute',
  //         top: 0,
  //         left: 0,
  //         width: '100%',
  //       }),
  //     ]),
  //     query(':enter', [style({ left: '-100%' })]),
  //     query(':leave', animateChild()),
  //     group([
  //       query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
  //       query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
  //     ]),
  //   ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: 'translateX(0)',
          opacity: 1,
        }),
      ],
      { optional: true },
    ),
    query(':enter', [style({ transform: 'translateX(-50%)' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('200ms ease-out', style({ transform: 'translateX(50%)', opacity: 0 }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ transform: 'translateX(0)' }))], { optional: true }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);
