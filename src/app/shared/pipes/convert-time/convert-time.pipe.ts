import { Pipe, PipeTransform } from '@angular/core';
import { numToString } from '..';

@Pipe({
  name: 'convertTime',
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const min = value % 60;
    const label = hours > 1 || hours === 0 ? 'hours' : 'hour';
    return `${numToString(hours)}:${numToString(min)} ${label}`;
  }
}
