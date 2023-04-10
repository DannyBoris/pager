import { Typography } from "antd";
import styled from "styled-components";
import { ReadOutlined, ShopOutlined } from "@ant-design/icons";
const CardContainer = styled.div`
  box-shadow: 0px 10px 45px rgb(0 0 0 / 5%);
  padding: 35px 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  & * {
    margin: 0 !important;
  }
`;

const { Text } = Typography;
const ResumeSection = ({ experience, education }) => {
  return (
    <div>
      <h2>Resume</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "left",
          gap: 20,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ShopOutlined style={{ fontSize: 22 }} />
            <h2>Experience</h2>
          </div>
          {experience.map((item) => (
            <CardContainer>
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img width={35} src={item.logo_url} />
                <h3>{item.company}</h3>
              </div>
              <h5>{item.title}</h5>
              <Text>{item.description}</Text>
            </CardContainer>
          ))}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ReadOutlined style={{ fontSize: 22 }} />
            <h2>Education</h2>
          </div>
          {education.map((item) => (
            <CardContainer>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img width={35} src={item.logo_url} />
                  <h3>{item.field_of_study}</h3>
                </div>

                <Text>{item.school}</Text>
                <Text>{item.description}</Text>
              </div>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
