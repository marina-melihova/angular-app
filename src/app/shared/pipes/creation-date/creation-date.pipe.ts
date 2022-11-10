import { Pipe, PipeTransform } from '@angular/core';
import { numToString } from '..';

@Pipe({
  name: 'creationDate',
})
export class CreationDatePipe implements PipeTransform {
  transform(value: string): string {
    const dateParts = value.split('/') as unknown as number[];
    const day = numToString(dateParts[0]);
    const month = numToString(dateParts[1]);
    const year = dateParts[2];
    return `${day}.${month}.${year}`;
  }
}
