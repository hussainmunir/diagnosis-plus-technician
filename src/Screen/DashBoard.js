import {useNavigate} from 'react-router-dom'
import { logout } from '../Redux/Actions/SigninAction';
import { useDispatch } from 'react-redux';
const DashBoard = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const Logout=()=>{
    dispatch(logout(navigate))
  }
  return (
    <div className='min-h-[100vh] w-full bg-[#0d3841]    '>
      <div className=' h-full w-full  '>
        <h1 className='text-3xl text-bold text-center text-black p-4 bg-[#76d3e2] font-serif'>Dashboard</h1>
       <div className=' w-full h-full flex justify-center items-start '>
        <div className='bg-[#75D3E2] md:w-[50%] w-[90%] h-[98vh] shadow-lg rounded-2xl mt-5 gap-5 p-4 flex flex-col justify-around items-center '>
        <button 
          onClick={()=>navigate('/profile')}
          className='bg-[#0d3841] py-3 px-5 w-[13rem] rounded-3xl text-2xl text-white font-serif'
          >Profile
          </button>

          <button 
          onClick={()=>navigate('/waitingList')}
          className='bg-[#0d3841] py-3 px-5 w-[13rem] rounded-3xl text-2xl text-white font-serif'
          >Waiting List
          </button>
          <button 
          onClick={Logout}
          className='bg-[#0d3841] py-3 px-5 w-[13rem] rounded-3xl text-2xl text-white font-serif'
          >Logout
          </button>
        </div>

       </div>
      
      
    </div>
    </div>
  )
}

export default DashBoard