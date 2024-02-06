'use client';

import { MutableRefObject, useEffect, useState } from 'react';

import Typography from '../Typography';

type Props = {
  maxChars: number;
  updateCharacterCounterRef: MutableRefObject<
    ((text: string) => void) | undefined
  >;
};

const CharacterCounter = ({
  maxChars,
  updateCharacterCounterRef,
}: Props): React.ReactElement => {
  const [numCharsRemaining, setNumCharsRemaining] = useState(maxChars);

  useEffect(() => {
    updateCharacterCounterRef.current = (text: string): void => {
      setNumCharsRemaining(maxChars - text.length);
    };
  }, [maxChars, updateCharacterCounterRef]);

  return (
    <Typography color={numCharsRemaining < 0 ? `red` : `inherit`} size="xs">
      {numCharsRemaining} characters left
    </Typography>
  );
};

export default CharacterCounter;
