import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom'
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser , updateUserProfile} = useAuth();

  const location=useLocation();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();


    //console.log('location in register',location);

  const handleRegistration = (data) => {
    //console.log(data.photo[0]);
    const profileImg = data.photo[0];
    
    registerUser(data.email, data.password)
      .then(result=>{
      //console.log(result.user);
      alert("Registration Successful 🎉");

      //store the image and get the photo url 
      const formData = new FormData();
    formData.append("image", profileImg);
      const image_API_URL= `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
    axios.post(image_API_URL,formData).then(res=>{

      const photoURL = res.data.data.url;

      // create user in the database

      const userInfo = {
        email: data.email,
        displayName: data.displayName,
        photoURL: photoURL

      }

      axiosSecure.post('/users', userInfo)
      .then(res=>{
        if(res.data.insertedId){
          console.log('user created in the database');
        }
      })


      //update user profile
      const userProfile={
        displayName: data.name,
        photoURL: photoURL
      }
      updateUserProfile(userProfile)
      .then(()=>{
        console.log('user profile updated done');
        navigate(location.state || '/');
      })
      .catch(error=>console.log(error))
    })
      
    }).catch (error=> {
      console.log(error);
      alert(error.message || "Registration failed");
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Register to get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

          {/* Image */}
          <div>
            <label className="label font-medium">Photo</label><br />
            <input
              type="file"
              placeholder="Enter your photo"
              className="file-input"
              {...register('photo', { required: "Photo is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              {...register('name', { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register('email', { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register('password', {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
                  message: "Password must contain uppercase, lowercase, number & special character"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-full mt-2 text-lg">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link state={location.state} to="/login" className="text-blue-500 font-medium hover:underline">
            Login
          </Link>
        </p>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  )
}

export default Register
