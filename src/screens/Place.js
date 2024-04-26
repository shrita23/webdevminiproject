import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Home() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a request for a user with a given ID
    if (!data) {
      axios
        .get("http://localhost:4000/samples/" + params.id)
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
    return <h1>Loading..</h1>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Place information
            </h2>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{data.description}</p>
            </div>
          </section>

          <h2 id="timing-heading" className="flex-left mt-4">
              Timings
            </h2>

          <div className="mt-4 space-y-6">
              <p className="text-base text-gray-700">{data.timings}</p>
            </div>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={data.img}
              alt={data.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
