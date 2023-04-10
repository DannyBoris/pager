import { Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { api } from "./service/api";
import useDefaultStore from "./store";

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState("yrteyrtre");
  const { initForm } = useDefaultStore();
  function handleClick() {
    api(`/linkedin_data?url=${value}`, "get", null).then((res) => {
      console.log({ res });
      initForm(res.data);
      navigate(`/profile/${res.uuid}`);
    });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className="App"
    >
      <h1>Generate your profesional website</h1>
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, height: 40 }}
      >
        <Input
          value={value}
          onChange={({ target: { value } }) => {
            setValue(value);
          }}
          style={{ height: "100%" }}
          placeholder="Linkedin URL goes here"
        />
        <Button onClick={handleClick} style={{ height: "100%" }} type="primary">
          Generate
        </Button>
      </div>
    </div>
  );
}

export default App;
