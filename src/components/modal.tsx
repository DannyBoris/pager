import { Card, Modal } from "antd";
interface Props {
  open: boolean;
  setModalProps: (val: boolean) => void;
  content: () => JSX.Element;
  title: string;
}
const SimpleModal = ({
  open,
  content,
  setModalProps,
  title,
  dataToSave,
}: Props) => {
  return (
    <Modal
      okText="Save"
      title={title}
      bodyStyle={{
        padding: 0,
      }}
      style={{ padding: 0 }}
      onCancel={() => setModalProps(false)}
      open={!!open}
      onOk={() => {
        console.log(dataToSave);
      }}
    >
      {content()}
    </Modal>
  );
};

export default SimpleModal;
