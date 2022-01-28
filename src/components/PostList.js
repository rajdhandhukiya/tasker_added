import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions/action";
import profile from "../Image/profile.svg";
import message2 from "../Image/message2.svg";
import notification from "../Image/notification.svg";
import Edit from "../Image/Edit.svg";
import { Button, Table } from "react-bootstrap";
import removal2 from "../Image/removal2.svg";

function PostList(props) {
  const [filteredData, setFilteredData] = useState(props.posts);

  useEffect(() => {
    props.fetchPostsAndUsers();
  }, []);

  const handleSearch = (event) => {
    console.log("event", event.target.value);
    const data = props?.posts?.filter(
      (item) => item.userId == event.target.value
    );
    console.log("all", data);
    setFilteredData(data);
  };

  var posts = props.posts;

  return (
    <>
      <div>
        <>
          <div className="container">
            <div
              className="row"
              style={{
                alignItems: "self-end",
                borderBottom: "1px solid #e7e7e7",
              }}
            >
              <div className="col-xxl-6">
                <h1>Franchise</h1>
              </div>
              <div
                className="col-xxl-6 "
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <img src={message2} alt="message" style={{ width: "35px" }} />
                <img
                  src={notification}
                  alt="message"
                  style={{
                    width: "35px",
                    color: "gray",
                    margin: "0 0 0 10px",
                  }}
                />
                <p style={{ margin: "0px 11px 5px 60px" }}>martin loppes</p>
                <img src={profile} alt="profile" style={{ width: "35px" }} />
              </div>
            </div>

            <div
              className="row"
              style={{
                marginTop: "10px",
                borderBottom: "1px solid #d7d7d7",
                paddingBottom: "10px",
              }}
            >
              <div className="col-xxl-5 p-0">
                <div>
                  <input
                    type="text"
                    placeholder="Search Franchise"
                    onChange={(event) => {
                      handleSearch(event);
                    }}
                  />
                </div>
              </div>
              <div className="col-xxl-4">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <select
                      style={{
                        backgroundColor: "white",
                        borderWidth: "0px",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    >
                      <option>All</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <select
                      style={{
                        backgroundColor: "white",
                        borderWidth: "0px",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    >
                      <option>Newest</option>
                      <option>Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 p-0">
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="dark"> Create Franchisee Account</Button>
                </div>
              </div>
            </div>

            <Table>
              <thead>
                <tr>
                  <th>Franchise Id</th>
                  <th>Franchise Name</th>
                  <th>company Name</th>
                  <th>Gym Name</th>

                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((post, index) => {
                    return (
                      <tr key={index}>
                        <td>{post.userId}</td>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>

                        <td>
                          <button
                            style={{
                              borderWidth: "0px",
                              backgroundColor: "#d4d4d4",
                              borderRadius: "50%",
                              padding: "6px",
                              width: "35px ",
                            }}
                          >
                            <img
                              src={Edit}
                              alt="edit"
                              style={{ width: "10px" }}
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            style={{
                              borderWidth: "0px",
                              backgroundColor: "#d4d4d4",
                              borderRadius: "50%",
                              padding: "6px",
                              width: "35px ",
                              marginLeft: "5px",
                            }}
                          >
                            <img
                              src={removal2}
                              alt="edit"
                              style={{ width: "10px" }}
                              // onClick={() => onDeleteClick(posts.userId)}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </>
      </div>

      <div className="ui relaxed divided list">
        {/* <Table borderless>
          <thead>
            <tr>
              <th>userId</th>
              <th>id</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map((post) => {
              return (
                <tr>
                  <th>{post.userId}</th>
                  <th>{post.id}</th>
                  <th>{post.title}</th>
                  <th>{post.body}</th>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
        {/* {this.renderList()} */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { posts: state.posts };
};
export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
