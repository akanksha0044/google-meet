import React, { useState, useEffect } from 'react'
import './main.css';
import { EmergencyRecording, Keyboard } from "@mui/icons-material";
import $ from "jquery";

const Main = ({ setRoomName, handleSubmit }) => {
  const handleRoomNameChange = (e) => {
    console.log("handleSubmit prop:", handleSubmit);
    setRoomName(e.target.value);
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlide = (index) => {
    setCurrentSlide(index);
  }

  const mouseDownCoords = e => {
    window.checkForDrag = e.clientX;
  };

  const clickOrDrag = e => {
    const mouseUp = e.clientX;
    if (!(
      mouseUp < window.checkForDrag + 5 &&
      mouseUp > window.checkForDrag - 5)
    ) {
      if (mouseUp > window.checkForDrag) {
        handleSlide(currentSlide > 0 ? currentSlide - 1 : 2)
        document.getElementById("carousel-control-prev").click();
      } else {
        handleSlide(currentSlide < 2 ? currentSlide + 1 : 0)
        document.getElementById("carousel-control-next").click();
      }
    }
  };
  $('#carouselExampleFade').on('dragstart', function (event) { event.preventDefault(); });

  return (
    <>
      <div className='row ps-3'>
        <div className='col-md-6 ' >
          <h1 className="display-5 fw-normal  mt-5">Premium video meetings Now free for everyone
          </h1>
          <p className='fs-5 mt-4 '>We re-engineered the service we built for secure business<br></br> meetings, Google Meet, to make it free and available for all.</p>
          <div className='row '>
            <div className='col-md-4 mt-3 ms-4'>
              <button type="button" className="btn btn-primary btn-lg " onClick={handleSubmit}><EmergencyRecording className='pr-2' />New Meeting</button>
            </div>
            <div className='col-md-3 mt-3 '>
              {/* <Keyboard className='position-absolute top-95'/> */}
              <input className='input' placeholder='Enter a code or link' onChange={handleRoomNameChange} />
            </div>
            <div className='col-md-2 mt-4 ms-3'>
              <button className='"btn btn-outline-dark border border-dark' onClick={handleSubmit}>Join</button>
            </div>
            <hr className='sideHr ms-4' />
          </div>
          <div className='col-md-6 mt-1 ms-3 '>
            <p className='fs-5'><a href="#" className='text-decoration-none'>Learn more </a>about Google Meet</p>
          </div>

        </div>


        <div className='col-md-6 mt-5 '>
          <div className="d-flex ms-5">
            <div id="carouselExampleFade" className="carousel slide carousel-fade" onMouseDown={e => mouseDownCoords(e)}
              onMouseUp={e => clickOrDrag(e)} data-bs-ride="carousel" >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="./image/fi.svg" className="d-block " alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="./image/se.svg" className="d-block " alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="./image/thi.svg" className="d-block " alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" id="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" id="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

          </div>
          <div className=" mt-3">
            {currentSlide === 0 && <p>First image text</p>}
            {currentSlide === 1 && <p>Second image text</p>}
            {currentSlide === 2 && <p>Third image text</p>}
          </div>
        </div>
      </div>

    </>
  )
}

export default Main
