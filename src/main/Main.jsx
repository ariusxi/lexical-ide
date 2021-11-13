import React, { Component } from "react";
import styled from "styled-components";

import analyzeString from "./../core/LexicalAnalyzer";

import BottomBar from "./../components/BottomBar";
import ConfigBar from "./../components/ConfigBar";
import FileContent from "./../components/FileContent";
import SideBar from "./../components/SideBar";
import TerminalBar from "./../components/TerminalBar";
import TopBar from "./../components/TopBar";

class Main extends Component {

  editor = null;

  theme = {
    "vs-dark": {
      // AppWrapper
      "colorAppWrapper": "#2b303b",
      // BottomBar
      "colorBottomBarWrapper": "#5E2A55",
      "colorBottomBarWarningError": "#A8AEBC",
      "colorBottomBarInformation": "#A8AEBC",
      // SideBar
      "colorSideBarMenu": "#21252D",
      "colorSideBarItem": "#727781",
      "colorSideBarItemHover": "#FFFFFF",
      "colorSideBarSettings": "#727781",
      "colorSideBarSettingsHover": "#FFFFFF",
      // TerminalBar
      "colorTerminalBar": "#191c22",
      "colorTerminalBarFont": "#FFFFFF",
      // TopBar
      "colorTopBar": "#21252d",
      "colorTopBarFileTab": "#22252e",
      "colorTopBarFileTabActive": "#2b303b",
      // ConfigBar
      "colorConfigBar": "#22252e",
      "colorConfigBarActive": "#2b303b",
      "colorConfigBarFont": "#FFFFFF",
    },
    "light": {
      // AppWrapper
      "colorAppWrapper": "#d4cfc4",
      // BottomBar
      "colorBottomBarWrapper": "#5E2A55",
      "colorBottomBarWarningError": "#A8AEBC",
      "colorBottomBarInformation": "#A8AEBC",
      // SideBar
      "colorSideBarMenu": "#dedad2",
      "colorSideBarItem": "#8d887e",
      "colorSideBarItemHover": "#000000",
      "colorSideBarSettings": "#8d887e",
      "colorSideBarSettingsHover": "#000000",
      // TerminalBar
      "colorTerminalBar": "#e6e3dd",
      "colorTerminalBarFont": "#000000",
      // TopBar
      "colorTopbar": "#dedad2",
      "colorTopBarFileTab": "#dddad1",
      "colorTopBarFileTabActive": "#d4cfc4",
      // ConfigBar
      "colorConfigBar": "#d4cfc4",
      "colorConfigBarActive": "#dddad1",
      "colorConfigBarFont": "#FFFFFF",
    },
  }
  
  state = {
    terminalOpened: false,
    editorTheme: "vs-dark",
    fileContent: "int main() {}",
    tabs: [],
    showConfig: false,
    currentTab: -1,
    results: [],
    tokens: 0,
    errors: 0,
  };

  constructor(props) {
    super(props);

    this.codeRef = React.createRef();
  }

  addEditorTab(content = 'int main() {}') {
    const { tabs, currentTab } = this.state;
    
    tabs.push({
      title: `program${tabs.length + 1}.c`,
      content,
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
    });
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

  handleOpenFile(e) {
    e.preventDefault();

    const self = this;
    const reader = new FileReader()
    reader.onload = async (e) => {
      const fileContent = e.target.result;
      self.addEditorTab(fileContent);
    }

    reader.readAsBinaryString(e.target.files[0])
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

  handleShowConfig() {
    this.setState({
      showConfig: true,
    });
  }

  handleChangeTheme(selectedTheme) {
    this.setState({
      showConfig: false,
      editorTheme: selectedTheme,
    });
  }

  render() {
    const { editorTheme, showConfig } = this.state;

    return (
      <AppWrapper theme={this.theme[editorTheme]}>
        <ConfigBar
          show={showConfig}
          currentTheme={editorTheme}
          theme={this.theme[editorTheme]}
          handleChangeTheme={this.handleChangeTheme.bind(this)}/>
        <SideBar
          theme={this.theme[editorTheme]}
          addEditorTab={this.addEditorTab.bind(this)}
          handleOpenFile={this.handleOpenFile.bind(this)}
          handleSaveFile={this.handleSaveFile.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          handleShowConfig={this.handleShowConfig.bind(this)}/>
        <TerminalBar
          theme={this.theme[editorTheme]}
          show={this.state.terminalOpened}
          results={this.state.results}
          handleToggleTerminal={this.handleToggleTerminal.bind(this)}/>
        <BottomBar
          theme={this.theme[editorTheme]}
          tokens={this.state.tokens}
          errors={this.state.errors}/>
        <TopBar
          theme={this.theme[editorTheme]}
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
  background-color: ${({ theme }) => theme.colorAppWrapper};
  font-family: "Source Code Pro", sans-serif;
  overflow: hidden;
`;

export default Main;
