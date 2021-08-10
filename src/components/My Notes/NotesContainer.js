import React, { useState } from "react";
import AddNotes from "./AddNotes";
import NotesList from "./NotesList";

const NotesContainer = () => {
  const [data, setData] = useState([]);

  const addItem = (note) => {
    const result = [note, ...data];
    setData(result);
  };

  const removeItem = (id) => {
    const remove = data.filter((d) => {
      return d.id !== id;
    });
    setData(remove);
  };

  const editItem = (Note) => {
    const result = data.map((d) => {
      if (d.id === Note.id) {
        return { ...d, ...Note };
      } else {
        return { ...d };
      }
    });
    setData(result);
  };

  return (
    <div className="container px-4">
      <div className="row gx-5">
        <div className="col">
          <div className="p-3 border bg-light">
            <h1 className="diplay-5">NoteLists</h1>
            <NotesList
              data={data}
              setData={setData}
              editItem={editItem}
              removeItem={removeItem}
            />
          </div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light">
            <h1 className="diplay-5 text-center">Add Notes</h1>
            <AddNotes addItem={addItem} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesContainer;
