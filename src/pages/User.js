import {useAuth} from "../context/AuthContext";
import {getGPXAsString, getPoisByUser, getUserParams} from "../services/dbService";
import MapView from "../components/MapView";
import {useCallback, useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";


const UserPage = () => {
    const {user, signOut} = useAuth();
    const [gpxHistory, setgpxHistory] = useState();
    const [gpx, setgpx] = useState();
    const [pois, setPois] = useState();

    const GpxToDisplay = useCallback(async () => {
        let history = await getGPXAsString(user);
        setgpxHistory(history);
        setgpx(history[history.length-1]);
        let poisList = await getPoisByUser(user);
        setPois(poisList);
    }, [])

    useEffect(() => {
        GpxToDisplay();
    }, [])

    function handleClick(event) {
        event.preventDefault();
        console.log("gpx User", event.target.name);
        setgpx(event.target.name);
    }

    if (!gpx || !pois)
        return <p>"Loading"</p>;
    else
    return (
        <>
            <h1>Welcome on user page {user?.email}</h1>
            <button onClick={() => signOut()}>Sign out</button>
            <h2>{gpx} is being displayed</h2>
            <MapView pois={pois} gpx={gpx}/>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    History
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {gpxHistory.map((jesus, index) =>
                        <Dropdown.Item name={jesus} onClick={(event) => handleClick(event)}
                                       key={index}>{jesus}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default UserPage;
