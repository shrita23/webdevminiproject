import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/cards";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function Search() {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const search = queryString.parse(location.search);

    if (!data) {
      axios
        .get(
          `http://localhost:4000/search?query=${encodeURIComponent(
            search.query
          )}`
        )
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
