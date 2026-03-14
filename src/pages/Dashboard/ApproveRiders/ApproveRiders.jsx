import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTimesCircle, FaTrash, FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch riders
  const { data: riders = [], refetch } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    }
  });

  // Update rider status
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status:status, email: rider.email }; // use the status parameter
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            title: `Rider status set to ${status}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text: err.response?.data?.message || err.message,
        });
      });
  }

  const handleApproval = rider => updateRiderStatus(rider, 'approved');
  const handleRejection = rider => updateRiderStatus(rider, 'rejected');

  return (
    <div>
      <h2 className='text-5xl mb-6'>Riders Pending Approval: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <p className={
                    rider.status === 'approved' ? 'text-green-800 font-bold' :
                    rider.status === 'rejected' ? 'text-red-600 font-bold' :
                    'text-yellow-700 font-bold'
                  }>
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td className='flex gap-2'>
                  <button
                    onClick={() => handleApproval(rider)}
                    className='btn btn-success'
                    disabled={rider.status === 'approved'}
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className='btn btn-warning'
                    disabled={rider.status === 'rejected'}
                  >
                    <FaTimesCircle />
                  </button>
                  <button className='btn btn-error'>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;