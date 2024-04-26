import React, { useEffect, useState } from "react";
import Cards from "../components/cards";

export default function Favourites() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a request for a user with a given ID
    if (localStorage.getItem("favs")) {
      setData(JSON.parse(localStorage.getItem("favs")));
    }
    console.log(localStorage.getItem("favs"));
  }, []);

  if (!data || data.length === 0) {
    return <h1 className="text-center text-3xl mt-5">No Favorites!</h1>;
  }

  return (
    <>
      <Cards data={data} removeFromFavButton={true} setData={setData} />
    </>
  );
}
