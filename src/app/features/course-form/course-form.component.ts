import { Component, DoCheck, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject, takeUntil, BehaviorSubject } from 'rxjs';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { CoursesStoreService, AuthorsStoreService } from 'src/app/services';
import { Course, Author, CourseResponse, AuthorResponse } from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements DoCheck, OnDestroy {
  pageTitle: string;
  submitText: string;
  courseForm: FormGroup;
  closeBtnIcon: IconName = 'xmark';
  isEditMode: boolean;
  course: Course | null = null;
  courseId: string = '';
  isSubmitted: boolean = false;
  formClasses: Record<string, boolean> = { 'form-container': true };
  btnWidth = '185px';
  isLoading: boolean = false;
  private destroyStream = new Subject<void>();
  private authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  currentAuthors: Author[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authorsStoreService: AuthorsStoreService,
    private coursesStoreService: CoursesStoreService
  ) {
    this.isEditMode = this.route.snapshot.url[0].path === 'edit' ? true : false;
    this.pageTitle = this.isEditMode ? 'Course edit page' : 'Course create page';
    this.submitText = this.isEditMode ? 'Save course' : 'Create course';
    this.authorsStoreService.authors$.subscribe(this.authors$);
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.courseId = this.route.snapshot.paramMap.get('id') || '';
      this.initCourseData();
    } else {
      this.buildForm();
    }
  }

  ngDoCheck() {
    this.formClasses['reset'] = !this.isSubmitted;
  }

  buildForm() {
    let authorsNames: string[] = [];
    if (this.course) {
      const allAuthors = this.authors$.getValue();
      this.currentAuthors = this.course.authors.map((authorId: string) =>
        allAuthors.find(({ id }) => id === authorId)
      ) as Author[];
      authorsNames = this.currentAuthors.map(({ name }) => name);
    }
    this.courseForm = this.fb.group({
      title: [this.course?.title || '', Validators.required],
      description: [this.course?.description || '', Validators.required],
      authors: this.fb.array(authorsNames),
      duration: [this.course?.duration || '', [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        authorName: ['', Validators.pattern(/^[a-z0-9\s]+$/i)],
      }),
    });
  }

  initCourseData() {
    this.coursesStoreService
      .getCourse(this.courseId)
      .pipe(takeUntil(this.destroyStream))
      .subscribe((response: CourseResponse) => {
        const course = response.result;
        if (course) {
          this.course = course;
          this.buildForm();
        } else {
          this.router.navigateByUrl('404', { skipLocationChange: true });
        }
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
    courseBody.authors = courseBody.authors.map(
      (authorName: string) => this.currentAuthors.find(({ name }) => name === authorName)!.id
    );
    if (this.isEditMode) {
      courseBody.id = this.courseId;
      this.coursesStoreService.editCourse(courseBody);
      this.goBack();
    } else {
      this.coursesStoreService.createCourse(courseBody);
      this.authors.clear();
      this.courseForm.reset();
      this.isSubmitted = false;
    }
  }

  onAddAuthor(value: string) {
    if (this.authorName?.valid && this.authorName?.value) {
      this.authorsStoreService
        .addAuthor(value)
        .pipe(takeUntil(this.destroyStream))
        .subscribe((response: AuthorResponse) => {
          this.currentAuthors.push(response.result);
        });
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

  ngOnDestroy() {
    this.destroyStream.next();
  }
}
