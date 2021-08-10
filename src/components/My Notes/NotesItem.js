import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import EditNote from "./EditNote";

const NotesItem = (props) => {
  const { _id, title, body, editItem, removeItem } = props;
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    const result = !toggle;
    setToggle(result);
  };

  const handleClick = () => {
    axios({
      method: "get",
      url: `http://dct-user-auth.herokuapp.com/api/notes/${_id}`,
      headers: { "x-auth": localStorage.getItem("token") },
    })
      .then((resp) => {
        const result = resp.data;
        Swal.fire(result.title, result.body);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleRemove = () => {
    const confirmRemove = window.confirm("are you sure");
    if (confirmRemove) {
      axios({
        method: "delete",
        url: `http://dct-user-auth.herokuapp.com/api/notes/${_id}`,
        headers: { "x-auth": localStorage.getItem("token") },
      })
        .then((resp) => {
          const result = resp.data;
          removeItem(result);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div>
      {toggle ? (
        <div>
          <EditNote
            id={_id}
            title={title}
            body={body}
            editItem={editItem}
            handleToggle={handleToggle}
          />
          <button onClick={handleToggle}>cancel</button>
        </div>
      ) : (
        <div className="border border-4 my-3 p-3 text-center">
          <h1 className="diplay-5" onClick={handleClick}>
            {title}
          </h1>
          <button
            className="btn btn-outline-primary mx-1"
            onClick={handleToggle}
          >
            edit
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={handleRemove}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesItem;
