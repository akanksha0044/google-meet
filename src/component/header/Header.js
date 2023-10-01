import React, { useState, useEffect, useRef } from 'react'
import './header.css';
import { HelpOutline, Feedback, Settings, Apps, PersonAddAlt1, Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { auth, storage } from "../../lib/firebase";
import { AddAPhoto } from "@mui/icons-material";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Header = ({ setLoading, loading }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [profileshow, setProfileShow] = useState(false);
  const inputRef = useRef(null);
  const [profile_url, set_profile_url] = useState('./image/user.png')
  const [new_profile_pic, set_new_profile_pic] = useState(null);
  const [new_profile_url, set_new_profile_url] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    set_new_profile_pic(file);
    var path = (window.URL || window.webkitURL).createObjectURL(file);
    set_new_profile_url(path)
  };

  const save_profile_pic = async (e) => {
    setLoading(true);
    setProfileShow(false);
    const file = new_profile_pic;
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`users/${user.uid}/${file.name}`);
    await fileRef.put(file);
    const downloadURL = await fileRef.getDownloadURL();
    await user.updateProfile({ photoURL: downloadURL });
    set_profile_url(user.photoURL);
    setLoading(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (user?.photoURL) {
          set_profile_url(user.photoURL);
          setLoading(true);
        }
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const formatDate = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };

  const handleImageLoad = () => {
    setLoading(false);
  }

  const open_profile_pic = () => {
    setProfileShow(!profileshow);
    set_new_profile_url(profile_url);
    setShow(false)
    setLoading(true);
  }

  const show_profile = () => {
    setShow(!show);
    if (!show) {
      setLoading(true);
    }
  }


  return (
    <div className='justify-content-between'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="./image/logo1.png" alt="" width="40" height="40" />

          </a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className='fs-5 navbar-brand' href='/'>{formatDate(currentDateTime)}</a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="/"><HelpOutline /></a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="/"><Feedback /></a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="/"><Settings /></a>
            </li>
            <li className="nav-item ">
              <a className="navbar-brand" href="/"><Apps /></a>
            </li>
            <li className="nav-item ">
              <img src={profile_url} alt='' className='topImg' onClick={show_profile} onLoad={handleImageLoad} />
            </li>
          </ul>
        </div>
      </nav>
      {
        show && <div className="position-absolute top-40 end-0" >
          <div className="card border-2 bg-light rounded-2" style={{ width: "25rem" }}>
            <div className='card-shadow'>
              <div className="card-body ">
                <div className='card ' style={{ width: "23rem" }}>
                  <div className='card-shadow'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-2'>
                          <img src={profile_url} alt='' className='topImg2' onClick={open_profile_pic} onLoad={handleImageLoad} />
                        </div>
                        <div className='col-md-10'>
                          <p>
                            {user ? user.displayName : ''}<br></br>
                            {user ? user.email : ''}
                          </p>
                          <button type="button" className="btn btn-outline-dark">Manage your Google Account</button>
                        </div>
                      </div>
                    </div>
                    <NavLink to='/login' className='text-decoration-none'>
                      <div className="card mt-2 ">
                        <div className="card-body">
                          <div className='row'>
                            <div className='col-md-2'>
                              <PersonAddAlt1 />
                            </div>
                            <div className='col-md-10'>
                              <p>Add another account</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
                <div className='row '>
                  <div className='col-md-1'>
                    <Logout className='ms-4' />
                  </div>
                  <div className='col-md-11'>
                    <button className="btn btn-outline-dark border-0" onClick={() => auth.signOut()}>Sign out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Modal show={profileshow} onHide={() => setProfileShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className='profile' />
            <span className='ms-2'>Account</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className='mt-2'>Profile Picture</h6>
          <p>A picture helps people recognize you and lets you know when you’re signed in to your account</p>
          <hr></hr>
          <div className='position-relative edit_profile_wrapper mx-auto'>
            <img src={new_profile_url} className='profileimg' role="button" alt="" onClick={() => inputRef.current.click()} onLoad={handleImageLoad} />
            <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
            {!loading && <span className='camera pointer' role="button" ><AddAPhoto /></span>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProfileShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={save_profile_pic}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <div>
        {
          profileshow && <div>
            <div className="card" style={{ width: "23rem", height: "25rem" }}>
              <div className="card-body ">
                <div className='profilemain'>

                  <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className='profile' />
                  <h3 className='ml-2'>Account</h3>



                </div>

                <h6 className='mt-2'>Profile Picture</h6>
                <p>A picture helps people recognize you and lets you know when you’re signed in to your account</p>
                <hr></hr>
                <img src={user ? user.photoURL ? user?.photoURL : './image/user.png' : './image/user.png'} className='profileimg mt-3' alt="" />
                <div className='probtn mt-5 ml-5'>

                  <button type="button" className="btn btn-secondary mr-2" onClick={() => inputRef.current.click()}>Change</button>
                  <button type="button" className="btn btn-secondary">Remove</button>
                </div>
              </div>
            </div>
          </div>
        }



      </div> */}
    </div>
  )
}

export default Header
