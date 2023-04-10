import { Card, Typography } from "antd";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

const { Text, Title } = Typography;
const ProjectsContainer = styled.div`
  display: flex;
  text-align: left;
  justify-content: center;
  & > div {
    flex: 50%;
  }
  & > div > div {
    border-radius: 6px;
  }
  & h4 {
    margin: 4px 0;
  }
`;
const ProjectsSection = ({ projects }) => {
  return (
    <div id="projects" style={{ padding: "0 40px" }} className="">
      <h2>Projects</h2>
      <ProjectsContainer>
        {projects.map((p) => (
          <ProjectCard {...p} />
        ))}
      </ProjectsContainer>
    </div>
  );
};

export default ProjectsSection;
