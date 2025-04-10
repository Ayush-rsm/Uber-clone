import React, { useState } from "react"
import { Link } from "react-router-dom"
import  { CaptainDataContext } from "../context/CaptainContext"
import { useNavigate } from "react-router-dom"
import axios, { Axios } from "axios"

const CaptainSignup = () => {

  const navigate = useNavigate()

   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [userData, setUserData] = useState('')

   const [vehicleColor, setVehicleColor] = useState('')
   const [vehiclePlate, setVehiclePlate] = useState('')
   const [vehicleCapacity, setVehicleCapacity] = useState('')
   const [vehicleType, setVehicleType] = useState('')
   
   const { captain, setCaptain } = React.useContext(CaptainDataContext)
  
    const submitHandler = async (e)=>{
      e.preventDefault();
   
      const captainData =  {
        fullname:{
          firstname:firstName,
          lastname: lastName
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
      
      if(response.status===201){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }

      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
     
      
    }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-20 mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"  />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }}>

      <h3 className='text-lg font-medium mb-2 '>What's your Name?</h3>
      <div className='flex gap-4 mb-6 '>
        <input 
        required 
        className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-base placeholder:text-base'
        type="text" 
        placeholder='First Name'
        value={firstName}
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}

        />

        <input 
        required
        className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-base placeholder:text-base'
        type="text"
        placeholder='Last Name'
        value={lastName}
        onChange={(e)=>{
          setLastName(e.target.value)
        }}
        />
      </div>

      <h3 className='text-lg font-medium mb-2'>What's your Email?</h3>
      
      <input 
      required
     
      className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base' 
      type="email" 
      placeholder='email@example.com'
      value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
         }} />
      
      <h3  className='text-base font-medium mb-2'>Enter Passwrod</h3>
      
      <input 
      required
      className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base'  
      
      type="password" 
      placeholder='password'
      value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
         }}  />

<h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

      <button  className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base' >Create Captain Account</button>
    
    <p className='text-center'>Already have a account?
    <Link to='/captain-login' className=' text-blue-600'>Login here</Link>
    </p>
    </form>
    </div>
    <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and Terms of Service apply</p>
    </div>
  </div>
  )
}

export default CaptainSignup