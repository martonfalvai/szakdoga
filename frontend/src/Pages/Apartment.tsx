import React from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import { useEffect } from "react";


const Apartment = () => {
  const { apartmentId } = useParams();


  const getApatmentById = async () => {
    try {
      const response = await axios.get(`/api/rents/${apartmentId}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApatmentById();
  }, []);

  return (
    <div>
      <h1>Apartment Details</h1>
      <p></p>
    </div>
  );
};

export default Apartment;

// {
//   "id": 1,
//   "title": "Felújított lakás a belvárosban",
//   "description": "Elegáns, teljesen felújított 2 szobás lakás Budapest szívében. Közel a metróhoz és a főbb bevásárlóközpontokhoz. Berendezett, azonnal beköltözhető.",
//   "price": 180000,
//   "currency": "HUF",
//   "city": "Budapest",
//   "address": "Váci utca 12. II/4.",
//   "area": 58.5,
//   "bedrooms": 2,
//   "bathrooms": 1,
//   "status": "available",
//   "available_from": "2026-03-01 00:00:00",
//   "highlighted": null,
//   "defaultimage": null,
//   "images": [
//     {
//       "id": 1,
//       "base64": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzRBOTBFMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIj5CdWRhcGVzdCBMYWvDoXM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiPk5hcHBhbGk8L3RleHQ+PC9zdmc+"
//     },
//     {
//       "id": 2,
//       "base64": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzVCQTNGNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIj5CdWRhcGVzdCBMYWvDoXM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiPktvbnloYTwvdGV4dD48L3N2Zz4="
//     },
//     {
//       "id": 3,
//       "base64": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzNEN0JDNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIj5CdWRhcGVzdCBMYWvDoXM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiPkjDoWzDs3N6b2JhPC90ZXh0Pjwvc3ZnPg=="
//     }
//   ]
// }
