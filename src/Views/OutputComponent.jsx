import React from "react";
import Table from "react-bootstrap/Table";
import RandomQuotes from "./RandomQuotes";
import { tableColumn } from "../globalMetaData";

function OutputComponent(props) {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            {tableColumn.map((col, index) => {
              return (
                <th key={index}>
                  <p>{col}</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.listOfIntersectingUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td style={{ fontSize: "21px" }}>{index + 1}</td>
                <td>
                  <a
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.login}
                  </a>
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
