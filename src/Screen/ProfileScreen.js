import axios from 'axios'
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { baseURL } from '../Api/BaseUrl';
const ProfileScreen = () => {
  const technician= useSelector(store=>store.technician);
      const {signInfo}=technician;
    const token=signInfo.token;
  const navigate=useNavigate();
  const [profile,setProfile]=useState([]);
  const [name,setName]=useState('');
  const [compnyName,setCompnyName]=useState('');
  const [email,setEmail]=useState('');
  const [designations,setDesignations]=useState('');
  const [streetAddress,setStreetAddress]=useState('');
  const [city,setCity]=useState('');
  const [state,setState]=useState('');
  const [zip,setZip]=useState('');
  useEffect(()=>{
    const getProfile=async()=>{
     const {data}=await axios.get(`${baseURL}/api/v1/technician/getTechnician`,{
      headers:{
        authorization:token
      }
     })
     setProfile(data.data)
    }
    getProfile();
  },[])
  console.log(profile)
  useEffect(()=>{
    setName(profile.name)
    setStreetAddress(profile.streetAddress)
    setCompnyName(profile.companyName)
    setEmail(profile.email)
    setDesignations(profile.designations)
    setCity(profile.city)
    setState(profile.state)
    setZip(profile.zip)

  },[profile])

    const submiHandler=async(e)=>{
   e.preventDefault();
   const value={ name,email,compnyName,designations}
   try{
     
    const {data}=await axios.put(`${baseURL}/api/v1/technician/updateTechnician`,value,{
      headers:{
        authorization:token
      },
     } )
     console.log(data)
     alert('Profile Updated Successfully')
     navigate('/')
   }catch(err){
    console.log(err,'error')
   }
    }
   
    
  return (
    <>
     

        <div className='w-full h-full   bg-[#0d3841] gap-5 pb-5 '>
        <div className='w-full h-20 bg-[#76d3e2] text-white flex justify-center items-center space-x-5 '>
         <Link className='text-lg font-mono font-bold  text-black' to='/waitingList'>Waiting List</Link>
         <Link className='text-lg font-mono font-bold  text-black' to='/'>Dashboard</Link>
       </div>
       <div className=' w-[full] h-full flex flex-col justify-center items-center mt-5  '>

        {/* <h1 className='bg-yellow-700 text-center text-3xl text-white font-serif p-5'>Profile Screen</h1> */}
        
        <form className='flex flex-col space-y-5  md:w-[60%] w-[90%] justify-center items-center rounded-lg mt-2 p-6   bg-[#76d3e2] '>
        <h1 className='text-3xl text-center bg-yellow   text-black '>Profile Screen    </h1>
          
         <div className='flex w-full items-center justify-center space-x-9'>
         <TextField
         variant='outlined'
         value={name}
         onChange={(e)=>{setName(e.target.value)}}
         className='border-2 p-2 w-full'
          type='text'
          label='Name'
          name='name'
          />
         </div>

         <div className='flex w-full items-center justify-center space-x-8 bg-[]'>
         <TextField variant='outlined'
         value={email}
         onChange={(e)=>{setEmail(e.target.value)}}

         className='border-2 p-2 w-full'
          type='email'
          label='email'
          name='email'
          
          />

         </div>

         <div className='flex w-full items-center justify-center space-x-5'>
         <TextField variant='outlined'
         onChange={(e)=>{setCompnyName(e.target.value)}}
         value={compnyName}
          className='border-2  p-2 w-full'
          type='text'
          label='Compny Name'
          name='compnyName'
          
          />
          
         </div>

        

         <div className='flex w-full items-center justify-center space-x-10'>
         <TextField variant='outlined'
         value={designations}
         onChange={(e)=>{setDesignations(e.target.value)}}
         className='border-2 p-2 w-full'
          type='text'
          label='Designatios'
          name='designations'
          
          />
         </div>

         <div className='flex w-full items-center justify-center space-x-5'>
         <TextField variant='outlined'
         onChange={(e)=>{setStreetAddress(e.target.value)}}
         value={streetAddress}
          className='border-2  p-2 w-full'
          type='text'
          label='Street Address'
          name='streetAddress'
          
          />
          
         </div>
        
         
         <div className='flex w-full items-center justify-center space-x-10'>
         <TextField variant='outlined'
         value={city}
         onChange={(e)=>{setCity(e.target.value)}}
         className='border-2 p-2 w-full'
          type='text'
          label='City'
          name='city'
          
          />
         </div>
         <div className='flex w-full items-center justify-center space-x-10'>
         <TextField variant='outlined'
         value={state}
         onChange={(e)=>{setState(e.target.value)}}
         className='border-2 p-2 w-full'
          type='text'
          label='State'
          name='state'
          
          />
         </div>
         <div className='flex w-full items-center justify-center space-x-10'>
         <TextField variant='outlined'
         value={zip}
         onChange={(e)=>{setZip(e.target.value)}}
         className='border-2 p-2 w-full'
          type='text'
          label='Zip'
          name='zip'
          
          />
         </div>
         <div className='bg-[#0d3841] w-full p-2 flex justify-center'>

         <button onClick={submiHandler} className='sm:w-[30%] sm:text-2xl text-black p-2 rounded-md bg-[#75D3E2]' type='submit'>Update</button>
         </div>
       
        </form>
    </div>
    </div>


    </>
  )
}

export default ProfileScreen