import { PaperAirplaneIcon } from '@heroicons/react/20/solid';

import { Textarea } from '@/app/components';

import { Section } from './types';

export default (): Section => {
  return {
    title: `Textareas`,
    subsections: [
      {
        title: `Simple`,
        demos: [
          <div key="simple" className="w-full max-w-sm">
            <Textarea
              id="textarea-simple"
              name="simple"
              placeholder="Write a message..."
            />
          </div>,
        ],
      },
      {
        title: `Helper text`,
        demos: [
          <div key="helperText" className="w-full max-w-sm">
            <Textarea
              helperText="This field is required"
              id="textarea-helperText"
              name="helperText"
              placeholder="Write a message..."
            />
          </div>,
        ],
      },
      {
        title: `Error`,
        demos: [
          <div key="error" className="w-full max-w-sm">
            <Textarea
              error
              helperText="This field is required"
              id="textarea-error"
              name="error"
              placeholder="Write a message..."
            />
          </div>,
        ],
      },
      {
        title: `Submit`,
        demos: [
          <div key="submit" className="w-full max-w-sm">
            <Textarea
              id="textarea-submit"
              name="submit"
              placeholder="Write a message..."
              submit={{ label: `Send`, icon: PaperAirplaneIcon }}
            />
          </div>,
        ],
      },
    ],
  };
};
