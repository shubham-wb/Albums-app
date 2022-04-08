import React, { useState } from "react";
import "../public/main.css";

export default function AlbumList(props) {

  //state for implementing next and prev button 
  let [prev, setprev] = useState(0); //state for lower limit  
  let [next, setNext] = useState(10); // state for upper limit

  //state for implementing edit button 
  let [edit, setEdit] = useState({  
    type: false,
    id: 0
  });
  let length = props.data.length;

//function to update entries of album to displayed 
//<------------------------------------------------------------------->
  function prevBtn() {
    if (prev >= 10 && prev <= length) {
      setprev((prevState) => prevState - 10);
      setNext((prevState) => prevState - 10);
    }
  }

  function nextBtn() {
    console.log(prev);
    console.log(next);
    if (prev >= 0 && next <= length - 10) {
      setprev((prevState) => prevState + 10);
      setNext((prevState) => prevState + 10);
    }
  }
//<------------------------------------------------------------------->




  //function to handle update post 
  function handleUpdateAlbum(id) {
    const input = document.getElementById("update-input");

    console.log(input);
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "PUT",
      body: JSON.stringify({
        title: input.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });

    input.value = "";
    setEdit(
      (edit = {
        type: false,
        id: 0
      })
    );
    alert("Album Updated Succefully");
  }
//function to handle delete post 
  function handleDeleteAlbum(id) {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE"
    });
    alert("Album Deleted");
  }
  return (
    <>
      <ul className="album-list">
        {props.data.map((elem) => {
          if (elem.id > prev && elem.id <= next) {
            return (
              <li>
                <span className="id">{elem.id}</span>
                {edit.type && edit.id === elem.id ? (
                  <>
                    <input
                      id="update-input"
                      defaultValue={elem.title}
                      type="text"
                    />
                    <button
                      id="update-btn"
                      onClick={() => {
                        handleUpdateAlbum(elem.id);
                      }}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <span className="title">{elem.title}</span>
                )}

                <div className="edit-btn">
                  <button
                    onClick={() => {
                      setEdit(
                        (prevValue) =>
                          (edit = {
                            type: !prevValue.type,
                            id: elem.id
                          })
                      );
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                      alt=""
                    />
                  </button>
                  <button
                    id={elem.id}
                    onClick={() => {
                      handleDeleteAlbum(elem.id);
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7178/7178248.png"
                      alt=""
                    />
                  </button>
                </div>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <div className="navigation">
        <button onClick={prevBtn}>Prev</button>
        <button onClick={nextBtn}>Next</button>
      </div>
    </>
  );
}
