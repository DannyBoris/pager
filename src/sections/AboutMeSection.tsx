import styled from "styled-components";

import { Tag, Typography } from "antd";
const { Text } = Typography;

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 0 40px;
  text-align: left;
`;
const AboutMeSection = ({ about_me, skills, languages }) => {
  return (
    <Wrapper id="about">
      <h2>About me</h2>
      <Container style={{ display: "flex", gap: 70 }}>
        <Text style={{ maxWidth: "50%" }}>{about_me}</Text>
        <div>
          {skills.map((skill) => (
            <Tag style={{ margin: 4 }} color={"blue"}>
              {skill}
            </Tag>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};

export default AboutMeSection;
