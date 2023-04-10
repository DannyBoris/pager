import { Input } from "antd";
import produce from "immer";
import { useEffect, useState } from "react";

const DynamicDrawer = ({ id, data, setData }) => {
  console.log({ data });
  const [element, setElement] = useState<JSX.Element | null>(() => {
    switch (id) {
      case "main_info":
        return (
          <div>
            <Input
              placeholder="First name"
              value={data.first_name}
              onChange={({ target: { value } }) => {
                const nextData = produce(data, (draft) => {
                  draft.first_name = value;
                });
                setData(nextData);
              }}
            />
          </div>
        );

      default:
        break;
    }
  });
  return element;
};

export default DynamicDrawer;
