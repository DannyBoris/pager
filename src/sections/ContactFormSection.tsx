import styled from "styled-components";
import { Button, Form, Input } from "antd";
import {
  EnvironmentOutlined,
  FacebookOutlined,
  GlobalOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { TextArea } = Input;

const Container = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid rgba(14, 14, 14, 0.2);
  width: 75%;
  margin: 50px auto;
`;

const StyledTextArea = styled(TextArea)`
  resize: none;
`;

const SocialContainer = styled.div`
  gap: 20px;
  flex: 1;
  display: flex;
  align-items: self-end;
`;

const ContactFormSection = ({ contact_info }) => {
  return (
    <>
      <h2>Let's get in touch </h2>
      <Container>
        <div
          style={{
            flex: 0.33,
            borderRight: "1px solid rgba(14,14,14,.2)",
            padding: 24,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Contact information</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <PhoneOutlined style={{ fontSize: 18 }} />
              <span>{contact_info.phone || "Unknown"}</span>
            </div>
            <div>
              <MailOutlined style={{ fontSize: 18 }} />
              <span>{contact_info.email}</span>
            </div>
            <div>
              <EnvironmentOutlined style={{ fontSize: 18 }} />
              <span>{contact_info.location}</span>
            </div>
          </div>
          <SocialContainer>
            <Link type="text">
              <LinkedinOutlined style={{ fontSize: 18 }} />
            </Link>
            <Link type="text">
              <FacebookOutlined style={{ fontSize: 18 }} />
            </Link>
            <Link type="text">
              <InstagramOutlined style={{ fontSize: 18 }} />
            </Link>
          </SocialContainer>
        </div>
        <div style={{ flex: 0.66, padding: 24 }}>
          <Form
            layout="vertical"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Form.Item label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Message">
              <StyledTextArea
                rows={12}
                style={{ resize: "none" }}
              ></StyledTextArea>
            </Form.Item>
            <Button style={{ alignSelf: "flex-end" }}>Send message</Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default ContactFormSection;
