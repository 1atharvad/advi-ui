import '@fontsource/raleway';
import '@fontsource/unbounded';
import '@fontsource/rubik';
import '../src/styles/base.scss';
import '../src/styles/themes/default/index.scss';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/theme';
import { adviDocsTheme } from './theme';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'midnight', title: 'Midnight' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'default',
    mode: 'dark',
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider theme={context.globals.theme} mode={context.globals.mode}>
        <Story />
      </ThemeProvider>
    ),
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
