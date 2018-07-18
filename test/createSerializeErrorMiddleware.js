// @flow

import test from 'ava';
import type {
  MessageType
} from 'roarr';
import createSerializeErrorMiddleware from '../src/createSerializeErrorMiddleware';

// eslint-disable-next-line flowtype/no-weak-types
const createMessage = (input: Object): MessageType => {
  return input;
};

test('serializes errors', (t) => {
  const translateMessage = createSerializeErrorMiddleware();

  const translatedMessage = translateMessage(createMessage({
    context: {
      error: new Error('foo')
    },
    message: 'bar'
  }));

  const serializedError = translatedMessage.context.error;

  if (!serializedError || typeof serializedError !== 'object') {
    throw new TypeError('Unexpected state.');
  }

  t.true(serializedError instanceof Error === false);
  t.true(serializedError.message === 'foo');
  t.true(serializedError.name === 'Error');
  t.true(typeof serializedError.stack === 'string');
});
