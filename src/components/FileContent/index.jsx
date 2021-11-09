import React from "react";
import styled from "styled-components";

function FileContent({
    show,
    codeRef,
    fileContent,
    onChange,
    getContentFile,
}) {
  return (
    <FileContentWrapper style={{ display: show ? "" : "none" }}>
      <pre>
        <FileContentCode
          ref={codeRef}
          value={fileContent}
          onChange={onChange}
          onKeyDown={event => getContentFile(event)}/>
      </pre>
    </FileContentWrapper>
  );
}

const FileContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 40px 0px 20px 70px;
`;

const FileContentCode = styled.textarea`
  color: white;
  outline: none;
  border: none;
  width: 100vw;
  height: 1002vh;
  font-weight: bold;
  background-color: transparent;
  tab-size: 4;
`;

export default FileContent;
