import React from "react";
import PostList from "./PostList";
import "../components/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="ui container">
      <PostList />
    </div>
  );
};

export default App;
