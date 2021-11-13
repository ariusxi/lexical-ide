import React from "react";
import styled from "styled-components";

function BottomBar({ theme, tokens, errors }) {
  return (
    <BottomBarWrapper theme={theme}>
      <WarningsAndErrors theme={theme}>
        <WarningAndErrorText>
          <WarningAndErrorIcons className="fas fa-times" />
          {errors}
        </WarningAndErrorText>
        <WarningAndErrorText>
          <WarningAndErrorIcons className="fas fa-exclamation-triangle" />
          {tokens}
        </WarningAndErrorText>
      </WarningsAndErrors>
      <BottomBarInformation theme={theme}>
        <p>Spaces: 4 - UTF-8 - Language: C</p>
      </BottomBarInformation>
    </BottomBarWrapper>
  );
}

const BottomBarWrapper = styled.div`
  width: 100%;
  height: 25px;
  background-color: ${({ theme }) => theme.colorBottomBarWrapper};
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const WarningsAndErrors = styled.div`
  color: ${({ theme }) => theme.colorBottomBarWarningError};
  margin-left: 10px;
`;

const WarningAndErrorText = styled.p`
  display: inline-block;
`;

const WarningAndErrorIcons = styled.i`
  margin: 0 5px;
  font-size: 13px;
`;

const BottomBarInformation = styled.div`
  color: ${({ theme }) => theme.colorBottomBarInformation};
  margin-right: 10px;
  font-size: 13px;
`;

export default BottomBar;
