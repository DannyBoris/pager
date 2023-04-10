import { useState } from "react";
import styled from "styled-components";

const DescriptionContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  background: rgba(1, 1, 1, 0.7);
  color: white;
  top: 0;
  width: 250px;
  height: 325px;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;

  transform: ;
`;

const ProjectCard = ({ title, description }) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          style={{ borderRadius: 8 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          src="https://picsum.photos/250/325"
        />
        {true && (
          <DescriptionContainer visible={false}>
            {description}
          </DescriptionContainer>
        )}
        <div>
          <h4>{title}</h4>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
