export default function AddressForm({ onClose }) {
  return (
    <div className="rounded-lg bg-white pb-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b-1 border-gray-400 px-6 py-3.5">
        <h2 className="text-xl font-bold">ADD NEW ADDRESS</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <div className="h-[60vh] overflow-auto">
        <form className="flex flex-col gap-4 px-6">
          <label className="mb-2 font-semibold text-gray-600">
            Contact Details
          </label>
          <input
            className="rounded border p-2"
            placeholder="Full Name*"
            required
          />
          <input
            className="rounded border p-2"
            placeholder="Phone Number*"
            required
          />
          <label className="mb-2 font-semibold text-gray-600">Address</label>
          <input
            className="rounded border p-2"
            placeholder="Full Address*"
            required
          />
          <input className="rounded border p-2" placeholder="City*" required />
          <input className="rounded border p-2" placeholder="State*" required />
          <input
            className="rounded border p-2"
            placeholder="Pincode*"
            required
          />
          <label className="mb-2 font-semibold text-gray-600">
            Address Type
          </label>
          <select className="rounded border p-2">
            <option value="Homw">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
          <div className="flex items-center rounded border-[1px] p-4">
            <input
              id="default-address"
              type="checkbox"
              // onChange={(e) => setIsDefault(e.target.checked)}
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
