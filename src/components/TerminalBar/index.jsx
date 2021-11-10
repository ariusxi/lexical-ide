import React from 'react';
import styled from 'styled-components';

function TerminalBar({ 
  show, 
  results,
  handleToggleTerminal,
}) {

  const drawLine = (char) => {
    const windowWidth = window.innerWidth - 135;
    const quantity = Math.floor(windowWidth / 9);

    return Array(quantity).fill(char).join('');
  }

  return (
    <TerminalBarWrapper
      style={{ display: show ? '' : 'none' }}>
      <TerminalBarButtonClose 
        className="fas fa-times"
        onClick={handleToggleTerminal}/>
      <span>
        {drawLine('=')}
      </span>
      <p>Lexical Terminal</p>
      <span>
        {drawLine('=')}
      </span>
      {results.map((line, key) => (
        <p key={key}>
          Command: {line.content} - type: {line.type}
        </p>
      ))}
    </TerminalBarWrapper>
  )
}

const TerminalBarWrapper = styled.div`
  width: calc(100% - 70px);
  height: 290px;
  background-color: #191c22;
  color: #fff;
  position: absolute;
  bottom: 25px;
  left: 50px;
  z-index: 1000;
  padding: 10px;
  padding-top: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const TerminalBarButtonClose = styled.i`
  position: fixed;
  right: 15px;
  bottom: 330px;
  cursor: pointer;
`

export default TerminalBar;