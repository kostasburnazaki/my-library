import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { CoursePreview } from './CoursePreview';

test("Details button is a link", () => {
  const courseMock = {
    title: "My title",
    lessonsCount: 1,
    previewImageLink: "string",
    rating: 1,
    slug: "string",
    skills: [],
  };
  const videoJs = {
    muted: true,
    crossorigin: true,
    autoplay: false,
    controls: false,
    responsive: true,
    fluid: true,
    poster: false,
    sources: [{
      src: 'string',
      type: 'application/x-mpegURL'
    }]
  }

  render(
    <Router>
      <CoursePreview course={courseMock} videoJsOptions={videoJs} />
    </Router>);

  const detailsLink = screen.getByRole('link', { name: /details/i })
  
  expect(detailsLink).toHaveAttribute('href', `#/${courseMock.slug}`);
})
