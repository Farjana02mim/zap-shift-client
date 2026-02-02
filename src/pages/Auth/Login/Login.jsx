import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { TbFidgetSpinner } from "react-icons/tb"
import toast from "react-hot-toast"
import useAuth from "../../../hooks/useAuth"
import SocialLogin from "../SocialLogin/SocialLogin"

const Login = () => {
  const { signInUser, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = async (data) => {
    const { email, password } = data
    try {
      await signInUser(email, password)
      toast.success("Login Successful 🎉")
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto text-xl" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium hover:underline">
            Register
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  )
}

export default Login
