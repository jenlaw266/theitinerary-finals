import React from 'react';
import loader from '../../images/loader.gif'

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Loading" />
      <h2>Pack your bags...</h2>
    </div>
  )
}

export default Loader;

