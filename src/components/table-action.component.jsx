import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export const TableActionButtons = ({ editurl, id, deleteAction }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAction(id);
      }
    });
  };
  return (
    <>
      <NavLink
        to={editurl}
        className={"btn btn-sm btn-success btn-circle me-1"}
      >
        <FaEdit />
      </NavLink>
      <Button
        onClick={handleDeleteClick}
        variant="danger"
        type="button"
        size="sm"
        className="btn-circle"
      >
        <FaTrash />
      </Button>
    </>
  );
};
