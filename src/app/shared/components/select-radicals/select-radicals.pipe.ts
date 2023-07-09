import { Pipe, PipeTransform } from '@angular/core';

import { RadicalResReq } from '@shared/models';

@Pipe({ name: 'selectRadicals', standalone: true, pure: true })
export class SelectRadicalsPipe implements PipeTransform {
  transform(value: RadicalResReq[]): string {
    return value.map((e) => e.kanji)?.join(', ');
  }
}
