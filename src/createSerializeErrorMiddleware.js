// @flow

import serializeError from 'serialize-error';
import type {
  TranslateMessageFunctionType
} from 'roarr';

export default (): TranslateMessageFunctionType => {
  return (message) => {
    const newContext = {};

    const entries = Object.entries(message.context);

    for (const entry of entries) {
      const key = entry[0];

      let value = entry[1];

      if (value instanceof Error) {
        value = serializeError(value);
      }

      newContext[key] = value;
    }

    return {
      ...message,
      context: newContext
    };
  };
};
