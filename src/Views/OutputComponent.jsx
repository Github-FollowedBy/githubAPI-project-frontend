import React from "react";
import Table from "react-bootstrap/Table";
import RandomQuotes from "./RandomQuotes";

function OutputComponent(props) {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th key="1">
              <p>UserName</p>
            </th>
            <th key="2">
              <p>Profile</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.listOfIntersectingUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <p>{user.login}</p>
                </td>
                <td>
                  <img
                    src={user.profileUrl}
                    alt="https://avatars.githubusercontent.com/u/37259966?v=4"
                  ></img>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.listOfIntersectingUsers.length === 0 ? (
        <div>
          <h3>No User Matching the given Criteria</h3>
          <RandomQuotes />
        </div>
      ) : null}
    </>
  );
}

export default OutputComponent;
