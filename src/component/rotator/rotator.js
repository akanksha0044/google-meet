import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './rotator.css';

const Rotator = () => {
  return (
    <>
      {
        <div className="screen">
          <div className='spinner'>
            <Spinner animation="border" />
          </div>
        </div>
      }
    </>
  )
}

export default Rotator