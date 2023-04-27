import React, { FC, useRef, useState } from "react";
import { Course, CourseShort } from "../../types/Course";
import { CoursePreview } from "../CoursePreview";
import { JsOptions } from "../../types/VideoJSOptions";
import { Pagination } from "../Pagination";

export const Courses: FC = () => {
  const [currentCourses, setCurrentCourses] = useState<Course[] | null>(null);

  return (
    <>
      <Pagination
        setCurrentCourses={setCurrentCourses}
      />

      {currentCourses && (
        <>
          <ul className='has-text-centered'>
            {currentCourses.map(({
              id,
              title,
              lessonsCount,
              previewImageLink,
              rating,
              meta: {
                courseVideoPreview,
                slug,
                skills,
              }
            }: Course) => {
              const videoJsOptions: JsOptions = {
                muted: true,
                crossorigin: true,
                autoplay: false,
                controls: false,
                responsive: true,
                fluid: true,
                poster: false,
                sources: [{
                  src: courseVideoPreview?.link,
                  type: 'application/x-mpegURL'
                }]
              };

              const coursePreview: CourseShort = {
                title,
                lessonsCount,
                previewImageLink,
                rating,
                slug,
                skills,
              };

              return (
                <li
                  key={id}
                  className="
                    has-text-info
                    py-6
                  "
                >
                  <CoursePreview
                    course={coursePreview}
                    videoJsOptions={videoJsOptions}
                  />
                </li>
              )
            })

            }
          </ul>
        </>
      )}
    </>
  )
}