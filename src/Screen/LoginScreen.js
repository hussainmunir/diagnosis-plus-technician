import { CircularProgress, TextField } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SignIn } from '../Redux/Actions/SigninAction';
const LoginScreen = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is Required'),
        password: Yup.string().required('password is Required'),
    })
    const {loading,error}=useSelector(store=>store.technician)
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={async(values) => {
                    dispatch(SignIn(values,navigate));
                }} >

                {(formik) => (
                    <div className='h-screen w-full flex items-center justify-center bg-[#0d3841]  px-2 '>
                         <div className='  flex  flex-col justify-center items-center sm:w-[80%] lg:w-[50%]  w-full p-5 pb-10 rounded-lg bg-[#76d3e2]' >
                        {/* <h1 className='text-center text-2xl p-2 bg-[#753941] text-white w-[50%] mb-4 '>SignIn Form</h1> */}
                        <h1 className='text-3xl text-black mb-4 '> {error? <h1 className='text-sm text-red-500 font-serif'> Check your email and password </h1>:" Sign In Screen" } </h1>
                            <Form className='flex flex-col w-[100%] justify-center items-center gap-3 '>
                                <TextField  className='w-full sm:p-3 mb-2 p-2 border-2 rounded-md'
                                  type='email' value={formik.email}
                                    label="Email"
                                    onChange={formik.handleChange}
                                    name='email' placeholder="example@email.com"
                                     />
                                     <ErrorMessage component='div' name='email' className='text-red-700 text-sm' />
                                      <TextField className='w-full mt-5 sm:p-3 p-2 border-2 '
                                    type='password' value={formik.password}
                                    label="Password"
                                    onChange={formik.handleChange}
                                    name='password' placeholder=""
                                     />
                                     <ErrorMessage component='div' name='password' className='text-red-700 text-sm' />
                                     <div className='bg-[#0d3841] w-full text-black'>

                                     <button type='submit'
                                     className='w-full  rounded  p-2 font-serif  text-white text-3xl '
                                     > {loading? <CircularProgress color="secondary" />: "Sign In"   }  </button>
                                     </div>

                            </Form>
                        </div>
                    </div>
                )}
            </Formik>

        </>
    )
}

export default LoginScreen