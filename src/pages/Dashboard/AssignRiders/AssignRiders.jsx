import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const AssignRiders = () => {

  const axiosSecure = useAxiosSecure();

  const riderModalRef = useRef()

  const { data: parcels = [] } = useQuery({
    queryKey: ['parcels', 'Pending-pickup'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
      return res.data;
    }
  })

  const openAssignRiderModal = parcel => {
    riderModalRef.current.showModal()
  }

  return (
    <div>
      <h2 className="text-5xl">Assign Riders: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Sender Email</th>
              <th>Cost</th>
              <th>Pickup District</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.senderEmail}</td>
                  <td>{parcel.cost}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.deliveryStatus}</td>
                  <td>
                    <button
                    onClick={()=>openAssignRiderModal(parcel)}
                    className='btn btn-primary text-black'>Assign Riders</button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog ref={riderModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

    </div>
  )
}

export default AssignRiders