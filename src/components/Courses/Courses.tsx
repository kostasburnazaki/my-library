import React, { FC, useRef } from "react";
import { Course } from "../../types/Course";
import { Skills } from "../Skills"
import { VideoJS } from "../Player/Player";
import { NavLink } from "react-router-dom";

type Props = {
  courses: Course[],
}

export const Courses: FC<Props> = ({ courses }) => {
  const playerRef = useRef(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("mouseover", function () {
      player.play();
      player.playbackRate(4);
    });
    player.on("mouseleave", function () {
      player.pause();
    });
  };

  return (
    <ul className='has-text-centered'>
      {courses.map((course: Course) => {
        const videoJsOptions = {
          muted: true,
          crossorigin: true,
          autoplay: false,
          controls: false,
          responsive: true,
          fluid: true,
          poster: false,
          sources: [{
            src: course.meta.courseVideoPreview?.link,
            type: 'application/x-mpegURL'
          }]
        };

        return (
          <li key={course.id} className="
          has-text-info
          py-6
        ">
            <div className="container px-6">
              <figure className='image'>
                <img src={course.previewImageLink + '/cover.webp'} alt="" />
              </figure>

              <h2 className="
                subtitle
                has-text-info
                has-text-weight-bold
                is-uppercase
                is-underlined
              ">
                {course.title}
              </h2>

              <div className="columns">
                <div className="column">
                  <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </div>

                <div className="
                  column
                  columns
                  is-flex
                  is-justify-content-space-between
                  is-flex-direction-column
                  ">
                  <div className="column">
                    <h3 className="
                      is-size-5
                      is-uppercase
                      has-text-weight-semibold
                    ">
                      Skills to acquire:
                    </h3>

                    <Skills skills={course.meta.skills} />
                  </div>

                  <div className="column">
                    <button className="is-button is-link">
                      <NavLink
                        to={`/${course.meta.slug}`}
                      >
                        <h2 className="
                          subtitle
                          has-text-info
                          has-text-weight-bold
                          is-capitilized
                        ">
                          Details
                        </h2>
                      </NavLink>
                    </button>
                  </div>
                </div>

                <div className="
                  column columns
                  is-flex
                  is-justify-content-space-between
                  is-flex-direction-column
                  py-6
                ">
                  <p className="
                    is-size-5
                    is-uppercase
                    has-text-weight-semibold
                  ">
                    {course.lessonsCount} lessons
                  </p>

                  <p className="
                    is-size-5
                    is-uppercase
                    has-text-weight-semibold
                    is-italic
                  ">
                    Rating: {course.rating}
                  </p>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}