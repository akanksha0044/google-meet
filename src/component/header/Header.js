import React, { useState, useEffect, useRef } from 'react'
import './header.css';
import { HelpOutline, Feedback, Settings, Apps, PersonAddAlt1, Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { auth, storage } from "../../lib/firebase";


const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`users/${user.uid}/${file.name}`);
    await fileRef.put(file);
    const downloadURL = await fileRef.getDownloadURL();
    await user.updateProfile({ photoURL: downloadURL });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // await user.updateProfile({
        //   displayName: `${user.uid}`,
        // });
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


  return (
    <div className='justify-content-between'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="./image/logo1.png" alt="" width="40" height="40" />
            <span>Google Meet</span>
          </a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className='fs-5 navbar-brand'>{formatDate(currentDateTime)}</a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="#"><HelpOutline /></a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="#"><Feedback /></a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand" href="#"><Settings /></a>
            </li>
            <li className="nav-item ">
              <a className="navbar-brand" href="#"><Apps /></a>
            </li>
            <li className="nav-item ">
              <img src={user ? user.photoURL ? user?.photoURL : './image/user.png' : './image/user.png'} alt='' className='topImg' onClick={() => setShow(!show)} />
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
                          {/* <img src='./image/ak.jpg' alt='' className='topImg2'/> */}
                          <img src={user ? user.photoURL ? user?.photoURL : './image/user.png' : './image/user.png'} alt='' className='topImg2' onClick={() => inputRef.current.click()} />
                          <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
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
    </div>
  )
}

export default Header
