import { useState, useEffect } from 'react';

const ThrowErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      throw new Error('Oops!');
    }
  }, [hasError]);

  const clickButtonError = () => {
    setHasError(true);
  };

  return <button onClick={clickButtonError}>ThrowError</button>;
};

export default ThrowErrorButton;
