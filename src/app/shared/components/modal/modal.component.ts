import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() okBtnText: string = 'ok';
  @Input() cancelBtnText: string = 'cancel';

  @Output() confirm = new EventEmitter<boolean>();

  closeBtnIcon: IconName = 'xmark';
  btnWidth: string = '135px';

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  @HostListener('window:keydown.escape', [])
  closeModalKeydown() {
    this.confirm.emit(false);
  }

  onConfirm(isOk: boolean) {
    this.confirm.emit(isOk);
  }

  handleClick(element: MouseEvent) {
    const target = element.target as HTMLElement;
    if (target.className === 'overlay') {
      this.confirm.emit(false);
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }
}
