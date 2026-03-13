
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import React from "react";

interface ApartmentImage {
  id: number;
  base64: string;
}

interface ApartmentData {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  address: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  available_from: string;
  highlighted: string | null;
  defaultimage: string | null;
  images: ApartmentImage[];
}

const MOCK_DATA: ApartmentData = {
  id: 1,
  title: "Felújított lakás a belvárosban",
  description: "Elegáns, teljesen felújított 2 szobás lakás Budapest szívében. Közel a metróhoz és a főbb bevásárlóközpontokhoz. Berendezett, azonnal beköltözhető.",
  price: 180000,
  currency: "HUF",
  city: "Budapest",
  address: "Váci utca 12. II/4.",
  area: 58.5,
  bedrooms: 2,
  bathrooms: 1,
  status: "available",
  available_from: "2026-03-01 00:00:00",
  highlighted: null,
  defaultimage: null,
  images: [
    { id: 1, base64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzRBOTBFMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIj5CdWRhcGVzdCBMYWvDoXM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiPk5hcHBhbGk8L3RleHQ+PC9zdmc+" },
    { id: 2, base64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzVCQTNGNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIj5CdWRhcGVzdCBMYWvDoXM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiPktvbnloYTwvdGV4dD48L3N2Zz4=" },
    { id: 3, base64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzNEN0JDNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LXNpemU9IjMyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIj5CdWRhcGVzdCBMYWvDoXM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiPkjDoWzDs3N6b2JhPC90ZXh0Pjwvc3ZnPg==" },
  ],
};

const MOCK_REVIEWS = [
  { id: 1, user_name: "Kovács Anna", rating: 5, comment: "Fantasztikus lakás, minden tiszta és modern. A tulajdonos nagyon segítőkész volt!" },
  { id: 2, user_name: "Nagy Péter", rating: 4, comment: "Remek elhelyezkedés, kényelmes bútorok. Kicsit zajos az utca éjszaka." },
  { id: 3, user_name: "Szabó Mária", rating: 5, comment: "Tökéletes volt mindenben, legközelebb is ide jövünk!" },
];

const statusMap: Record<string, { label: string; color: string }> = {
  available: { label: "Elérhető", color: "bg-green-100 text-green-700" },
  rented: { label: "Kiadva", color: "bg-gray-100 text-gray-700" },
  unavailable: { label: "Nem elérhető", color: "bg-red-100 text-red-700" },
};

const Apartment = () => {
  const { apartmentId } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState<ApartmentData | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // majd itt lesz az API hívás:
    // axios.get(`/api/rents/${apartmentId}`).then(res => setApartment(res.data))
    setTimeout(() => {
      setApartment(MOCK_DATA);
      setLoading(false);
    }, 500);
  }, [apartmentId]);

  if (loading) return <p className="text-center mt-10">Betöltés...</p>;
  if (!apartment) return <p className="text-center mt-10">Nem található.</p>;

  const avgRating = (MOCK_REVIEWS.reduce((a, r) => a + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1);
  const status = statusMap[apartment.status] || statusMap.available;

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % apartment.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

{/* fejléc */}
      <div className="flex justify-between mb-6">
        <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg border hover:bg-gray-100">
          ← Vissza
        </button>
        <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">
          Megosztás
        </button>
      </div>

{/* cím és státusz */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{apartment.title}</h1>
          <p className="text-gray-500 mt-1">📍 {apartment.address}, {apartment.city}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
          {status.label}
        </span>
      </div>

{/* galéria */}
      <div className="mb-8">
        <div className="relative rounded-xl overflow-hidden mb-3">
          <img
            src={apartment.images[selectedImage]?.base64}
            alt={apartment.title}
            className="w-full object-cover max-h-[500px]"
          />
          {apartment.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1">◀</button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1">▶</button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {apartment.images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(i)}
              className={`rounded-lg overflow-hidden border-2 ${i === selectedImage ? "border-[#d2a995]" : "border-transparent"}`}
            >
              <img src={img.base64} alt="" className="w-20 h-16 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* fő tartalom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* bal oldal  */}
        <div className="lg:col-span-2 space-y-6">

          {/* adatok */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="border rounded-xl p-4 text-center">
              <p className="text-lg font-semibold">{apartment.area} m²</p>
              <p className="text-sm text-gray-500">Terület</p>
            </div>
            <div className="border rounded-xl p-4 text-center">
              <p className="text-lg font-semibold">{apartment.bedrooms}</p>
              <p className="text-sm text-gray-500">Szoba</p>
            </div>
            <div className="border rounded-xl p-4 text-center">
              <p className="text-lg font-semibold">{apartment.bathrooms}</p>
              <p className="text-sm text-gray-500">Fürdő</p>
            </div>
            <div className="border rounded-xl p-4 text-center">
              <p className="text-lg font-semibold">⭐ {avgRating}</p>
              <p className="text-sm text-gray-500">{MOCK_REVIEWS.length} értékelés</p>
            </div>
          </div>

{/* leírás */}
          <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Leírás</h2>
            <p className="text-gray-600 leading-relaxed">{apartment.description}</p>
          </div>
        </div>

{/* jobb oldali ár  */}
        <div className="border rounded-xl p-6 h-fit">
          <p className="text-3xl font-bold text-[#d2a995]">{apartment.price.toLocaleString("hu-HU")} Ft</p>
          <p className="text-sm text-gray-500">/ hónap</p>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>Elérhető: {new Date(apartment.available_from).toLocaleDateString("hu-HU")}</p>
            <p>{apartment.city}</p>
          </div>
          <button className="w-full mt-6 py-3 bg-[#d2a995] text-white rounded-lg hover:bg-[#c09a85]">
            Kapcsolatfelvétel
          </button>
        </div>
      </div>

 {/* értékelések */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Értékelések</h2>
        <div className="space-y-3">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="border rounded-xl p-5">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{review.user_name}</span>
                <span>{"⭐".repeat(review.rating)}</span>
              </div>
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Apartment;