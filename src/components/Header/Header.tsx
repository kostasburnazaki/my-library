import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Header: FC = () => {
  return (
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
  )
};