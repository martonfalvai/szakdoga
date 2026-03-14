import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { ArrowLeft, MapPin, ShareIcon, StarIcon } from "lucide-react";
import ApartmentGallery from "../components/ApartmentGallery";
import ReviewList from "../components/ReviewList";
import ContactModal from "../components/ContactModal";
import toast from "react-hot-toast";
import { ApartmentData } from "../types";
import { useAuth } from "../hooks/authProvider";

const statusMap: Record<string, { label: string; color: string }> = {
  available: { label: "Elérhető", color: "bg-green-100 text-green-700" },
  rented: { label: "Kiadva", color: "bg-gray-100 text-gray-700" },
  unavailable: { label: "Nem elérhető", color: "bg-red-100 text-red-700" },
};

const Apartment = () => {
  const { apartmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [apartment, setApartment] = useState<ApartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    // majd itt lesz az API hívás:
    axios.get(`/api/rents/${apartmentId}`).then((res) => {
      setApartment(res.data);
      setLoading(false);
    });
    // setTimeout(() => {
    //   setApartment(MOCK_DATA);
    //   setLoading(false);
    // }, 500);
  }, [apartmentId]);

  if (loading) return <p className="text-center mt-10">Betöltés...</p>;
  if (!apartment) return <p className="text-center mt-10">Nem található.</p>;

  const share = () => {
    navigator.clipboard.writeText(globalThis.location.href);
    toast.success("Megosztási link kimásolva.");
  };

  const status = statusMap[apartment.status] || statusMap.available;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* fejléc */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          <span className="flex gap-1 items-center">
            <ArrowLeft />
            Vissza
          </span>
        </button>
        <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">
          <span className="flex gap-2 items-center" onClick={() => share()}>
            Megosztás
            <ShareIcon className="opacity-75" width={16} />
          </span>
        </button>
      </div>

      {/* cím és státusz */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{apartment.title}</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            <MapPin /> {apartment.address}, {apartment.city}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      {/* galéria + oldalsáv */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* galéria */}
        <div className="lg:col-span-2">
          <ApartmentGallery images={apartment.images} title={apartment.title} />
        </div>

        {/* jobb oldal: adatok + ár */}
        <div className="space-y-4">
          {/* adatok */}
          <div className="grid grid-cols-2 gap-3">
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
              <p className="text-lg font-semibold flex items-center justify-center gap-1">
                <StarIcon
                  width={16}
                  fill="gold"
                  stroke="darkgray"
                  strokeWidth={1.5}
                />
                {apartment.average_rating}
              </p>
              <p className="text-sm text-gray-500">
                {apartment.reviews.length} értékelés
              </p>
            </div>
          </div>

          {/* ár */}
          <div className="border rounded-xl p-6 h-fit">
            <p className="text-3xl font-bold text-[#d2a995]">
              {apartment.price.toLocaleString("hu-HU")} Ft
            </p>
            <p className="text-sm text-gray-500">/ hónap</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                Elérhető:{" "}
                {new Date(apartment.available_from).toLocaleDateString("hu-HU")}
              </p>
              <p>{apartment.city}</p>
            </div>
            <button
              onClick={() => setContactOpen(true)}
              className="w-full mt-6 py-3 bg-[#d2a995] text-white rounded-lg hover:bg-[#c09a85]"
            >
              Kapcsolatfelvétel
            </button>
          </div>
        </div>
      </div>

      {/* leírás + felszereltség */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">Leírás</h2>
          <p className="text-gray-600 leading-relaxed">
            {apartment.description}
          </p>
        </div>

        {apartment.utilities.length > 0 && (
          <div className="border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Felszereltség</h2>
            <ul className="space-y-2">
              {apartment.utilities.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2a995] shrink-0" />
                  {u.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* értékelések */}
      <ReviewList
        reviews={apartment.reviews}
        averageRating={apartment.average_rating}
      />

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        apartmentTitle={apartment.title}
      />
    </div>
  );
};

export default Apartment;
