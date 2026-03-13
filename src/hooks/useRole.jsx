import { useQuery } from '@tanstack/react-query'; // ✅ add this
import { useEffect, useState } from "react"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useRole = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  
  const { isLoading, data: role = 'user' } = useQuery({  // removed roleLoading (not standard)
    queryKey: ['user-role', user?.email], // fixed typo: quryKey -> queryKey
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || 'user';
    },
    enabled: !!user?.email // ✅ only run query if user email exists
  })

  return { role, isLoading }
}

export default useRole