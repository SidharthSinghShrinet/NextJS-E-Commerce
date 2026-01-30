"use client";
import { addressAction } from "@/libs/actions/Address.Action";
import {
  setAddress,
  setEditAddressDetails,
} from "@/libs/features/addressSlice";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddressForm({ onClose }) {
  const dispatch = useDispatch();
  const editAddressDetails = useSelector(
    (state) => state.address.editAddressDetails,
  );
  console.log("Edit Address Details:", editAddressDetails);
  const isEditing = !!editAddressDetails._id;
  const [state, formAction, isPending] = useActionState(
    addressAction,
    {},
    "/checkout/address",
  );

  useEffect(() => {
    if (state?.success) {
      try {
        dispatch(setAddress(state?.data));
        onClose();
        toast.success(
          editAddressDetails._id
            ? "Address updated successfully"
            : "Address added successfully",
        );
        dispatch(setEditAddressDetails({}));
      } catch (error) {
        console.error(error);
        toast.error("Failed to add address");
      }
    }
  }, [state, dispatch, onClose]);

  return (
    <div className="rounded-lg bg-white pb-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b-1 border-gray-400 px-6 py-3.5">
        <h2 className="text-xl font-bold">
          {editAddressDetails._id ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <div className="h-[60vh] overflow-auto">
        <form action={formAction} className="flex flex-col gap-4 px-6">
          <label className="mb-2 font-semibold text-gray-600">
            Contact Details
          </label>
          <input
            className="rounded border p-2"
            placeholder="Full Name*"
            name="name"
            defaultValue={editAddressDetails.name || ""}
            required
          />
          <input
            className="rounded border p-2"
            placeholder="Phone Number*"
            name="phone"
            defaultValue={editAddressDetails.phone || ""}
            required
          />
          <label className="mb-2 font-semibold text-gray-600">Address</label>
          <input
            className="rounded border p-2"
            placeholder="Full Address*"
            name="address"
            defaultValue={editAddressDetails.address || ""}
            required
          />
          <input
            className="rounded border p-2"
            name="city"
            placeholder="City*"
            defaultValue={editAddressDetails.city || ""}
            required
          />
          <input
            className="rounded border p-2"
            name="state"
            placeholder="State*"
            defaultValue={editAddressDetails.state || ""}
            required
          />
          <input
            className="rounded border p-2"
            name="pincode"
            placeholder="Pincode*"
            defaultValue={editAddressDetails.pincode || ""}
            required
          />
          {isEditing && (
            <input
              type="hidden"
              name="addressId"
              value={editAddressDetails._id}
            />
          )}
          <label className="mb-2 font-semibold text-gray-600">
            Address Type
          </label>
          <select
            name="addressType"
            className="rounded border p-2"
            defaultValue={editAddressDetails.addressType || ""}
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
          <div className="flex items-center rounded border-[1px] p-4">
            <input
              id="default-address"
              type="checkbox"
              name="isDefault"
              defaultChecked={editAddressDetails.isDefault || false}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="default-address"
              className="ml-3 cursor-pointer text-sm font-medium text-gray-900"
            >
              Set as default shipping address
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded bg-gray-200 py-2 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded bg-blue-600 py-2 font-semibold text-white"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
