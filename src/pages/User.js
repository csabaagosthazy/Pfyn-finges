import {useAuth} from "../context/AuthContext";
import {getGPXAsString, getUserParams} from "../services/dbService";
import MapView from "../components/MapView";
import {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";


const UserPage = () => {
    const {user, signOut} = useAuth();
    const [gpxHistory, setgpxHistory] = useState();

    useEffect(async () => {
        let history = await getGPXAsString(user);
        setgpxHistory(history);
        console.log(getUserParams((user)));
    }, [])

    function handleClick(event) {
        event.preventDefault();
        console.log(event.target.name);
    }

    if (!gpxHistory) return <p>"Loading"</p>

    return (
        <>
            <h1>Welcome on user page {user?.email}</h1>
            <button onClick={() => signOut()}>Sign out</button>
            <MapView/>

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
