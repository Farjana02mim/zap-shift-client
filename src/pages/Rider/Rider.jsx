import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {

  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();

  // region list
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)];

  // selected region
  const riderRegion = useWatch({
    control,
    name: "region"
  });

  // district filter
  const districtByRegion = (region) => {
    if (!region) return [];

    const regionDistricts = serviceCenters.filter(c => c.region === region);
    return regionDistricts.map(d => d.district);
  };

  // submit
  const handleRiderApplication = async (data) => {
    console.log(data);
    const riderInfo = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      created_at: new Date()
    };

    try {

      const res = await axiosSecure.post("/riders", riderInfo);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your rider request is pending approval"
        });

        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      <h2 className="text-5xl font-bold mb-8">Be A Rider</h2>

      <form onSubmit={handleSubmit(handleRiderApplication)}>

        <div>

          {/* Personal Info */}

          <fieldset className="fieldset">

            <h4 className="text-2xl font-semibold mb-2">Personal Info</h4>

            <label className="label">Name</label>
            <input
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
            />

            <label className="label mt-4">Email</label>
            <input
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
            />

            {/* Region */}

            <label className="label mt-4">Region</label>
            <select {...register("region")} className="select w-full">
              <option disabled selected>
                Pick a region
              </option>

              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* District */}

            <label className="label mt-4">District</label>
            <select {...register("district")} className="select w-full">
              <option disabled selected>
                Pick a district
              </option>

              {districtByRegion(riderRegion).map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className="label mt-4">Address</label>
            <input
              {...register("address")}
              className="input w-full"
              placeholder="Your Address"
            />

            <label className="label mt-4">Phone</label>
            <input
              {...register("phone")}
              className="input w-full"
              placeholder="Phone Number"
            />

          </fieldset>

          <fieldset className="fieldset">

            <label className="label">Driving License</label>
            <input
              {...register("license")}
              className="input w-full"
              placeholder="Driving License"
            />

            <label className="label mt-4">NID</label>
            <input
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
            />

            <label className="label mt-4">Bike Model</label>
            <input
              {...register("bike")}
              className="input w-full"
              placeholder="Bike Model"
            />

          </fieldset>

        </div>

        <input
          type="submit"
          value="Apply as a Rider"
          className="btn btn-primary mt-6 text-black"
        />

      </form>
    </div>
  );
};

export default Rider;