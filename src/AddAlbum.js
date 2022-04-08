import React, { useState } from "react";
import "../public/main.css";

export default function AddAlbum() {
  //state 
  let [album, setAlbum] = useState();

  // function for adding an album


  function handleAddAlbums() {
    const title = document.getElementById("title");
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        title: title.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      // Saving the albums details in a state
      .then((data) => setAlbum({ album: { data } }));
    // resetting the input values
    title.value = "";
  }

  return (
    <div className="add-albums">
      <h2>Add Album </h2>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Add Album</label>
            <input type="text" id="title" />
          </div>
        </div>
        <div className="col">
          <input type="submit" value="Submit" onClick={handleAddAlbums} />
        </div>
      </div>
    </div>
  );
}
//styles object for album
const styles = {
  addAlbums: {
    backgroundColor: "white",
    borderRadius: "10px",
    height: "50%"
  }
};
