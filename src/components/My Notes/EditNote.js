import axios from "axios";
import React from "react";
import NoteForm from "./NoteForm";

const EditNote = (props) => {
  const { id, title, body, editItem, handleToggle } = props;

  const formSubmission = (result) => {
    axios
      .put(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, result, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const note = response.data;
        editItem(note);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <NoteForm
        title={title}
        body={body}
        formSubmission={formSubmission}
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default EditNote;
