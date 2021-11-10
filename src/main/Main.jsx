import React, { Component } from "react";
import styled from "styled-components";

import analyzeString from "./../core/LexicalAnalyzer";

import BottomBar from "./../components/BottomBar";
import FileContent from "./../components/FileContent";
import SideBar from "./../components/SideBar";
import TerminalBar from "./../components/TerminalBar";
import TopBar from "./../components/TopBar";

class Main extends Component {

  editor = null;
  
  state = {
    tabOpened: false,
    terminalOpened: false,
    editorTheme: "vs-dark",
    fileContent: "int main() {}",
    results: [],
    tokens: 0,
    errors: 0,
  };

  constructor(props) {
    super(props);

    this.codeRef = React.createRef();
  }

  closeFileClicked() {
    this.setState((prevState) => ({
      tabOpened: !prevState.tabOpened,
    }));
  }

  handleToggleTerminal() {
    this.setState((prevState) => ({
      terminalOpened: !prevState.terminalOpened,
    }))
  }

  handleSubmit() {
    const fileContent = this.editor.current.getValue();
    const results = analyzeString(fileContent);

    this.setState({
      results,
      terminalOpened: true,
      tokens: results.length,
    })
  }

  handleSaveFile() {
    const element = document.createElement("a");
    const fileContent = this.editor.current.getValue();
    const file = new Blob([
      fileContent,
    ], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);
    element.download = "program.c";
    document.body.appendChild(element);

    element.click();
  }

  handleEditorDidMount(editor) {
    this.editor = editor;
  }

  render() {
    return (
      <AppWrapper>
        <SideBar
          openClicked={this.closeFileClicked.bind(this)}
          handleSaveFile={this.handleSaveFile.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}/>
        <TerminalBar
          show={this.state.terminalOpened}
          results={this.state.results}
          handleToggleTerminal={this.handleToggleTerminal.bind(this)}/>
        <BottomBar 
          tokens={this.state.tokens}
          errors={this.state.errors}/>
        <TopBar
          show={this.state.tabOpened}
          closeClicked={this.closeFileClicked.bind(this)}/>
        <FileContent
          show={this.state.tabOpened}
          fileContent={this.state.fileContent}
          editorTheme={this.state.editorTheme}
          onMount={this.handleEditorDidMount.bind(this)}/>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #2b303b;
  font-family: "Source Code Pro", sans-serif;
  overflow: hidden;
`;

export default Main;
