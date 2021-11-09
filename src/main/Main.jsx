import React, { Component } from "react";
import hljs from "highlight.js";
import styled from "styled-components";

import analyzeString from "./../core/LexicalAnalyzer";

import BottomBar from "./../components/BottomBar";
import FileContent from "./../components/FileContent";
import SideBar from "./../components/SideBar";
import TerminalBar from "./../components/TerminalBar";
import TopBar from "./../components/TopBar";

class Main extends Component {

  state = {
    tabOpened: true,
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

  onChange(event) {
    this.setState({
      fileContent: event.target.value,
    })
  }

  getContentFile(event) {
    const code = event.keyCode || event.which;  

    if ([9, 13].includes(code)) {
      event.preventDefault();

      const characterCode = () => ({
        9: "\t",
        13: "\n",
      }[code]);

      const { selectionStart, selectionEnd } = event.target;
      this.setState((prevState) => ({
        fileContent:
          prevState.fileContent.substring(0, selectionStart) +
          characterCode() + // '\t' = tab, size can be change by CSS
          prevState.fileContent.substring(selectionEnd)
      }), () => {
        this.codeRef.current.selectionStart = this.codeRef.current.selectionEnd = selectionStart + 1;
      })
    }
  }

  handleSubmit() {
    const { fileContent } = this.state;
    const results = analyzeString(fileContent);

    this.setState({
      results,
      tokens: results.length,
    })
  }

  componentDidMount() {
    hljs.highlightAll();
  }

  render() {
    return (
      <AppWrapper>
        <SideBar
          openClicked={this.closeFileClicked.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}/>
        <TerminalBar
          show={this.state.tokens > 0}
          results={this.state.results}/>
        <BottomBar 
          tokens={this.state.tokens}
          errors={this.state.errors}/>
        <TopBar
          show={this.state.tabOpened}
          closeClicked={this.closeFileClicked.bind(this)}/>
        <FileContent
          show={this.state.tabOpened}
          fileContent={this.state.fileContent}
          codeRef={this.codeRef}
          onChange={this.onChange.bind(this)}
          getContentFile={this.getContentFile.bind(this)}/>
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
