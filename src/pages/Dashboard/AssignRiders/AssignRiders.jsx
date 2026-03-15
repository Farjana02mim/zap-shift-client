import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  // parcels query
  const {
    data: parcels = [],
    refetch: parcelsRefetch,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  //todo: invalidate query after assigning a rider

  // riders query
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  // open modal
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = rider => {
    const riderAssignInfo = {
      riderId : rider._id,
      riderEmail: rider.email,
      riderEmail: rider.name,
      parcelId: selectedParcel._id
    }
    axiosSecure.patch(`/parcels/${selectedParcel._id}`,riderAssignInfo)
    .then(res =>{
      if (res.data.modifiedCount) {

                riderModalRef.current.close();
                parcelsRefetch();
                Swal.fire({
                  position: "top-end",
                  title: `Rider has been assigned`,
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false
                });
              }
    })
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">
        Assign Riders: {parcels.length}
      </h2>

      {/* Parcel Table */}
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
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderEmail}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.deliveryStatus}</td>

                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary btn-sm text-black"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Modal */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">

          <h3 className="font-bold text-lg mb-4">
            Available Riders: {riders.length}
          </h3>

          <div className="space-y-3">

            {riders.map((rider) => (
              <div
                key={rider._id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{rider.name}</p>
                  <p className="text-sm text-gray-500">{rider.email}</p>
                  <p className="text-sm">{rider.district}</p>
                </div>

                <button
                onClick={()=> handleAssignRider(rider)}
                className="btn btn-primary btn-sm">
                  Assign
                </button>
              </div>
            ))}

            {riders.length === 0 && (
              <p className="text-center text-gray-500">
                No available riders in this district
              </p>
            )}

          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>

        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;