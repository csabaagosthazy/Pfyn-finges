import { useAuth } from "../context/AuthContext";

const UserPage = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <h1>Welcome on user page {user?.email}</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default UserPage;
