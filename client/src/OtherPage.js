import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <p>I'm some other page!</p>
      <p>I'm just here to add another bit of complexity to the project by way of react-router-dom</p>
      <Link to="/">Go to home</Link>
    </div>
  );
};
