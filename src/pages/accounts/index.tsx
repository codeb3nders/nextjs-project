import { AccountInterface } from "@/interface";
import { useState } from "react";

type AccountFormProps = {
  onSubmit: (account: AccountInterface) => void;
  account?: AccountInterface;
};

const AccountForm = ({ onSubmit, account }: AccountFormProps) => {
  const [formData, setFormData] = useState<AccountInterface>({
    firstName: account?.firstName || "",
    lastName: account?.lastName || "",
    middleName: account?.middleName || "",
    contactNumber: account?.contactNumber || "",
    businessName: account?.businessName || "",
    businessEmail: account?.businessEmail || "",
    businessAddress: account?.businessAddress || "",
    businessContactNumber: account?.businessContactNumber || "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 text-red-400"
        >
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          id="firstName"
          autoComplete="given-name"
          required
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          id="lastName"
          autoComplete="family-name"
          required
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="middleName"
          className="block text-sm font-medium text-gray-700"
        >
          Middle Name
        </label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          id="middleName"
          autoComplete="additional-name"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label
          htmlFor="contactNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number
        </label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          id="contactNumber"
          autoComplete="tel"
          required
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
};

export default AccountForm;
