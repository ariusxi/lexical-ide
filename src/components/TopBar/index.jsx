import React from "react";
import styled from "styled-components";

function TopBar({ closeClicked, show }) {
  return (
    <TopBarWrapper style={{ display: show ? "" : "none" }}>
      <FileTab style={{ display: show ? "" : "none" }}>
        <LangIcon />
        program.c
        <i
          style={{ cursor: "pointer" }}
          className="fas fa-times"
          onClick={closeClicked}
        ></i>
      </FileTab>
    </TopBarWrapper>
  );
}

const TopBarWrapper = styled.div`
  height: 40px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #21252d;
  padding: 0 50px;
  z-index: 9;
`;

const FileTab = styled.p`
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #2b303b;
  margin: 0;
  font-size: 15px;
  i {
    padding-left: 10px;
  }
`;

const LangIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/380px-C_Programming_Language.svg.png")
    center center no-repeat;
  background-size: cover;
  margin-right: 10px;
`;

TopBar.defaultProps = {
  show: true,
};

export default TopBar;
