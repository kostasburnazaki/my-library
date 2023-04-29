import React,
{ useContext,
  useRef,
  FC,
  useEffect,
  useState
} from "react";
import classNames from "classnames";

import { useParams } from "react-router-dom";

import { fetchClient } from "../../utils/api";
import { CoursesContext } from "../../utils/CoursesContext";

import { Course, DetailedCourse, Lesson } from "../../types/Course";
import { JsOptions } from "../../types/VideoJSOptions";

import { initValues } from "../../constants/initValues";
import { ButtonBack } from "../ButtonBack";
import { Loader } from "../Loader";
import { VideoJS } from "../Player";

export const CourseComponent: FC = () => {
  const [loading, setIsLoading] = useState<boolean>(initValues.loadingStatus);
  const [course, setCourse] = useState<DetailedCourse>();

  const { courses } = useContext(CoursesContext);

  const { slug = '' } = useParams();
  const playerRef = useRef(null);

  useEffect(() => {
    if (courses) {
      const coursePreview = courses.find((course: Course) => course.meta.slug === slug);
      if (coursePreview) {
        const fetchData = async () => {
          const courseData = await fetchClient.getCourse(coursePreview.id);
          setCourse(courseData);
          setIsLoading(false);
        }
        
        fetchData()
          .catch(err => console.warn(err))
      } else {
        console.warn("Course has not been found")
      }
    } else {
      console.warn("Courses have not been found")
    }
  }, [slug, courses]);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("pause", function () {
      localStorage.setItem(player.id_, player.currentTime());
    });
    player.on("play", function () {
      player.currentTime(localStorage.getItem(player.id_));
    });
  };


  return (
    <>
      <ButtonBack />

      {loading
        ? <Loader />
        : (
          <div className="container px-6">
            {course?.lessons
              .sort((l1, l2) => (l1.order - l2.order))
              .map((lesson: Lesson) => {
                const poster = lesson.status === 'locked'
                  ? 'https://image.shutterstock.com/image-vector/lock-icon-260nw-425675884.jpg'
                  : false

                const videoJsOptions: JsOptions = {
                  muted: false,
                  crossorigin: true,
                  autoplay: false,
                  controls: !(lesson.status === 'locked'),
                  responsive: true,
                  fluid: true,
                  poster: poster,
                  sources: [{
                    src: lesson.link,
                    type: 'application/x-mpegURL'
                  }]
                };

                return (
                  <div key={lesson.id} className="lesson pt-6">

                    <h3 className="
                subtitle
                is-3
                has-text-centered
              ">
                      {lesson.title}

                    </h3>

                    <div className="columns">
                      <div className="column" id={`lesson-${lesson.order}`}>
                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                      </div>

                      <div className="column">
                        <p>
                          Order: {lesson.order}
                        </p>

                        <p>
                          Duration: {lesson.duration} min.
                        </p>

                        <p
                          className={classNames({ 'notification is-warning': lesson.status === 'locked' })}
                        >
                          Status: {lesson.status}
                        </p>

                        <h5 className="subtitle pt-4">
                          Description:
                        </h5>

                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quaerat molestias. Eaque expedita, dolores inventore laborum ipsa harum cum laudantium placeat accusamus illo? Commodi optio tempora corporis, temporibus accusamus voluptates?
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )
      }
    </>
  );
}