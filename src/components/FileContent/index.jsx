import React from "react";
import styled from "styled-components";
import Editor from "@monaco-editor/react";

function FileContent({
    show,
    tabs,
    currentTab,
    editorTheme,
    onMount,
}) {
  const codeRef = React.useRef(null);

  const handleEditorDidMount = (editor) => {
    codeRef.current = editor;
    onMount(codeRef);
  }

  return (
    <FileContentWrapper style={{ display: tabs.length > 0 ? "" : "none" }}>
      <FileContentCode
        defaultLanguage="c"
        loading="Carregando..."
        theme={editorTheme}
        defaultValue={''}
        onMount={handleEditorDidMount}/>
    </FileContentWrapper>
  );
}

const FileContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 35px 0px 15px 45px;
`;

const FileContentCode = styled(Editor)`
  padding: 10px;
`;

export default FileContent;
