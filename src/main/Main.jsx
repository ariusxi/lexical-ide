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
    terminalOpened: false,
    editorTheme: "vs-dark",
    fileContent: "int main() {}",
    tabs: [],
    currentTab: -1,
    results: [],
    tokens: 0,
    errors: 0,
  };

  constructor(props) {
    super(props);

    this.codeRef = React.createRef();
  }

  addEditorTab() {
    const { tabs, currentTab } = this.state;
    
    tabs.push({
      title: `program${tabs.length + 1}.c`,
      content: 'int main() {}',
    });

    if (currentTab !== -1) {
      tabs[currentTab].content = this.editor.current.getValue();
    }

    this.editor.current.getModel().setValue(tabs[tabs.length - 1].content);

    this.setState({
      tabs,
      currentTab: currentTab === -1 ? 0 : tabs.length - 1,
    });
  }

  switchEditorTab(index) {
    const { currentTab, tabs } = this.state;

    tabs[currentTab].content = this.editor.current.getValue();
    this.editor.current.getModel().setValue(tabs[index].content);

    this.setState({
      tabs,
      currentTab: index,
    })
  }

  closeEditorTab(index) {
    const { currentTab, tabs } = this.state;

    tabs.splice(index, 1);

    if (tabs.length === 0) {
      this.editor.current.getModel().setValue('');
    } else {
      this.editor.current.getModel().setValue(tabs[tabs.length - 1].content);
    }

    this.setState({
      tabs,
      currentTab: currentTab === index && tabs.length === 0 ? -1 : tabs.length - 1,
    })
  }

  handleToggleTerminal() {
    this.setState((prevState) => ({
      terminalOpened: !prevState.terminalOpened,
    }));
  }

  handleSubmit() {
    const { currentTab } = this.state;
    if (currentTab === -1) return;

    const fileContent = this.editor.current.getValue();
    const results = analyzeString(fileContent);

    this.setState({
      results,
      terminalOpened: true,
      tokens: results.length,
    });
  }

  handleSaveFile() {
    const { tabs, currentTab } = this.state;

    const element = document.createElement("a");
    const fileContent = this.editor.current.getValue();
    const file = new Blob([
      fileContent,
    ], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);
    element.download = tabs[currentTab].title;
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
          addEditorTab={this.addEditorTab.bind(this)}
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
          show={this.state.tabs.length > 0}
          tabs={this.state.tabs}
          currentTab={this.state.currentTab}
          switchTab={this.switchEditorTab.bind(this)}
          closeClicked={this.closeEditorTab.bind(this)}/>
        <FileContent
          show={this.state.tabOpened}
          currentTab={this.state.currentTab}
          tabs={this.state.tabs}
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
