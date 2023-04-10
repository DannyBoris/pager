import { Input } from "antd";
import { useState } from "react";
import { api } from "../../service/api";

interface Props {
  data: any;
  setData: any;
}
const MainInfoEditableContent = ({ data, setData }: Props) => {
  return (
    <div>
      <div>
        <label>Name</label>
        <Input
          value={data.name}
          placeholder="Enter your name"
          onChange={({ target: { value } }) =>
            setData({ ...data, name: value })
          }
        />
      </div>
      <div>
        <label>Occupation</label>
        <Input
          value={data.occupation}
          placeholder="Enter your occupation"
          onChange={({ target: { value } }) =>
            setData({ ...data, occupation: value })
          }
        />
      </div>
      <div>
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append("file", file);
            api("/upload_cv/123", "post", formdata, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }}
        />
      </div>
    </div>
  );
};

export default MainInfoEditableContent;
