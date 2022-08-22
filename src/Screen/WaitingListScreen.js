import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseURL } from '../Api/BaseUrl';
const WaitingListScreen = () => {
    const technician = useSelector(store => store.technician);
    const { signInfo } = technician;
    const token = signInfo.token;
    const comp = signInfo.companyName;
    const [file, setFile] = useState([]);
    const [pdfile, setPdFile] = useState([]);
    const [LabsData, setLabsData] = useState({});
    const [fileObj, setFileObject] = useState([]);
    var [fileArray, setFileArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [pro, gress] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [pdf, setpdf] = useState(false);
    const [progress, setProgress] = useState('');
    const [ids, setids] = useState('');
    const [patient, setpatient] = useState();
    const [waitingList, setWaitingList] = useState([]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 160,
        bgcolor: 'white',
        border: '1 px solid #000',
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };



    if (file.length > 0) {
        fileObj.splice(0, fileObj.length);
        fileArray.splice(0, fileArray.length);
        fileObj.splice(0, fileObj.length)
        fileArray.splice(0, fileArray.length)
        fileObj.push(file);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
        }
    }
    const GetWait = (wait) => {
        setOpen(!open)
        setLabsData(wait)

    }

    useEffect(() => {
        const getWaitingList = async () => {
            const { data } = await axios.get(`${baseURL}/api/v1/technician/getPatientLabsCompany/${comp}`, {
                headers: {
                    authorization: token,
                    'Access-Control-Allow-Origin':true,
                }
            })
            setWaitingList(data.data)
        }
        getWaitingList();
    }, [refresh])




    const handleChange = (event) => {
        setProgress(event.target.value);

    };



    const updateLab = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        if (file.length > 0) {
            for (var i = 0; i < file.length; i++) {
                formData.append("photos", file[i])
            }
        }

        if (pdfile.length > 0) {
            for (var i = 0; i < pdfile.length; i++) {
                formData.append("pdf", pdfile[i])
            }
        }

        formData.append('companyName', LabsData.companyName);
        formData.append('description', LabsData.description);
        formData.append('doctorId', LabsData.doctorId);
        formData.append('name', LabsData.name);
        formData.append('patientId', LabsData.patientId);
        formData.append('progress', progress);
        try {
            const { data } = await axios.patch(`${baseURL}/api/v1/technician/updatePatientLabs/` + LabsData._id, formData,
                {
                    headers: {
                        authorization: token,

                        accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            alert("Patients Lab Succefully Updated")
            setOpen(!open);
            setRefresh(!refresh)

        } catch (err) {
            console.log(err)
        }
    }

    const UpdateProgress = async () => {
        try {
            const { data } = await axios.put(`${baseURL}/api/v1/technician/updatePatientLabProgress/` + LabsData._id,
                {
                    progress: progress,
                    patientID: LabsData.patientId
                }, {
                headers: {
                    authorization: token
                }
            }
            )
            gress(!pro)
            setRefresh(!refresh)

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='w-full min-h-screen  space-y-5 bg-[#0d3841]  '>
            <div className='w-full h-20 bg-[#76d3e2] text-white flex justify-center items-center space-x-5 '>
                <Link className=' text-lg font-mono font-bold  text-black' to='/profile'>Profile</Link>
                <Link className='text-lg font-mono font-bold  text-black ' to='/'>Dashboard</Link>
            </div>
            <div className='w-full flex flex-col justify-center  items-center h-full gap-5' >

                <h1 className='text-3xl sm:w-[50%] w-full text-center bg-[#76d3e2] p-2 rounded-lg  text-black '>Waiting List   </h1>

                {waitingList.map((wait) => (
                    <div key={wait._id} className='w-full flex justify-center  flex-col  items-center space-y-6'>
                        <div className='sm:w-[50%]  sm:p-5 p-3 bg-[#76d3e2] rounded-lg shadow-lg w-full'>

                            <div className='flex justify-between border-b-2 border-black pb-2'>
                                <h1 className='font-bold'>Lab Name: </h1>

                                <h1
                                    className='font-serif '> {wait.name} </h1>

                            </div>
                            <div className='flex justify-between border-b-2 border-black pb-2'>
                                <h1 className='font-bold'>Patient Name: </h1>
                                <h1 className='font-serif'> Jawad Ahmad </h1>
                            </div>


                            <div className='flex justify-between border-b-2 border-black pb-2'>
                                <h1 className='font-bold'>Description: </h1>
                                <h1 className='font-serif'> {wait.description} </h1>
                            </div>
                            <div className='flex justify-between border-b-2 border-black pb-2'>
                                <h1 className='font-bold'>By Designation: </h1>
                                <h1 className='font-serif'> {wait.byDesignation} </h1>
                            </div>
                            <div className='flex justify-between border-b-2 border-black pb-2'>
                                <h1 className='font-bold'>Progress: </h1>
                                <h1

                                    className='font-serif '> {wait.progress} </h1>
                            </div>
                            <div className='flex justify-between border-b-2 border-black pb-2'>
                                <h1 className='font-bold'>Date: </h1>
                                <h1 className='font-serif'> {wait.date} </h1>
                            </div>

                            <div className='w-full flex justify-center items-center h-[4rem] border-t-2 border-black  '>
                                <button onClick={() => { GetWait(wait) }} className='px-12 py-2 bg-[#0d3841]  rounded-xl text-white outline-none' type='button'>View</button>
                            </div>
                            {open && wait._id == LabsData._id ?

                                <div className=''>
                                    {!pro &&

                                        <button onClick={() => gress(!pro)} className=' mb-2 rounded-md text-white p-2 bg-[#0d3841]'>Update Progress</button>
                                    }

                                    {
                                        pro && <div className='w-full'>

                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Progress</InputLabel>
                                                <Select
                                                    inputProps={{
                                                        name: 'selectedService',
                                                    }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={progress}
                                                    label="Progress"
                                                    onChange={handleChange}

                                                >
                                                    <MenuItem value={'in progress'}>In Progress</MenuItem>
                                                    <MenuItem value={'pending'}>Pending</MenuItem>
                                                    <MenuItem value={'completed'}>Completed</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <button type='submit' onClick={UpdateProgress} className='w-full bg-[#0d3841] text-white p-2 mt-2'>Update Progress</button>

                                        </div>}
                                    <div>

                                        <form className='w-full   flex justify-between items-center p-2 mt-10 '>
                                            <div className='w-[55%]  h-[3.2rem] text-center   flex items-center'>
                                                <label htmlFor='files' className=' h-full pt-3 text-md   
                                                 cursor-pointer text-white bg-[#0d3841] rounded-md font-serif '>Upload Images</label>
                                                  <input type='file' onChange={(e) => setFile(e.target.files)} id='files' multiple style={{ display: 'none' }} />
                                            </div>
                                            <div>
                                                <TextField type='file' onChange={(e) => setPdFile(e.target.files)} multiple variant='outlined' />
                                            </div>

                                        </form>
                                    </div>

                                    <div className="flex flex-row flex-wrap w-full">

                                        {fileArray.map((url) => (
                                            <img
                                                style={{ width: "130px", height: "70px" }}
                                                src={url}
                                                alt="..."
                                                key={url}
                                                className="p-1 border-2 border-sky-500 mx-2 my-2"
                                            />
                                        ))}
                                    </div>
                                    <button type='submit' onClick={updateLab} className='w-full bg-[#0d3841] text-white font-serif p-2'>Update WaitingList</button>
                                </div>

                                : ""}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default WaitingListScreen