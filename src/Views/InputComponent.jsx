import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import OutputComponent from "./OutputComponent";
import Loader from "react-loader-spinner";
import { API_URL } from "../globalMetaData";
import RandomQuotes from "./RandomQuotes";

const isNullOrUndefined = (val) => {
  return val === null || val === undefined || val === "";
};

function InputComponent() {
  const [primaryUser, setPrimaryUser] = useState("");
  const [secondaryUser, setSecondaryUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [listOfIntersectingUsers, setIntersectingUsers] = useState([]);
  const [spinnerFlag, setSpinnerFlag] = useState(false);

  const handleClearAll = () => {
    setErrMsg(null);
    setShowTable(false);
    setIntersectingUsers([]);
    setPrimaryUser("");
    setSecondaryUser("");
  };

  const isFieldsValid = () => {
    if (
      isNullOrUndefined(primaryUser.trim()) &&
      isNullOrUndefined(secondaryUser.trim())
    ) {
      setErrMsg("OOPS! Primary User and Secondary User Required!");
      return false;
    }
    if (isNullOrUndefined(primaryUser.trim())) {
      setErrMsg("OOPS! Primary User Required!");
      return false;
    }
    if (isNullOrUndefined(secondaryUser.trim())) {
      setErrMsg("OOPS! Secondary User Required!");
      return false;
    }
    return true;
  };
  const fetchData = () => {
    setShowTable(false);
    if (!isFieldsValid()) {
      return;
    }
    setSpinnerFlag(true);
    //Input validated!
    setErrMsg(null);
    const url = `${API_URL}/getData?primaryUser=${primaryUser.trim()}&secondaryUser=${secondaryUser.trim()}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setShowTable(true);
          setIntersectingUsers(response.intersectionListOfUsers);
          setSpinnerFlag(false);
        } else {
          setShowTable(false);
          setErrMsg(response.message);
          setSpinnerFlag(false);
        }
        console.log(response);
      })
      .catch((err) => {
        setShowTable(false);
        setSpinnerFlag(false);
        setErrMsg("Internal Server Error");
        setIntersectingUsers([]);
      });
    // setTimeout(() => {
    //   setSpinnerFlag(false);
    //   setShowTable(true);
    //   setIntersectingUsers([
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //     // {
    //     //   login: "rhnvrm",
    //     //   profileUrl: "https://avatars.githubusercontent.com/u/37259966?v=4",
    //     // },
    //   ]);
    //   setShowTable(false);
    //   setErrMsg("limit reached");
    // }, 5 * 1000);
  };

  return (
    <div className="input-container">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Primary User Name"
          onChange={(evt) => {
            setPrimaryUser(evt.target.value);
            setErrMsg(null);
          }}
          value={primaryUser}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Secondary User Name"
          onChange={(evt) => {
            setSecondaryUser(evt.target.value);
            setErrMsg(null);
          }}
          value={secondaryUser}
        />
      </InputGroup>
      <Container style={{ position: "relative" }}>
        {errMsg && (
          <Row>
            <Col>
              <p style={{ color: "red" }}>{errMsg}</p>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Button
              variant="primary"
              style={{ float: "right" }}
              onClick={fetchData}
            >
              Get Results
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              style={{ float: "left" }}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </Col>
        </Row>
      </Container>
      <br />
      {spinnerFlag && (
        <div>
          <br />
          <Loader type="Puff" color="black" height={200} width={200} />
          <br />
          <p style={{ color: "white" }}>Please Wait..Fetching results!</p>
          <RandomQuotes />
        </div>
      )}
      {showTable && (
        <OutputComponent listOfIntersectingUsers={listOfIntersectingUsers} />
      )}
    </div>
  );
}

export default InputComponent;
