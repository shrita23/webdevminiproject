import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/cards";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a request for a user with a given ID
    if (!data) {
      axios
        .get("http://localhost:4000/samples")
        .then(function (response) {
          // handle success
          setData(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  });

  if (!data) {
    return <h1 className="text-center text-3xl mt-5">Loading...</h1>;
  }

  return (
    <>
      <Cards data={data} addToFavButton={true} setData={setData} />
    </>
  );
}
