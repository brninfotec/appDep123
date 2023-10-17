import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function Editprofile() {

    let firstNameinputRef = useRef();
    let lastNameinputRef = useRef();
    let passwordinputRef = useRef();
    let profilePicinputRef = useRef();
    
    let[profilePic,setProfilePic] = useState("./images/pp.png");

     let loc = useLocation();
     console.log("inside the profile")
     console.log(loc);

     useEffect(()=>{
        firstNameinputRef.current.value = loc.state.firstName;
        lastNameinputRef.current.value = loc.state.lastName;
        passwordinputRef.current.value = loc.state.password;
       
     })
  

    let sendUpdatedDataToServer = async()=>{

       let dataToSend = new FormData();
        dataToSend.append("fn",firstNameinputRef.current.value);
        dataToSend.append("ln",lastNameinputRef.current.value);
        dataToSend.append("email",loc.state.email);
       dataToSend.append("password",passwordinputRef.current.value);

         for(let i=0;i < profilePicinputRef.current.files.length;i++)
            {
                dataToSend.append("profilePic",profilePicinputRef.current.files[i]);
            }

       let reqOptions={
            method:"PATCH",
            body:dataToSend,
        };

          let JSONData = await fetch("/updateDetails",reqOptions);
          let JSOData = await JSONData.json();
          console.log(JSOData);
         }

     return (
    <div className='App'>
        <form>
            <div>
                <h1>Edit Profile</h1>
            </div>
            <div>
                <label>Profile Pic: </label>
                <input ref={profilePicinputRef} type='file'  onChange={()=>{
                    let selectedFileURL = URL.createObjectURL(profilePicinputRef.current.files[0]);
                    setProfilePic(selectedFileURL);

                }}></input>
            </div>
            <div>
                <img className="profilePicPreview" src={profilePic}></img>
            </div>
            <div>
                <label>First Name: </label>
                <input ref={firstNameinputRef}></input>
            </div>

            <div>
                <label>Last Name: </label>
                <input ref={lastNameinputRef}></input>
            </div>

           <div>
                <label>Password: </label>
                <input ref={passwordinputRef}></input>
            </div>
         <button type="button"
            onClick={()=>{
                sendUpdatedDataToServer  ();
            }}>(Update)</button>
            

         <Link  className="link" to="/">Login</Link>
        
        </form>
        
    </div>
  )
}

export default Editprofile