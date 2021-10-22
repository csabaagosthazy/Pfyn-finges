import {useAuth} from "../context/AuthContext";
import {getGPXAsString, getPoisByUser, getUserParams} from "../services/dbService";
import MapView from "../components/MapView";
import {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";


const UserPage = () => {
    const {user, signOut} = useAuth();
    const [gpxHistory, setgpxHistory] = useState();
    const [gpx, setgpx] = useState();
    const [pois, setPois] = useState([]);



    useEffect(async () => {
        let history = await getGPXAsString(user);
        setgpxHistory(history);
        console.log(getUserParams((user)));
        console.log(user);
        let poisList = await getPoisByUser(user)
        setPois(poisList);
    }, [gpx])

    function handleClick(event) {
        event.preventDefault();
        console.log("gpx User", event.target.name);
        setgpx(event.target.name);
    }

    if (!gpxHistory) return <p>"Loading"</p>

    return (
        <>
            <h1>Welcome on user page {user?.email}</h1>
            <button onClick={() => signOut()}>Sign out</button>
            <MapView pois = {pois} gpx = {gpx}/>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    History
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {gpxHistory.map((jesus, index) =>
                        <Dropdown.Item name={jesus} onClick={(event) => handleClick(event)} key={index}>{jesus}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default UserPage;
