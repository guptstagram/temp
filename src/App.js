import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import * as JsonView from "./utils";

const App = () => {
  const input_ref = useRef();
  const output_box_body = useRef();
  const [isError, setError] = useState(false);
  const [numbers, setnumbers] = useState(0);

  const inputChange = () => {
    setnumbers(input_ref?.current?.textContent?.split(/\r\n|\r|\n/).length);
    let Json = input_ref.current.textContent;
    try {
      output_box_body.current.innerHTML = "";
      Json = JSON.stringify(JSON.parse(Json.replace(/\s+/g, "")), null, 2);
      Json
        ? (input_ref.current.textContent = Json)
        : console.log("json parsing failed");
      setnumbers(input_ref?.current?.textContent?.split(/\r\n|\r|\n/).length);
      JsonView.renderJSON(Json, output_box_body.current);
      setError(false);
    } catch (e) {
      const strings = e.message.split(" ");
      const position = strings[strings.length - 1];
      setError(true);
    }
  };
  const GetNumbered = () => {
    const divs = [];
    for (let i = 0; i < numbers; i++)
      divs.push(
        <div key={i} className="number">
          {i}
        </div>
      );
    return [...divs];
  };

  useEffect(() => {}, [isError, numbers]);

  return (
    <div className="container">
      <button onClick={inputChange}>Generate</button>
      <div className="JSON_boxes">
        <div className="JSON_input_box">
          <div className="box_title">
            <h3>Json Raw Input</h3>
          </div>
          <div className="box_body">
            <div className="numbering">{GetNumbered()}</div>
            <code ref={input_ref} contentEditable={true}></code>
          </div>
        </div>
        <div className="JSON_ouput_box">
          <div className="box_title">
            <h3>Json Tree Output</h3>
          </div>
          {isError && (
            <div className="output_error">
              Input valid!!! Please validate the input and try again
            </div>
          )}
          <div className="box_body" ref={output_box_body}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
