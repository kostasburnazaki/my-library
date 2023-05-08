import React, { useState as useStateMock } from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { CourseComponent } from './CourseComponent';
import { CoursesContext } from '../../utils/CoursesContext';

const DETAILED_COURSE = {
  id: "id",
  title: "title",
  tags: [],
  launchDate: "01.01.2000",
  status: "status",
  description: "description",
  duration: 9,
  lessonsCount: 9,
  containsLockedLessons: false,
  previewImageLink: "link",
  rating: 5,
  meta: {
    slug: "slug",
    skills: [],
    courseVideoPreview: {
      link: "link",
      duration: 5,
      previewImageLink: "link"
    },
  },
};

jest.mock("../../constants/initValues", () => {
  return {
    initValues: {
      loadingStatus: false,
    }
  }
})

jest.mock("../../utils/api", () => {
  return {
    fetchClient: {
      getCourse: jest.fn(() => Promise.resolve(DETAILED_COURSE))
    }
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    slug: 'slug',
  }),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('Course component', () => {
  const setState = jest.fn()

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation(init => [init, setState])
  })

  test("Course details has been rendered", () => {

    const courses = [
      {
        id: "id",
        title: "title",
        tags: [],
        launchDate: "01.01.2000",
        status: "status",
        description: "description",
        duration: 9,
        lessonsCount: 9,
        containsLockedLessons: false,
        previewImageLink: "link",
        rating: 5,
        meta: {
          slug: "slug",
          skills: [],
          courseVideoPreview: {
            link: "link",
            duration: 5,
            previewImageLink: "link"
          },
        },
      }
    ];

    render(
      <Router>
        <CoursesContext.Provider value={{ courses }}>
          <CourseComponent />
        </CoursesContext.Provider>
      </Router>);

    const course = screen.getByTestId('course');
    expect(course).toBeTruthy();
  })
})