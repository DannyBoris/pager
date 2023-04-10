import styled from "styled-components";
const FooterSection = () => {
  const Footer = styled.div`
    display: flex;
    height: 120px;
    background: rgba(14, 14, 14, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  return <Footer>All rights reserved 2023</Footer>;
};

export default FooterSection;
