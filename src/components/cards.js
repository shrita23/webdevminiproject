function trimText(text) {
  if (text.length > 60) {
    return text.substring(0, 60) + "...";
  } else {
    return text;
  }
}

// Function to check if an object with a specific ID exists
function isIdExists(array, id) {
  return array.some((obj) => obj._id === id);
}

export default function Cards({
  data,
  setData,
  addToFavButton,
  removeFromFavButton,
}) {
  const setFav = (item) => {
    let favs = [];

    if (localStorage.getItem("favs")) {
      favs = JSON.parse(localStorage.getItem("favs"));
    }

    if (!isIdExists(favs, item._id)) {
      favs.push(item);
    }

    localStorage.setItem("favs", JSON.stringify(favs));
  };

  const removeFav = (item) => {
    // Filter out the object with the specified id
    setData(data.filter((obj) => obj._id !== item._id));

    let favs = [];

    if (localStorage.getItem("favs")) {
      favs = JSON.parse(localStorage.getItem("favs"));
    }

    favs = favs.filter((obj) => obj._id !== item._id);

    localStorage.setItem("favs", JSON.stringify(favs));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Places</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {data.map((item) => (
            <div
              key={item._id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <a href={"/place/" + item._id}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </a>
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4 relative">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={"/place/" + item._id}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.name}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">
                  {trimText(item.description)}
                </p>
              </div>

              {addToFavButton && (
                <button
                  className="px-4 py-2 bg-blue-200"
                  onClick={() => setFav(item)}
                >
                  Add to favorite
                </button>
              )}

              {removeFromFavButton && (
                <button
                  className="px-4 py-2 bg-blue-200"
                  onClick={() => removeFav(item)}
                >
                  Remove from favorite
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
