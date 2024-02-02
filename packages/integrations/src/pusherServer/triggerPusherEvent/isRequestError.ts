import { RequestError } from './types';

// Pusher doesn't export its RequestError type, so we have to use a type
// guard to access the `status` property.
export default (error: unknown): error is RequestError => {
  return Boolean(
    error &&
      typeof error === `object` &&
      // eslint-disable-next-line @disappearing-messages/no-type-assertion
      typeof (error as RequestError).status === `number`
  );
};
