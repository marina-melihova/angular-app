import { Component, Input, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  classes: Record<string, boolean | undefined | null> = { btn: true };

  @Input() btnText?: string;
  @Input() btnIcon?: IconName;
  @Input() disabled?: boolean | null = null;
  @Input() type?: 'submit' | 'button' | 'reset' = 'button';
  @Input() invert?: boolean;
  @Input() width?: string;

  style: Record<string, string | undefined | null> | null = null;

  ngOnInit() {
    if (this.invert) {
      this.classes['invert'] = this.invert;
    }

    if (this.width) {
      this.style = { width: this.width };
    }
  }
}
