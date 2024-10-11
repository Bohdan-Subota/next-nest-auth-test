// components/UpdateUserModal.tsx

"use client"; // This directive is necessary for client-side interactivity

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";

type User = {
  id: string;
  name: string;
  email: string;
  // Add other user fields if necessary
};

type Props = {
  user: User;
};

const UpdateUserModal: React.FC<Props> = ({ user }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ password?: string }>({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setMessage(null);
    setErrors({});
    // Optionally reset password fields
    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear password errors when user starts typing
    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const validateForm = () => {
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ password: "Passwords do not match." });
        return false;
      }

      // Optionally, add more password strength validations here
      if (formData.password.length < 6) {
        setErrors({ password: "Password must be at least 6 characters long." });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setErrors({});

    // Validate form before submission
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const dataToSend: { name: string; email: string; password?: string } = {
      name: formData.name,
      email: formData.email,
    };

    if (formData.password) {
      dataToSend.password = formData.password;
    }


    try {
      const response = await fetch(`${Backend_URL}/user/update/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        // Extract error message from response if available
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user information.");
      }

      const updatedUser = await response.json();
      setMessage("Profile updated successfully.");
      // Optionally, you can refresh the page or update the parent component's state
    } catch (error: any) {
      setMessage(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Edit Profile
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-slate-700 rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              &#10005;
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Password Fields */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Display validation errors */}
              {errors.password && (
                <div className="p-2 rounded bg-red-100 text-red-700">
                  {errors.password}
                </div>
              )}

              {/* Display success or error messages */}
              {message && (
                <div
                  className={`p-2 rounded ${message.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserModal;
