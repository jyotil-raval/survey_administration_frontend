//useTextfield function
import { useState } from 'react';

const useInput = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const dispatch = (event: { preventDefault: () => void; target: { value: any } }) => {
    event.preventDefault();
    setState(event.target.value);
  };
  return [state, dispatch];
};

export default useInput;
