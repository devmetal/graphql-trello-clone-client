import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import ThemeProvider from '../src/Theme';

addDecorator(story => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
));

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
