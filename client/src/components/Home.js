import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Home() {
let navigate = useNavigate();
    let loc = useLocation();
    console.log(loc);

     let deleteAccount  = async()=>{

      let dataToSend = new FormData();
      dataToSend.append("email",loc.state.data.email);

     let reqOptions = {
      method:"DELETE",
      body:dataToSend
     };
     let JSONData = await fetch("/deleteUser",reqOptions);

     let JSOData = await JSONData.json();
     if(JSOData.status == "success"){
      alert(JSOData.msg)
      navigate("/")
     }else{
      alert("Some Technical Error,unable to delete")
     }
     }

  return (
    <div>
        
        <Link  className="link" to="/">Logout</Link>
        <button type='button' onClick={()=>{
          navigate('/Editprofile',{state:loc.state.data})
        }}>Edit profile</button>

        <button onClick={()=>{
          deleteAccount ();
        }}>Delete Account</button>

        {/* <Link  className="link" to="/Editprofile">Editprofile</Link> */}

        <h1>Welcome {loc.state.data.firstName}
        {loc.state.data.lastName}</h1>

        <img src={`/${loc.state.data.profilePic}`}></img>
    </div>
  )
}

export default Home