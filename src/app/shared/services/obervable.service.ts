import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class ObservableService {
  public readonly MAX_WIDTH_MOBILE = '840px';
  private readonly breakpointObservable = inject(BreakpointObserver);
  isMobile$ = this.breakpointObservable.observe(`(max-width: ${this.MAX_WIDTH_MOBILE})`).pipe(map((e) => e.matches));
}
