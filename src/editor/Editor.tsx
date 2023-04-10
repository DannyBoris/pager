import { Button, Card, Drawer, Input, Modal, Select } from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import produce from "immer";
import { useEffect, useState } from "react";
import { api } from "../service/api";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import MainInfoSection from "../sections/MainInfoSection";
import AboutMeSection from "../sections/AboutMeSection";
import ProjectsSection from "../sections/ProjectsSection";
import ResumeSection from "../sections/ResumeSection";
import PortfolioHeader from "../sections/PortfolioHeader";
import ContactFormSection from "../sections/ContactFormSection";
import FooterSection from "../sections/FooterSection";
import UploadContainer from "./upload-component";
import { useParams } from "react-router-dom";
import useDefaultStore from "../store";
import styled from "styled-components";
interface Data {
  main_info: {
    full_name: string;
    first_name: string;
    occupation: string;
    cv_file: string;
    profile_image: string;
  };
  about_me: string;
  skills: string[];
  languages: string[];
  projects: any[];
  experience: any[];
  education: any[];
  contact_info: any;
  social_links: any;
}
interface EditableSections {
  main_info: {
    displayName: string;
  };
}

const SectionContainer = styled.div`
  max-width: 1280px;
  border: 1px solid rgba(14, 14, 14, 0.1);
`;

const { TextArea } = Input;
const Editor = () => {
  const idnameMap = {
    main_info: "Main info",
    about_me: "About me",
    skills: "Skills",
    languages: "Langauges",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact_info: "Contact info",
    social_links: "Social links",
  };
  const [data, setData] = useState<Data | null>(null);
  const { uuid } = useParams();
  const { form } = useDefaultStore();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  useEffect(() => {
    console.log({ form });
    if (!form) {
      api(`/linkedin_data?uuid=${uuid}`, "get").then((res) =>
        setData(res.data)
      );
    } else {
      setData(form);
    }
  }, []);
  const sections = Object.entries(data ?? {}).map(([k, v]) => ({
    id: k,
    name: idnameMap[k],
    data: v,
  }));
  const avatar = createAvatar(lorelei, {
    seed: "Danny Borisonfdsafdfd",
    size: 220,
  });
  const png = avatar.toDataUriSync();
  return (
    data && (
      <div>
        <header>
          <Button onClick={() => setModalOpen(true)}>Edit Portfolio</Button>
        </header>
        <SectionContainer>
          <PortfolioHeader full_name={data.main_info.full_name} />
          <MainInfoSection {...data.main_info} profile_image={png} />
          <AboutMeSection
            skills={data.skills}
            languages={data.languages}
            about_me={data.about_me}
          />
          <ProjectsSection projects={data.projects} />
          <ResumeSection
            experience={data.experience}
            education={data.education}
          />
          <ContactFormSection contact_info={data.contact_info} />
          <FooterSection />
        </SectionContainer>

        <Modal
          onOk={() => {
            if (currentSection) {
              setData({ ...data, [currentSection.id]: currentSection.data });
              setCurrentSection(null);
            }
          }}
          title={
            currentSection ? (
              <div>
                <span onClick={() => setCurrentSection(null)}>
                  <ArrowLeftOutlined />
                </span>
                <span>{currentSection.name}</span>
              </div>
            ) : (
              "Edit Portfolio"
            )
          }
          open={isModalOpen}
          onCancel={() => setModalOpen(false)}
        >
          {!currentSection ? (
            sections.map((s) => (
              <div
                style={{
                  borderBottom: "1px solid rgba(50,50,50,.3)",
                  padding: "12px 24px",
                  margin: "0 -24px",
                }}
                onClick={() => setCurrentSection(s)}
              >
                {s.name}
              </div>
            ))
          ) : currentSection.id === "main_info" ? (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <UploadContainer />
                <Input
                  placeholder="First name"
                  value={currentSection.data.first_name}
                  onChange={({ target: { value } }) => {
                    const nextData = produce(currentSection, (draft) => {
                      draft.data.first_name = value;
                    });
                    setCurrentSection(nextData);
                  }}
                />
              </div>
              <Input
                placeholder="Occupation"
                value={currentSection.data.occupation}
                onChange={({ target: { value } }) => {
                  const nextData = produce(currentSection, (draft) => {
                    draft.data.occupation = value;
                  });
                  setCurrentSection(nextData);
                }}
              />

              <Input
                type="file"
                placeholder="CV file"
                onChange={async ({ target }) => {
                  const formdata = new FormData();
                  const file = target.files[0];
                  formdata.append("file", file);
                  const resp = await api(
                    `/upload_cv/${uuid}`,
                    "post",
                    formdata,
                    {
                      headers: { "Content-Type": "multipart/form-data" },
                    }
                  );
                  const nextData = produce(currentSection, (draft) => {
                    draft.data.cv_file = resp.fileName;
                  });
                  console.log(nextData);
                  setCurrentSection(nextData);
                }}
              />
            </div>
          ) : currentSection.id === "about_me" ? (
            <div>
              <div style={{ position: "relative" }}>
                <TextArea
                  rows={10}
                  value={currentSection.data}
                  placeholder="About me"
                ></TextArea>
                <Button
                  icon={<RobotOutlined />}
                  type="primary"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: 0,
                    transform: "translateY(100%)",
                  }}
                  onClick={async () => {
                    const resp = await api("/generate_about_me", "post", {
                      text: currentSection.data,
                    });
                    const nextData = produce(currentSection, (draft) => {
                      draft.data = resp;
                    });
                    setCurrentSection(nextData);
                  }}
                >
                  Generate GPT
                </Button>
              </div>
            </div>
          ) : currentSection.id === "skills" ? (
            <div>
              <Select
                onChange={(value) => {
                  const nextData = produce(currentSection, (draft) => {
                    draft.data = value;
                  });
                  setCurrentSection(nextData);
                }}
                defaultValue={currentSection.data}
                style={{ width: "100%" }}
                mode="tags"
                options={currentSection.data.map((item) => ({
                  value: item,
                  id: item,
                }))}
              ></Select>
            </div>
          ) : currentSection.id === "languages" ? (
            <div>
              <Select
                mode="multiple"
                options={currentSection.data.map((item) => ({
                  value: item,
                  id: item,
                }))}
              ></Select>
            </div>
          ) : currentSection.id === "projects" ? (
            <div>
              {currentSection.data.map((p, index) => (
                <Card>
                  <Input
                    value={p.url}
                    onChange={({ target: { value } }) => {
                      const nextData = produce(currentSection, (draft) => {
                        draft.data[index].url = value;
                      });
                      setCurrentSection(nextData);
                    }}
                  />
                  <Input
                    value={p.title}
                    onChange={({ target: { value } }) => {
                      const nextData = produce(currentSection, (draft) => {
                        draft.data[index].title = value;
                      });
                      setCurrentSection(nextData);
                    }}
                  />
                  <TextArea
                    value={p.description}
                    onChange={({ target: { value } }) => {
                      const nextData = produce(currentSection, (draft) => {
                        draft.data[index].description = value;
                      });
                      setCurrentSection(nextData);
                    }}
                  ></TextArea>
                </Card>
              ))}
              <Button icon={<PlusOutlined />}>Add project</Button>
            </div>
          ) : currentSection.id === "experience" ? (
            <div>
              {currentSection.data.map((exp, index) => (
                <div>
                  <Input
                    onChange={({ target: { value } }) => {
                      const nextData = produce(currentSection, (draft) => {
                        draft.data[index].title = value;
                      });
                      setCurrentSection(nextData);
                    }}
                    value={exp.title}
                  />
                  <Input
                    onChange={({ target: { value } }) => {
                      const nextData = produce(currentSection, (draft) => {
                        draft.data[index].company = value;
                      });
                      setCurrentSection(nextData);
                    }}
                    value={exp.company}
                  />
                  <TextArea value={exp.description}></TextArea>
                </div>
              ))}
            </div>
          ) : currentSection.id === "education" ? (
            <div>Education</div>
          ) : currentSection.id === "contact_info" ? (
            <div>
              <div>
                <label>Email</label>
                <Input
                  onChange={({ target: { value } }) => {
                    const nextData = produce(currentSection, (draft) => {
                      draft.data.email = value;
                    });
                    setCurrentSection(nextData);
                  }}
                  value={currentSection.data.email}
                />
              </div>
              <label>Phone</label>

              <Input
                onChange={({ target: { value } }) => {
                  const nextData = produce(currentSection, (draft) => {
                    draft.data.phone = value;
                  });
                  setCurrentSection(nextData);
                }}
                value={currentSection.data.phone}
              />
              <label>Location</label>
              <Input
                onChange={({ target: { value } }) => {
                  const nextData = produce(currentSection, (draft) => {
                    draft.data.location = value;
                  });
                  setCurrentSection(nextData);
                }}
                value={currentSection.data.location}
              />
            </div>
          ) : currentSection.id === "social_links" ? (
            <div>Social links</div>
          ) : (
            <div>error</div>
          )}
        </Modal>
      </div>
    )
  );
};

export default Editor;
