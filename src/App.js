import DashBoard from "./Screen/DashBoard"
import LoginScreen from "./Screen/LoginScreen"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProfileScreen from "./Screen/ProfileScreen"
import WaitingListScreen from "./Screen/WaitingListScreen"
import { useSelector } from "react-redux"

const App = () => {
const technician=useSelector(store=>store.technician);
const {signInfo}=technician;
  return (
    <div>

      <Router>
        <Routes>
        <Route exact path='/' element=  {
          signInfo?
        <DashBoard/>
        :<LoginScreen/>} />
        <Route exact path='/login' element={<LoginScreen/>}/>
        { <Route exact path='/profile' element={
          signInfo?
        <ProfileScreen/>
        :<LoginScreen/>
        
        }/>}
        <Route exact path='/waitingList' element={
            signInfo?
          <WaitingListScreen/>
          :<LoginScreen/> 
          }/>
        </Routes>


      </Router>
    </div>
  )
}

export default App