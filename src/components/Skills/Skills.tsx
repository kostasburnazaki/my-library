import React, { FC } from "react";

type Props = {
  skills: string[],
}

export const Skills: FC<Props> = ({ skills }) => (
  <ul className="list">
    {skills && (
      skills.map(skill => (
        <li
          key={skill}
          className="
          is-italic
          list-item
        ">{skill}</li>
      ))
    )}
  </ul>
);
