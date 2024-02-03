import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default (): [Date | null, Dispatch<SetStateAction<Date | null>>] => {
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSubmittedAt(null);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [submittedAt]);

  return [submittedAt, setSubmittedAt];
};
