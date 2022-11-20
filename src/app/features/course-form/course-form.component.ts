import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject, BehaviorSubject, skipWhile } from 'rxjs';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { CoursesStateFacade, AuthorsStateFacade } from 'src/app/store';
import { Course, Author } from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  pageTitle: string = 'Course create page';
  submitText: string = 'Create course';
  courseForm: FormGroup;
  closeBtnIcon: IconName = 'xmark';
  isEditMode: boolean;
  course: Course | null = null;
  courseId: string = '';
  isSubmitted: boolean = false;
  btnWidth = '185px';

  private addedAuthors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authorsStateFacade: AuthorsStateFacade,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.authorsStateFacade.resetAddedAuthors();
    this.authorsStateFacade.addedAuthors$.subscribe(this.addedAuthors$);
    this.isEditMode = this.route.snapshot.url[0].path === 'edit' ? true : false;
    if (this.isEditMode) {
      this.pageTitle = 'Course edit page';
      this.submitText = 'Save course';
      this.courseId = this.route.snapshot.paramMap.get('id') || '';
      this.coursesStateFacade.getSingleCourse(this.courseId);
      this.coursesStateFacade.course$.subscribe((item) => (this.course = item));
    }
  }

  ngOnInit() {
    this.coursesStateFacade.course$
      .pipe(skipWhile((course) => this.isEditMode && !course))
      .subscribe(() => this.buildForm());
  }

  buildForm() {
    this.courseForm = this.fb.group({
      title: [this.course?.title || '', Validators.required],
      description: [this.course?.description || '', Validators.required],
      authors: this.fb.array(this.course?.authors || []),
      duration: [this.course?.duration || '', [Validators.required, Validators.min(0)]],
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
    const courseBody = { ...this.courseForm.value };
    delete courseBody.newAuthor;
    courseBody.authors = courseBody.authors.map((authorName: string) => {
      const currentAuthors = this.addedAuthors$.getValue();
      return currentAuthors.find(({ name }) => name === authorName)!.id;
    });
    if (this.isEditMode) {
      this.coursesStateFacade.editCourse(this.courseId, courseBody);
    } else {
      this.coursesStateFacade.createCourse(courseBody);
    }
  }

  onAddAuthor(value: string) {
    if (this.authorName?.valid && this.authorName?.value) {
      this.authorsStateFacade.addAuthor(value);
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
