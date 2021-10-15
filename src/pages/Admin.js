import { useAuth } from "../context/AuthContext";
import AddPoi from "../components/AddPoi";
import MapView from "../components/MapView";

const AdminPage = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <h1>Welcome on admin page {user?.email}</h1>
        <AddPoi/>
        <MapView/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default AdminPage;
