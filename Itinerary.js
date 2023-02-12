// import React, { useState, useEffect } from "react";


// const Itinerary = () => {
//   const [cruiseLine, setCruiseLine] = useState("");
//   const [shipName, setShipName] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [itinerary, setItinerary] = useState([]);

  // useEffect(() => {
    // async function fetchData() {
  //     // if (cruiseLine && shipName && departureDate) {
  //     const db = getDatabase();
  //     const ItineraryRef = ref(
  //       db,
  //       `itinerary/${cruiseLine}/${shipName}/${departureDate}`
  //     );
  //     once(ItineraryRef, (snapshot) => {
  //       const data = snapshot.val();
  //       setItinerary(data);
  //     });
  //     //   const Snapshot = await ref.once('value');
  //   }
  //   console.log("fetching");
  //   // }

    // fetchData();
  // }, [cruiseLine, shipName, departureDate]);

//   return (
//     <div>
      
//     </div>
//   );
// };

// export default Itinerary;
