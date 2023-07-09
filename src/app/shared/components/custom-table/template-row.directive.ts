import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[templateRow]' })
export class TemplateRowDirective {
  @Input('templateRow') key!: string;
  constructor(public templateRef: TemplateRef<any>) {}
}
