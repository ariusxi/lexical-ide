import React from "react";
import styled from "styled-components";

function SideBar({ 
  theme, 
  addEditorTab, 
  handleSubmit, 
  handleSaveFile,
  handleShowConfig,
}) {
  return (
    <SideBarMenu theme={theme}>
      <SideBarItem
        theme={theme}
        style={{ marginTop: "15px" }}
        className="far fa-copy"
        onClick={() => addEditorTab()}
      />
      <SideBarItem
        theme={theme}
        className="far fa-save"
        onClick={() => handleSaveFile()}
      />
      <SideBarItem
        theme={theme}
        className="fas fa-bug"
        onClick={handleSubmit}
      />
      <SideBarSettings 
        theme={theme} 
        className="fas fa-cog"
        onClick={() => handleShowConfig()}/>
    </SideBarMenu>
  );
}

const SideBarMenu = styled.ul`
  list-style: none;
  height: 100%;
  width: 50px;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.colorSideBarMenu};
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
`;

const SideBarItem = styled.li`
  color: ${({ theme }) => theme.colorSideBarItem};
  z-index: 999;
  font-size: 1.7rem;
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-bottom: 30px;
  transition: 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colorSideBarItemHover};
  }
`;

const SideBarSettings = styled.li`
  color: ${({ theme }) => theme.colorSideBarSettings};
  z-index: 999;
  font-size: 1.7rem;
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-bottom: 30px;
  transition: 0.2s;
  position: absolute;
  bottom: 20px;
  left: 0;
  &:hover {
    color: ${({ theme }) => theme.colorSideBarSettingsHover};
  }
`;

export default SideBar;
