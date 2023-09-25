'use client'
import { useEffect } from 'react';

// available for all routes under posts
const Error = ({ error, reset }) => {

  useEffect(() => {
    console.error(error); //logs the error to an error reporting service
  }, [error]);

  return (
    <div>
      <h2>Oh oh! Something went wrong!</h2>
      <button
       onClick={
        () => reset()
       }
       >
        Try again
       </button>
    </div>
  )
}

export default Error;
