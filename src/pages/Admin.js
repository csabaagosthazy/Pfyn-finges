import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <h1>Welcome on admin page {user?.email}</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default AdminPage;
