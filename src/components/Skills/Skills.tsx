import React, { FC } from "react";

type Props = {
  skills: string[],
}

export const Skills: FC<Props> = ({ skills }) => {
  if (skills) {
    return (
      <ul className="list">
        {skills.map(skill => (
          <li
            key={skill}
            className="
          is-italic
          list-item
        ">{skill}</li>
        ))}
      </ul>
    )
  }

  return (
    <h1>Data error</h1>
  )
};
