import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*, *::after, *::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  top: 0;
  left: 0;
  position: relative;
  font-family: 'Roboto', sans-serif;
}

a {
  text-decoration: none;
  color: black;
  font-family: 'Roboto', sans-serif;
}

button {
  border: none;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
}

img {
  max-width: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
}

input {
  font-family: 'Roboto', sans-serif;
  outline: 0;
  border: 0;
}

`;

export default GlobalStyles;
