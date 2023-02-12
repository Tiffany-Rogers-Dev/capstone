import "./Activities.css";
import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

export default function Activities() {
  const [data, setData] = useState(["Loading..."]);
  const [name, setName] = useState();
  useEffect(() => {
    // Need to use key and secret to request an "access token"
    // https://developers.amadeus.com/self-service/apis-docs/guides/authorization-262
    // You can register an app for the key and secret here:
    // https://developers.amadeus.com/my-apps
    const formBody = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "3WcAGqAruwkq1khAw2DTT9p4ZomB5Y57",
      client_secret: "7fQ2RFBqxpPCvtig",
    });

    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      // Raw response is JSON so we have to transform it into the right format with d.json()
      .then((response) => response.json())
      .then((json) => {
        fetch(
          `https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=3`,
          { headers: { Authorization: `Bearer ${json.access_token}` } }
        )
          .then((response) => response.json())
          .then((json) => {
            setData(json.data);
            // setData(JSON.stringify(json, null, 2))
          });
      });
    return () => {};
  }, []);

  const testFunction = () => {
    const mappedData = data;
    mappedData.map((data) => {
      return <p>{JSON.stringify(data.name)}</p>;
    });
  };

  return (
    <div className='Activities'>
      {data.map((data) => {
        console.log(data);
        return (
          <div key={data.id}>
            <h3>{JSON.stringify(data.name)}</h3>
            <h4>{ReactHtmlParser(data.shortDescription)}</h4>
          </div>
        );
      })}
    </div>
  );
}
