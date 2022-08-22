import axios from "axios"
import { baseURL } from "../../Api/BaseUrl"
import { USER_LOG_OUT, USER_SIGNIN_FAIL, USER_SIGNIN_START, USER_SIGNIN_SUCCESS } from "../Constants/Signin"

export const SignIn=(val,navigate)=>async(dispatch)=>{
    try{
        dispatch({type:USER_SIGNIN_START})
        const {data}=await axios.post(`${baseURL}/api/v1/technician/login`,val,{
          headers:{
            'Access-Control-Allow-Origin' : "*"
          }
        })
         dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
         localStorage.setItem('tokens',JSON.stringify(data));
           data.token && navigate('/') 
    }catch(err){
        dispatch({type:USER_SIGNIN_FAIL,payload:err.message})

    }

}

export const logout=(navigate)=>(dispatch)=>{
  localStorage.removeItem('tokens');
   dispatch({type:USER_LOG_OUT})
  navigate('/login');

}
