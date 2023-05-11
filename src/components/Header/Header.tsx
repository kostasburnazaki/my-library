import React, {
  FC,
  useContext
} from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";

export const Header: FC = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <header className={
      classNames({ dark: darkTheme })
    }>
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

      <div className="p-4">
        <input
          type="checkbox"
          onChange={() => setDarkTheme(!darkTheme)}
          className="checkbox"
          id="checkbox"
        />

        <label htmlFor="checkbox" className="checkbox-label">
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
          <span className="ball"></span>
        </label>
      </div>
    </header>
  )
};