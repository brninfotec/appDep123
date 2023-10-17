import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {

    let firstNameinputRef = useRef();
    let lastNameinputRef = useRef();
    let emailinputRef = useRef();
    let passwordinputRef = useRef();
    let profilePicinputRef = useRef();
    let ageinputRef = useRef();
    let genderinputRef = useRef();
    let mobileinputRef = useRef();

    let[profilePic,setProfilePic] = useState("./images/pp.png")

    let[selectedGender,setSelectedGender] =useState("")
  

    let sendSignupDataToServerFormData = async()=>{

       

        let dataToSend = new FormData();
        dataToSend.append("fn",firstNameinputRef.current.value);
        dataToSend.append("ln",lastNameinputRef.current.value);
        dataToSend.append("email",emailinputRef.current.value);
        dataToSend.append("password",passwordinputRef.current.value);

         for(let i=0;i < profilePicinputRef.current.files.length;i++)
            {
                dataToSend.append("profilePic",profilePicinputRef.current.files[i]);
            }

       
        dataToSend.append("age",ageinputRef.current.value);
        dataToSend.append("gender",selectedGender);
        dataToSend.append("mobile",mobileinputRef.current.value);

        let reqOptions={
            method:"POST",
            
            body:dataToSend,
        };

          let JSONData = await fetch("http://localhost:1234/signup",reqOptions);

          let JSOData = await JSONData.json();
          console.log(JSOData);

    }



  return (
    <div className='App'>
        <form>
            <div>
                <h1>Signup Page</h1>
            </div>
            <div>
                <label>Profile Pic: </label>
                <input ref={profilePicinputRef} type='file'  onChange={()=>{
                    let selectedFileURL = URL.createObjectURL(profilePicinputRef.current.files[0]);
                    setProfilePic(selectedFileURL);

                }}></input>
            </div>
            <div>
                <img className='profilePicPreview' src={profilePic}></img>
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
                <label>Email: </label>
                <input ref={emailinputRef}></input>
            </div>

            <div>
                <label>Password: </label>
                <input ref={passwordinputRef}></input>
            </div>

            

            <div>
                <label>Age: </label>
                <input ref={ageinputRef}></input>
            </div>
            <div>
                <label>Gender: </label>
                <input ref={genderinputRef} onChange={()=>{
                    setSelectedGender(genderinputRef.current.value);
                }}></input>
                 <input type="radio" name="radio" onChange={(e)=>{
                   console.log(e.target.checked)
                   setSelectedGender("Male");
                 }}></input>
            <label className='radio'>MALE</label>
            <input type="radio" name="radio" onChange={(e)=>{
                console.log(e.target.checked)
                setSelectedGender("Female");
            }}></input>
            <label className='radio'>FEMALE</label>
            <span></span> 
            </div>

            <div>
                <label>Mobile No: </label>
                <input ref={mobileinputRef}></input>
            </div>

            

           <button type="button"
            onClick={()=>{
                sendSignupDataToServerFormData ();
            }}>(Signup)</button>
            

         <Link  className="link" to="/">Login</Link>
        
        </form>
        
    </div>
  )
}

export default Signup