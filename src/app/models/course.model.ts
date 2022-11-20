export interface CourseBody {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export interface Course extends CourseBody {
  id: string;
  creationDate: string;
}

export interface CourseResponse {
  successful: boolean;
  result: Course;
}

export interface CoursesResponse {
  successful: boolean;
  result: Course[];
}
