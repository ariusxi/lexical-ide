import React from "react";
import styled from "styled-components";

function TopBar({
  theme,
  show,
  tabs,
  currentTab,
  switchTab,
  closeClicked, 
}) {

  return (
    <TopBarWrapper
      theme={theme}
      style={{ display: show ? "" : "none" }}>
      {tabs.map((tab, key) => (
        <FileTab 
          key={key}
          style={{ 
            backgroundColor: key === currentTab ? 
              theme.colorTopBarFileTabActive : 
              theme.colorTopBarFileTab
            }}>
          <div
            style={{ display: 'flex' }} 
            onClick={() => switchTab(key)}>
            <LangIcon />
            {tab.title}
          </div>
          <i
            style={{ cursor: "pointer" }}
            className="fas fa-times"
            onClick={() => closeClicked(key)}>
          </i>
        </FileTab>
      ))}
    </TopBarWrapper>
  );
}

const TopBarWrapper = styled.div`
  height: 40px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colorTopBar};
  padding: 0 50px;
  z-index: 9;
`;

const LangIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/380px-C_Programming_Language.svg.png")
    center center no-repeat;
  background-size: cover;
  margin-right: 10px;
`;

const FileTab = styled.p`
  height: 100%;
  display: flex;
  cursor: pointer;
  float: left;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0;
  padding: 0 15px;
  font-size: 15px;
  i {
    padding-left: 15px;
  }
`;

TopBar.defaultProps = {
  show: true,
};

export default TopBar;
