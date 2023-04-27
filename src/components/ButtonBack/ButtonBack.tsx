import React from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ButtonBack: FC = () => {
  const navigate = useNavigate();
  return (
      <button
        className="is-button ml-4"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-arrow-left px-6"></i>
      </button>
  )
}