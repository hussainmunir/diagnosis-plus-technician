import { USER_LOG_OUT, USER_SIGNIN_FAIL, USER_SIGNIN_START, USER_SIGNIN_SUCCESS } from "../Constants/Signin"


 export const SigninReducer=(state={signInfo:[]},action)=>{
    switch(action.type){
        case USER_SIGNIN_START :
            return {loading:true}
            case USER_SIGNIN_SUCCESS:
                return {loading:false,signInfo:action.payload}
                case USER_SIGNIN_FAIL:
                    return {loading:false,error:true,error:action.payload}
                    case USER_LOG_OUT:
                        return {}
                  default:  return  state
    }
}