import {
  Component,
  ViewChild,
  ElementRef,
  DoCheck,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements DoCheck, AfterViewChecked {
  courseForm: FormGroup;
  closeBtnIcon: IconName = 'xmark';
  isSubmitted: boolean = false;
  formClasses: Record<string, boolean> = { 'form-container': true };
  btnWidth = '185px';

  @ViewChild('authorsList') authorsList: ElementRef;

  constructor(private fb: FormBuilder, private router: Router) {
    this.buildForm();
  }

  ngDoCheck() {
    this.formClasses['reset'] = !this.isSubmitted;
  }

  ngAfterViewChecked() {
    const inputs = this.authorsList.nativeElement.getElementsByTagName('input');
    if (inputs.length) {
      const lastIndex = inputs.length - 1;
      const countSymbols = this.authors.controls[lastIndex].value.length;
      inputs[lastIndex].style.width = countSymbols + 'ch';
    }
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      authors: this.fb.array([]),
      duration: ['', [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        authorName: ['', Validators.pattern(/^[a-z0-9\s]+$/i)],
      }),
    });
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get authorName() {
    return this.courseForm.get('newAuthor.authorName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    console.log(this.courseForm.value);
    this.authors.clear();
    this.courseForm.reset();
    this.isSubmitted = false;
  }

  onAddAuthor(value: string) {
    if (this.authorName?.valid && this.authorName?.value) {
      const control = new FormControl(value);
      this.authors.push(control);
      this.authorName.reset();
    }
  }

  onRemoveAuthor(id: number) {
    this.authors.removeAt(id);
  }

  goBack() {
    this.router.navigate(['courses']);
  }
}
