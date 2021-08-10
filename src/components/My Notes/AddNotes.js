import React from "react";
import axios from "axios";
import NoteForm from "./NoteForm";

const AddNotes = (props) => {
  const { addItem } = props;

  const formSubmission = (formData) => {
    axios
      .post("http://dct-user-auth.herokuapp.com/api/notes", formData, {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((resp) => {
        const note = resp.data;
        addItem(note);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div>
        <NoteForm formSubmission={formSubmission} />
      </div>
    </div>
  );
};

export default AddNotes;
