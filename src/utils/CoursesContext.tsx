import {
  createContext,
  useContext,
} from 'react';
import { Course } from '../types/Course';

type CoursesContextType = {
  courses: Course[] | null,
};

export const CoursesContext = createContext<CoursesContextType>({
  courses: null,
});

export const useCoursesContext = () => useContext(CoursesContext);