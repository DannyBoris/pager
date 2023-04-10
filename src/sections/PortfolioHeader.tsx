import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  height: 60px;
  background: white;
  border-bottom: 1px solid rgba(144, 144, 144, 0.2);
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 35%;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left:24px
`;

const PortfolioHeader = ({ full_name }) => {
  const initials = full_name.split(" ");
  const logo = initials[0].substr(0, 1) + initials[1].substr(0, 1);
  return (
    <Header>
      <Logo>{logo}</Logo>
      <Nav>
        <Link to={"#about"}>About</Link>
        <Link to={"#projects"}>Projects</Link>
        <Link to={"#resume"}>Resume</Link>
        <Link to={"#contact"}>Get in touch</Link>
      </Nav>
    </Header>
  );
};

export default PortfolioHeader;
