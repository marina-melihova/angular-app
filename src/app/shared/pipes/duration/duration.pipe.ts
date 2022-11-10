import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { numToString } from '..';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: number, mode?: string): SafeHtml {
    const countHours = Math.floor(value / 60);
    const min = numToString(value % 60);
    const label = countHours > 1 || countHours === 0 ? 'hours' : 'hour';
    const hour = numToString(countHours);
    const plainText = `${hour}:${min} ${label}`;
    const html = `<span class="time">${hour}:${min}</span> ${label}`;
    return mode === 'html'
      ? this._sanitizer.bypassSecurityTrustHtml(html)
      : plainText;
  }
}
