import React from 'react';
import { ThemeProvider } from 'styled-components';
import chroma from 'chroma-js';

import './reboot.css';
import './height.css';
import './portal.css';

const bg = '#f3f3f3';
const fg = chroma(bg)
  .darken()
  .hex();
const fg2 = chroma(fg)
  .darken()
  .hex();
const btn = chroma(fg2)
  .darken()
  .hex();
const txt = chroma(btn)
  .darken()
  .hex();

const theme = {
  colors: {
    bg,
    fg,
    fg2,
    btn,
    txt,
  },
  border: {
    radius: '5px',
  },
};

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
