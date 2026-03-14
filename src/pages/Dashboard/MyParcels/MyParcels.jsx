import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FiEdit } from 'react-icons/fi'
import { FaSearch, FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link } from 'react-router'

const MyParcels = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  // load parcels
  const { data: parcels = [], refetch, isLoading } = useQuery({
    queryKey: ['my-parcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      return res.data
    },
  })

  // delete parcel
  const handleParcelDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch()
            Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success')
          }
        })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Tracking Id</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>

              <td>{parcel.parcelName}</td>

              <td>${parcel.cost}</td>
              

              {/* PAYMENT STATUS */}
              <td>
                {parcel.paymentStatus === 'paid' ? (
                  <span className="text-green-500 font-semibold">Paid</span>
                ) : (
                  <Link to={`/dashboard/payment/${parcel._id}`}>
                    <button className="btn btn-primary btn-sm text-black">
                      Pay
                    </button>
                  </Link>
                )}
              </td>

              <td>${parcel.trackingId}</td>

              {/* DELIVERY STATUS */}
              <td>
                {parcel.deliveryStatus ? (
                  parcel.deliveryStatus
                ) : (
                  <span className="text-gray-400">Pending</span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="flex gap-2">
                <button className="btn btn-square btn-sm hover:bg-primary">
                  <FaSearch />
                </button>

                <button
                  disabled={parcel.paymentStatus === 'paid'}
                  className="btn btn-square btn-sm hover:bg-primary disabled:opacity-40"
                >
                  <FiEdit />
                </button>

                <button
                  disabled={parcel.paymentStatus === 'paid'}
                  onClick={() => handleParcelDelete(parcel._id)}
                  className="btn btn-square btn-sm hover:bg-primary disabled:opacity-40"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyParcels