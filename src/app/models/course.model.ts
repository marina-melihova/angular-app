export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface CourseResponse {
  successful: boolean;
  result: Course;
}

export interface CoursesResponse {
  successful: boolean;
  result: Course[];
}
