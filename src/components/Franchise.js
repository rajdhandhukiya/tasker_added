import React from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions/action";
// import UserHeader from "../";

class Franchise extends React.Component {
  componentDidMount() {
    //this.props.fetchPosts();
    this.props.fetchPostsAndUsers();
  }

  renderList() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>userId</td>
              <td>id</td>
              <td>title</td>
              <td>body</td>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map((post) => {
              console.log("apidata==========>", this.props.posts);
              return (
                <tr>
                  <th>{post.userId}</th>
                  <th>{post.id}</th>
                  <th>{post.title}</th>
                  <th>{post.body}</th>
                </tr>
              );
            })}
            ;
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return { posts: state.posts };
};
export default connect(mapStateToProps, { fetchPostsAndUsers })(Franchise);
