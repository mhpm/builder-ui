/** @type { import('@storybook/react').Preview } */
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/bfs-theme.min.css';
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
      canvas: { sourceState: 'shown' },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
      },
    },
  },
};

export default preview;
