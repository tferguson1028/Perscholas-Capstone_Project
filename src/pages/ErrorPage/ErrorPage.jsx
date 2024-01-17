import React from 'react';

function ErrorPage(props)
{
  const { errorCode = 0, errorMessage = "" } = props;
  console.error(errorCode, errorMessage);
  return (
    <main>
      <h1>{errorCode}</h1>
      <p>{errorMessage}</p>
    </main>
  );
}

export default ErrorPage;
