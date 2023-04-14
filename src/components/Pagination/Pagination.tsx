import React, {
  Dispatch,
  FC,
  SetStateAction
} from "react";
import classNames from 'classnames';

type Props = {
  coursesPerPage: number,
  totalCourses: number,
  paginate: Dispatch<SetStateAction<number>>,
  currentPage: number,
}


export const Pagination: FC<Props> = ({
  coursesPerPage,
  totalCourses,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
      <nav className="pagination is-centered py-4">
        <ul className="pagination-list">
          {pageNumbers.map(pageNumber => (
            <li key={pageNumber}>
              <a
                className={classNames('pagination-link',
                  { 'is-current': pageNumber === currentPage })}
                onClick={(e) => {
                  e.preventDefault();
                  paginate(pageNumber);
                }}
                href="!#">
                {pageNumber}
              </a>
            </li>
          ))}
        </ul>
      </nav>
  )
}