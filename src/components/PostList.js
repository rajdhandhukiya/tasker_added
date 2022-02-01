import React, { useEffect, useState } from "react";

import { connect, useSelector } from "react-redux";
import { fetchPostsAndUsers } from "../actions/action";
import profile from "../Image/profile.svg";
import message2 from "../Image/message2.svg";
import notification from "../Image/notification.svg";
import Edit from "../Image/Edit.svg";
import { Button, FormControl, Modal, Table } from "react-bootstrap";
import removal2 from "../Image/removal2.svg";
import _ from "lodash";

function PostList(props) {
  const post = useSelector((state) => state.posts);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const filteredData = post;
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [dataIndex, setDataIndex] = useState("");
  const [filterType, setFilterType] = useState(false);
  const [searchfilteredData, setSearchFilteredData] = useState(filteredData);

  useEffect(() => {
    props.fetchPostsAndUsers();
  }, []);

  useEffect(() => {
    if (post.length && searchfilteredData.length === 0) {
      setSearchFilteredData(post);
    }
  }, [post]);

  const handleSearch = (event) => {
    const data = filteredData?.filter(
      (item) => item.userId == event.target.value
    );
    setSearchFilteredData(event.target.value ? data : post);
  };

  const handleAss = (event) => {
    console.log(event.target.value);
    if (event.target.value == "old") {
      setFilterType("old");
    } else setFilterType("new");
  };

  const onDeleteClick = (id) => {
    console.log("ffff", id);

    var arr = searchfilteredData;
    var evens = _.remove(arr, function (n) {
      return n.id == id;
    });
    console.log(arr);
    setSearchFilteredData([...arr]);
  };
  const handleShow = (editData, index) => {
    setTitle(editData.title);
    setBody(editData.body);
    setShow(true);
    setDataIndex(index);
  };
  const handleSave = (event) => {
    event.preventDefault();

    let arr = post;
    for (let i = 0; i < arr.length; i++) {
      if (i === dataIndex) {
        arr[i].title = title;
        arr[i].body = body;
        setDataIndex("");
      }
    }
    setSearchFilteredData(arr);
    setShow(false);
  };
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
                      onChange={(event) => handleAss(event)}
                    >
                      <option value="old">Oldest</option>
                      <option value="new">Newest</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 p-0">
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="dark"> Create Franchisee Account</Button>
                </div>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Value</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <span>Title</span>
                  <input
                    name={"title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    {post.title}
                  </input>

                  <span>Body</span>
                  <FormControl
                    as="textarea"
                    name={"body"}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <Table className="table table-hover">
              <thead>
                <tr>
                  <th>UserId</th>
                  <th>id</th>
                  <th>Title </th>
                  <th>Body</th>

                  <th> Edit</th>
                  <th> Delete</th>
                </tr>
              </thead>
              <tbody>
                {searchfilteredData
                  ?.sort((a, b) => {
                    let fa = a["id"];
                    let fb = b["id"];
                    if (filterType == "new" && fa > fb) {
                      return -1;
                    }
                    if (filterType == "old" && fa < fb) {
                      return -1;
                    }
                    return 0;
                  })
                  ?.map((post, index) => {
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
                            onClick={() => {
                              handleShow(post, index);
                            }}
                            // onClick={() => {
                            //   handleEdit(post.id);
                            // }}
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
                            onClick={() => onDeleteClick(post.id)}
                          >
                            <img
                              src={removal2}
                              alt="edit"
                              style={{ width: "10px" }}
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

      <div className="ui relaxed divided list"></div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { posts: state.posts };
};
export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
