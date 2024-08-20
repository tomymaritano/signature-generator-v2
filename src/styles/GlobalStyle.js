import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
  }

  input, button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
