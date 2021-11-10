import React from 'react'
import styled from 'styled-components'

function SideBar({ 
  addEditorTab,
  handleSubmit,
  handleSaveFile,
}) {
    return (
        <SideBarMenu>
            <SideBarItem 
                style={{ marginTop: '15px' }}
                className="far fa-copy"
                onClick={() => addEditorTab()}/>
            <SideBarItem
              className="far fa-save"
              onClick={() => handleSaveFile()}/>
            <SideBarItem 
              className="fas fa-bug"
              onClick={handleSubmit}/>
            <SideBarSettings className="fas fa-cog"/>
        </SideBarMenu>
    );
}

const SideBarMenu = styled.ul`
    list-style: none;
    height: 100%;
    width: 50px;
    padding: 0;
    margin: 0;
    background-color: #21252D;
    z-index: 999;
    position: absolute;
    left: 0;
    top: 0;
`;

const SideBarItem = styled.li`
    color: #727781;
    z-index: 999;
    font-size: 1.7rem;
    cursor: pointer;
    width: 50px;
    text-align: center;
    margin-bottom: 30px;
    transition: .2s;
    &:hover {
        color: #fff;
    }
`;

const SideBarSettings = styled.li `
    color: #727781;
    z-index: 999;
    font-size: 1.7rem;
    cursor: pointer;
    width: 50px;
    text-align: center;
    margin-bottom: 30px;
    transition: .2s;
    position: absolute;
    bottom: 20px;
    left: 0;
    &:hover {
        color: #fff;
    }
`;

export default SideBar;