import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import Forecasts from "./Forecasts";
import Itinerary from "./Itinerary";
import { initializeApp } from "@firebase/app";
import { getDatabase, ref, onValue } from "@firebase/database";
import Cruise from "./Cruise";

const firebaseConfig = {
  apiKey: "AIzaSyDocCZk4l2bFtL7IyS1n7asKI9wMFoCA-g",
  authDomain: "my-ship-is-bananas.firebaseapp.com",
  databaseURL: "https://my-ship-is-bananas-default-rtdb.firebaseio.com",
  projectId: "my-ship-is-bananas",
  storageBucket: "my-ship-is-bananas.appspot.com",
  messagingSenderId: "173718188281",
  appId: "1:173718188281:web:cf8f53745ec47d4429f228",
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const db = getDatabase(app);

    const myRef = ref(db, "cruiseLine");

    onValue(myRef, (snapshot) => {
      const result = []
      for (let key in snapshot.val()) {
        const cruise = {...snapshot.val()[key], cruiseLine: key};
        result.push(cruise)
      }
      setData(result);
      // console.log(snapshot.val())
    });
  }, []);
  // const cruiseElements = [];
  // for ()
  const cruiseElements = data?.map((cruise, index) => {
    return <Cruise key={index} cruise={cruise} />
  })
  return (
    <div className='App'>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {cruiseElements}
      {/* {data.map((ea) => (
        <div>
          <div>{ea.cruiseLine}</div>
          <div>{ea.ships}</div>
          <div>{ea.departureDate}</div>
          <ol>
            {ea.itinerary.map((itinerary) => (
              <li>{itinerary}</li>
            ))}
          </ol>
        </div>
      ))} */}
      <form
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   setCruiseLine(e.target.elements.cruiseLine.value);
        //   setShips(e.target.elements.ships.value);
        //   setDepartureDate(e.target.elements.departureDate.value);
        // }}
      >
        <input type='text' name='cruiseLine' placeholder='Enter Cruise Line' />
        <input type='text' name='ships' placeholder='Enter Ship Name' />
        <input
          type='text'
          name='departureDate'
          placeholder='Enter Departure Date'
        />
        <button type='submit'>Submit</button>
      </form>

      {/* <ul>
        Itinerary ? (
          {Object.keys().map((key) => {
            const { location, arrivalTime } = Itinerary[key];
            // console.log(itinerary[key]["Cruise"]);
            return(
              <li key={key}>
                <p>Date: </p>
                <p>City: {location}</p>
                <p>Arrival Time: {arrivalTime}</p>
              </li>)
             })
            })
      </ul> */}
      <p>
        Enter a cruise line, ship name, and departure date to see the itinerary
        information
      </p>
      {/* <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>  */}
      {/* <Itinerary />  */}
      <Forecasts />
      <Weather />
    </div>
  );
}
