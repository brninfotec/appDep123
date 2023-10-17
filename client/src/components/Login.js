import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Login() {

   
    let emailinputRef = useRef();
    let passwordinputRef = useRef();
    let navigate = useNavigate();

    useEffect(()=>{
    
      emailinputRef.current.value = localStorage.getItem("email");
      passwordinputRef.current.value = localStorage.getItem("password");
      // validateCredentials();
      // validateToken();
    },[])
    
    let  validateCredentials = async()=>{

    let dataToSend = new FormData();
        
        dataToSend.append("email",emailinputRef.current.value);
        dataToSend.append("password",passwordinputRef.current.value);

        let reqOptions={
            method:"POST",
             body:dataToSend,
        };

          let JSONData = await fetch("http://localhost:1234/validateLogin",reqOptions);

          let JSOData = await JSONData.json();

          alert(JSOData.msg);

          if(JSOData.status === "success"){
            console.log(JSOData);

            //  localStorage.setItem("email",emailinputRef.current.value);
            //  localStorage.setItem("password",passwordinputRef.current.value);

             localStorage.setItem("token",JSOData.token);

            navigate("/home",{state:JSOData });
          }else{
            alert(JSOData.msg);
          }
        };
       

        let  validateCredentialsThruAxios = async()=>{

          let dataToSend = new FormData();
              
              dataToSend.append("email",emailinputRef.current.value);
              dataToSend.append("password",passwordinputRef.current.value);

            let response = await ("http://localhost:1234/validateLogin",dataToSend);

            console.log(response);
      
              
      
                if(response.data.status === "success"){
                  console.log(response.data);
      
      
                   localStorage.setItem("token",response.data.token);
      
                  navigate("/home",{state:response.data });
                }else{
                  alert(response.data.msg);
                }
              };


       let validateToken = async()=>{

        let dataToSend = new FormData();
        dataToSend.append("token",localStorage.getItem("token"));

       let reqOptions = {
          method:"POST",
          body:dataToSend
        }
         let JSONData = await fetch("http://localhost:1234/validateToken",reqOptions);

          let JSOData = await JSONData.json();
          console.log(JSOData);

       }  

        return (
        <div className='App'>
        <form>
            <div>
                <h1>Login Page</h1>
            </div>
           <div>
                <label>Email: </label>
                <input ref={emailinputRef}></input>
            </div>

            <div>
                <label>Password: </label>
                <input ref={passwordinputRef}></input>
            </div>

          <button type="button"
            onClick={()=>{
              validateCredentials();
            }}>(Login)</button>



       <Link className="link" to="/signup">Signup</Link>

       
        </form>
        
    </div>
  )
}

export default Login;