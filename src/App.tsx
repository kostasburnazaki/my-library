import React, {
  useEffect,
  useState,
} from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import classNames from 'classnames';

import './styles/main.scss';

import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { Courses } from './components/Courses'
import { CourseComponent } from './components/CourseComponent';

import { initValues } from './constants/initValues';

import { CoursesContext } from './utils/CoursesContext';
import { ThemeContext } from './utils/ThemeContext';
import { fetchClient } from './utils/api';

import { Course } from './types/Course';


export const App = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(initValues.loadingStatus);
  const [darkTheme, setDarkTheme] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const { courses } = await fetchClient.getCourses();
      setCourses(courses);
      setIsLoading(false);
    };

    fetchData()
      .catch(err => console.warn(err))
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <Header />

        <main className={
          classNames({ dark: darkTheme })
        }>
          <CoursesContext.Provider value={{ courses }}>
            <Routes>
              <Route
                path="/"
                element={
                  isLoading
                    ? <Loader />
                    : (
                      <Courses />
                    )
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
                  <CourseComponent />
                }
              />
            </Routes>
          </CoursesContext.Provider>
        </main >
      </ThemeContext.Provider>
    </>
  );
};
