export interface Course {
  id: string,
  title: string,
  tags: string[],
  launchDate: string,
  status: string,
  description: string,
  duration: number,
  lessonsCount: number,
  containsLockedLessons: boolean,
  previewImageLink: string,
  rating: number,
  meta: Meta,
}

export interface CourseShort {
  title: string,
  lessonsCount: number,
  previewImageLink: string,
  rating: number,
  slug: string,
  skills: string[],
}

interface Meta {
  slug: string,
  skills: string[],
  courseVideoPreview: CourseVideoPreview,
}

interface CourseVideoPreview {
  link: string,
  duration: number,
  previewImageLink: string
}

export interface Lesson {
  id: string,
  title: string,
  duration: number,
  order: number,
  type: string,
  status: string,
  link: string,
  previewImageLink: string,
  meta: null,
}

export interface DetailedCourse extends Course {
  lessons: Lesson[],
  containsLockedLessons: boolean
}

export interface Courses {
  courses: Course[],
}