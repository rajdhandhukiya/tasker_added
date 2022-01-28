import React, { useEffect, useState } from "react";

import { connect, useSelector } from "react-redux";
import { fetchPostsAndUsers } from "../actions/action";
import profile from "../Image/profile.svg";
import message2 from "../Image/message2.svg";
import notification from "../Image/notification.svg";
import Edit from "../Image/Edit.svg";
import { Button, Table } from "react-bootstrap";
import removal2 from "../Image/removal2.svg";
import { reverse } from "lodash";

function PostList(props) {
  const post = useSelector((state) => state.posts);

  const filteredData = post;
  console.log(post);

  const [searchfilteredData, setSearchFilteredData] = useState(filteredData);
  // const [search, setSearch] = useState("");
  const [filedName, setFiledName] = useState("");
  // const [data, setData] = useState("Oldest");
  const [filterType, setFilterType] = useState(false);

  useEffect(() => {
    props.fetchPostsAndUsers();
  }, []);

  useEffect(() => {
    if (post.length && searchfilteredData.length == 0) {
      setSearchFilteredData(post);
    }
  }, [post]);

  console.log(searchfilteredData);

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

  const onDeleteClick = (index) => {
    let arr = post;
    arr.splice(index, 1);
    setSearchFilteredData([...arr]);

    console.log("removeData", post);
  };

  // const handleEdit = (editData, index) => {
  //   setName(editData.Name);
  //   setEmail(editData.Email);
  //   setNumber(editData.Number);
  //   setPassword(editData.Password);
  //   setIsButton(false);
  //   setDataIndex(index);
  // };
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
                      // value={filedName}
                      // onChange={(event) => handleAss(event)}
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
            </div>

            <Table className="table table-hover">
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
                {searchfilteredData
                  // ?.sort((a, b) => {
                  //   let fa = a["userId"];
                  //   let fb = b["userId"];
                  //   if (filterType == "new" && fa > fb) {
                  //     return -1;
                  //   }
                  //   if (filterType == "old" && fa < fb) {
                  //     return -1;
                  //   }
                  //   return 0;
                  // })
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
                            // onClick={() => {
                            //   handleEdit(post, index);
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
                            onClick={(id) => onDeleteClick(index)}
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
