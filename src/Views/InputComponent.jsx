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
import { API_URL } from "../globalMetaData";

const isNullOrUndefined = (val) => {
  return val === null || val === undefined || val === "";
};

function InputComponent() {
  const [primaryUser, setPrimaryUser] = useState("");
  const [secondaryUser, setSecondaryUser] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleClearAll = () => {
    setErrMsg(null);
    setPrimaryUser("");
    setSecondaryUser("");
  };

  const isFieldsValid = () => {
    if (isNullOrUndefined(primaryUser.trim()) && isNullOrUndefined(secondaryUser.trim())) {
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
    if (!isFieldsValid()) {
      return;
    }
    //Input validated!
    setErrMsg(null);
    const url = `${API_URL}/getData?primaryUser=${primaryUser.trim()}&secondaryUser=${secondaryUser.trim()}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
          console.log(response);
      })
      .catch((err) => {

      });
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
      <OutputComponent />
    </div>
  );
}

export default InputComponent;
