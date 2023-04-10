import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch, Tooltip } from "antd";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { EditFilled } from "@ant-design/icons";

const EditRowContainer = ({ title, checked, onChange, onClick }) => {
  return (
    <div>
      <span>{title}</span>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Tooltip title="visible">
          <Switch size="small" checked={checked} onChange={onChange} />
        </Tooltip>
        <Tooltip title="edit">
          <EditFilled onClick={onClick} />
        </Tooltip>
      </div>
    </div>
  );
};

export default EditRowContainer;
