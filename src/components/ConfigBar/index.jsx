import React from 'react';
import styled from 'styled-components';

function ConfigBar({
  show,
  theme,
  currentTheme, 
  handleChangeTheme,
}) {
  return (
    <ConfigBarWrapper 
      theme={theme}
      style={{ display: show ? '' : 'none' }}>
      <ConfigBarList>
        <ConfigBarItem
          theme={theme}
          onClick={() => handleChangeTheme('vs-dark')}
          isSelected={currentTheme === 'vs-dark'}>
          <h3>Tema escuro</h3>
          <p>Muito mais agradável aos olhos</p>
        </ConfigBarItem>
        <ConfigBarItem
          theme={theme}
          onClick={() => handleChangeTheme('light')}
          isSelected={currentTheme === 'light'}>
          <h3>Tema claro</h3>
          <p>Um tema padrão da própria IDE</p>
        </ConfigBarItem>
      </ConfigBarList>
    </ConfigBarWrapper>
  );
}

const ConfigBarWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 1vh;
  margin-left: -15vw;
  width: 30vw;
  background-color: ${({ theme }) => theme.colorConfigBar};
  color: ${({ theme }) => theme.colorConfigBarFont};
  z-index: 2000;
  box-shadow: 
    0 2px 2px 0 rgb(0 0 0 / 14%), 
    0 3px 1px -2px rgb(0 0 0 / 12%), 
    0 1px 5px 0 rgb(0 0 0 / 20%);
`;

const ConfigBarList = styled.ul`
  list-style-type: none;
  display: grid;
  margin: 0;
  padding-left: 0;
  grid-template-columns: repeat(1, 100%);
`

const ConfigBarItem = styled.li`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ theme, isSelected }) => isSelected ?
    theme.colorConfigBarActive :
    theme.colorConfigBar
  };
  h3, p {
    margin: 0;
  }
`

export default ConfigBar;