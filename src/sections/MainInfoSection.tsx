import { Button } from "antd";
import styled from "styled-components";
import { api } from "../service/api";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 80px;
`;

const MainInfoSection = ({
  first_name,
  occupation,
  cv_file,
  profile_image,
}) => {
  async function onDownloadClick() {
    const resp = await api(`/get_file/${cv_file}`, "get");
    console.log(resp);
  }

  return (
    <Container>
      <div>
        <h1>Hello I'm {first_name}</h1>
        <h2>{occupation}</h2>
        <Button
          onClick={onDownloadClick}
          type="primary"
          style={{
            width: 200,
            textTransform: "uppercase",
            height: 50,
            fontWeight: 600,
          }}
        >
          DOWNLOAD CV
        </Button>
      </div>
      <img
        style={{
          border: "1px solid rgba(14,14,14,.1)",
          borderRadius: "50%",
          padding: 20,
        }}
        src={profile_image}
      />
    </Container>
  );
};

export default MainInfoSection;
