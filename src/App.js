import "../public/main.css";
import AddAlbum from "./AddAlbum";
import AlbumList from "./AlbumList";
import React, { Component } from "react";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ albums: data });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/570/570435.png"
            alt=""
          />
          <span>Albums List</span>
        </div>

        <div className="main">
          <AddAlbum />
          <div className="albums-container">
            <AlbumList data={this.state.albums} />
          </div>
        </div>
      </div>
    );
  }
}
