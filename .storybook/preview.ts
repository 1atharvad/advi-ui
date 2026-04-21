import '@fontsource/raleway';
import '@fontsource/unbounded';
import '@fontsource/rubik';
import '../src/styles/global.scss';
import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { adviDocsTheme } from './theme';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'dark',
      parentSelector: 'html',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    docs: {
      theme: adviDocsTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
