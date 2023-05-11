  import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import classNames from 'classnames';

import { CoursesContext } from "../../utils/CoursesContext";
import { COURSES_PER_PAGE as coursesPerPage } from '../../constants/constValues';
import { initValues } from "../../constants/initValues";

import { Course } from "../../types/Course";

import { Loader } from "../Loader";
import { ThemeContext } from "../../utils/ThemeContext";

type Props = {
  setCurrentCourses: Dispatch<SetStateAction<Course[] | null>>,
};

export const Pagination: FC<Props> = ({ setCurrentCourses }) => {
  const [currentPage, setCurrentPage] = useState<number>(initValues.currentPage);
  const { courses } = useContext(CoursesContext);
  const { darkTheme } = useContext(ThemeContext);

  
  useEffect(() => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);
    if (currentCourses) {
      setCurrentCourses(currentCourses);
    }
  }, [courses, currentPage, setCurrentCourses])
  
  if (courses) {
    const pageNumbers = [];
    const totalCourses = courses.length;

    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
      pageNumbers.push(i)
    }
    return (
      <nav className="pagination is-centered py-4">
        <ul className="pagination-list">
          {pageNumbers.map(pageNumber => (
            <li key={pageNumber}>
              <a
                className={classNames(
                  'pagination-link',
                  { 'is-current': pageNumber === currentPage },
                  { 'light': darkTheme}
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(pageNumber);
                }}
                href="!#">
                {pageNumber}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <Loader />
  )
}
