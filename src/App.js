import React from 'react';
import SignatureGenerator from './components/SignatureGenerator';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <SignatureGenerator />
      </div>
    </ThemeProvider>
  );
}

export default App;
