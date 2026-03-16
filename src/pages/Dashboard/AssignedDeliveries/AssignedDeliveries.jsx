import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const AssignedDeliveries = () => {

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`
      )
      return res.data
    }
  })


  // Update Delivery Status
  const handleDeliveryStatusUpdate = async (parcel, status) => {

    try {

      const res = await axiosSecure.patch(
        `/parcels/${parcel._id}/status`,
        { deliveryStatus: status }
      )

      if (res.data.modifiedCount) {

        refetch()

        Swal.fire({
          icon: "success",
          title: `Status Updated`,
          text: `Parcel status changed to ${status}`,
          timer: 2000,
          showConfirmButton: false
        })

      }

    } catch (error) {
      console.error(error)
    }

  }


  // Reject Delivery
  const handleRejectDelivery = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this delivery!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject"
    }).then(async (result) => {

      if (result.isConfirmed) {

        const res = await axiosSecure.patch(`/parcels/${id}`, {
          deliveryStatus: "rejected"
        })

        if (res.data.modifiedCount) {

          refetch()

          Swal.fire({
            icon: "success",
            title: "Delivery Rejected",
            timer: 1500,
            showConfirmButton: false
          })
        }
      }

    })

  }



  return (
    <div>

      <h2 className="text-4xl mb-6 font-semibold">
        Assigned Parcels: {parcels.length}
      </h2>

      <div className="overflow-x-auto">

        <table className="table table-zebra">

          <thead>
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {parcels.length === 0 &&
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No Assigned Parcels
                </td>
              </tr>
            }

            {
              parcels.map((parcel, index) => (

                <tr key={parcel._id}>

                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>

                  <td>
                    <span className="badge badge-info">
                      {parcel.deliveryStatus}
                    </span>
                  </td>

                  <td className="space-x-2">

                    {parcel.deliveryStatus === 'driver_assigned' && (
                      <>
                        <button
                          onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                          className="btn btn-primary btn-sm text-black"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleRejectDelivery(parcel._id)}
                          className="btn btn-warning btn-sm text-black"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {parcel.deliveryStatus === 'rider_arriving' && (
                      <button
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                        className="btn btn-info btn-sm text-black"
                      >
                        Mark as Picked Up
                      </button>
                    )}

                    {parcel.deliveryStatus === 'parcel_picked_up' && (
                      <button
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                        className="btn btn-success btn-sm text-black"
                      >
                        Mark as Delivered
                      </button>
                    )}

                    {parcel.deliveryStatus === 'parcel_delivered' &&
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    }

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default AssignedDeliveries