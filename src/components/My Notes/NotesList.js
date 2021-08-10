import axios from "axios";
import React from "react";
import NotesItem from "./NotesItem";

const NotesList = (props) => {
  const { data, setData, editItem, removeItem } = props;
  axios({
    method: "get",
    url: "http://dct-user-auth.herokuapp.com/api/notes",
    headers: { "x-auth": localStorage.getItem("token") },
  })
    .then((resp) => {
      const result = resp.data;
      setData(result);
    })
    .catch((err) => {
      alert(err.message);
    });

  return (
    <div>
      {data.length === 0 ? (
        <div>
          <h4 className="display-5">No Notes found...</h4>
          <h5 className="diplay-6">Add your first Notes !</h5>
        </div>
      ) : (
        <div>
          {data.map((d, id) => {
            return (
              <NotesItem
                key={id}
                {...d}
                editItem={editItem}
                removeItem={removeItem}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotesList;
