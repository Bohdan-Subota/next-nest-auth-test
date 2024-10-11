// app/profile/page.tsx

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import UpdateUserModal from "@/components/UpdateUserModal";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (!session) {
    return <div>Error: User not authenticated.</div>;
  }

  // Make sure the session includes the necessary information, like tokens or user ID
  const accessToken = session.backendTokens?.accessToken || null;

  if (!accessToken) {
    return <div>Error: No valid access token found.</div>;
  }

  // Fetch user data from the backend
  const response = await fetch(`${Backend_URL}/user/${props.params.id}`, {
    method: "GET",
    credentials: "include", // Ensures cookies are included in the request
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`, // Include the access token from the session
    },
  });

  if (!response.ok) {
    // Handle error (e.g., user not found, or unauthorized)
    return <div>Error fetching user data: {response.statusText}</div>;
  }

  const user = await response.json();

  return (
    <div className="max-w-md mx-auto mt-6 border border-slate-200 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-center">
        <h1 className="text-lg font-semibold">User Profile</h1>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-medium">Name:</span>
          <span className="font-semibold">{user.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium">Email:</span>
          <span className="font-semibold">{user.email}</span>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 flex justify-center">
          <UpdateUserModal user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
