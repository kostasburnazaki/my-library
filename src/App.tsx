import React, {
  useEffect,
  useState
} from 'react';
import {
  Navigate,
  NavLink,
  Route,
  Routes
} from 'react-router-dom';

import { Loader } from './components/Loader';
import { Pagination } from './components/Pagination';
import { Courses } from './components/Courses'
import { CourseComponent } from './components/CourseComponent';
import { initValues } from './constants/initValues';

import { fetchClient } from './utils/api';
import { Course } from './types/Course';

export const App = () => {
  const [courses, setCourses] = useState<Course[]>(initValues.courses);
  const [loadingStatus, setLoading] = useState<boolean>(initValues.loadingStatus);
  const [currentPage, setCurrentPage] = useState<number>(initValues.currentPage);
  const [coursesPerPage] = useState<number>(initValues.coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  useEffect(() => {
    fetchClient.getCourses()
      .then(coursesData => {
        setCourses(coursesData.courses);
        setLoading(false);
      })
      .catch(err => console.warn(err))
  }, []);

  return (
    <>
      <header className='has-background-light'>
        <NavLink to='/home'>
          <h1 className="
              is-link
              title
              is-size-1
              has-text-centered
              has-text-primary
              py-6
            ">
            Courses
          </h1>
        </NavLink>
      </header>

      <main className='has-background-light'>
        <Routes>
          <Route
            path="/"
            element={
              loadingStatus
                ? <Loader />
                :
                <>
                  <Pagination
                    coursesPerPage={coursesPerPage}
                    totalCourses={courses.length}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                  />
                  <Courses courses={currentCourses} />
                  <Pagination
                    coursesPerPage={coursesPerPage}
                    totalCourses={courses.length}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                  />
                </>
            }
          />

          <Route
            path="home"
            element={
              <Navigate to="/" replace />
            }
          />

          <Route
            path=":slug"
            element={
              <CourseComponent
                coursesData={courses}
              />
            }
          />
        </Routes>
      </main>

      <footer>
      </footer>
    </>
  );
};
