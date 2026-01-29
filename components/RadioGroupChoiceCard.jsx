import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { FiEdit } from "react-icons/fi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setAddress, setSelectedAddress } from "@/libs/features/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
export function RadioGroupChoiceCard() {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  // console.log("Selected Address:", selectedAddress);
  const address = useSelector((state) => state.address.address);
  // console.log("Address is printed from the Radio Group:", address);
  function handleEdit(addressId) {
    console.log("Edit address:", addressId);
  }
  async function handleDelete(addressId) {
    const response = await fetch("http://localhost:3000/api/address/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addressId }),
    });
    const { data } = await response.json();
    dispatch(setAddress(data));
  }
  return (
    <>
      <RadioGroup
        defaultValue={selectedAddress}
        className="h-fit w-full bg-white shadow-2xs"
      >
        {address.length === 0 ? (
          <p>Loading...</p>
        ) : (
          address.map((addressItem, idx) => (
            <FieldLabel key={idx} htmlFor={addressItem._id}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{addressItem.name}</span>
                      <span className="rounded-xs bg-gray-100 p-1 text-gray-500">
                        {addressItem.addressType}
                      </span>
                      <span>{addressItem.phone}</span>
                    </div>
                  </FieldTitle>
                  <FieldDescription>
                    {addressItem.address}, {addressItem.city},{" "}
                    {addressItem.state}, India - {addressItem.pincode}
                  </FieldDescription>
                  <FieldDescription>
                    <span className="flex gap-2.5">
                      <FiEdit
                        size={17.5}
                        onClick={() => handleEdit(addressItem._id)}
                        className="text-blue-600"
                      />
                      <MdDeleteOutline
                        onClick={() => handleDelete(addressItem._id)}
                        size={20.5}
                        className="text-red-500"
                      />
                      {/* <button className="font-bold text-blue-500">Edit</button>
                      <button className="font-bold text-red-500">Delete</button> */}
                    </span>
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value={addressItem._id}
                  id={addressItem._id}
                  onClick={() => dispatch(setSelectedAddress(addressItem._id))}
                />
              </Field>
            </FieldLabel>
          ))
        )}
      </RadioGroup>
    </>
  );
}
