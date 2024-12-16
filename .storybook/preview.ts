import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import '../src/app/globals.css';
const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
        backgrounds: {
          default: 'dark',
          values: [
            {
              name: 'dark',
              value: '#202020',
      },
    ],
  },
  layout: 'fullscreen',
}
};

export default preview;
