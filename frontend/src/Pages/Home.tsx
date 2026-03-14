import { useEffect, useState } from "react";
import styles from "../Pages/Home.module.css";
import { Apartment } from "../types";
import axios from "../api/axiosConfig";
import { ApartmentCard } from "../components/ApartmentCard";
import FilterBar, { Filters, EMPTY_FILTERS } from "../components/FilterBar";

const Home = () => {
  const [apartments, setApartments] = useState<Apartment[] | null>(null);

  const getRents = async (filters: Filters = EMPTY_FILTERS) => {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== "")
      );
      const response = await axios.get("/api/rents", { params });
      setApartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRents();
  }, []);

  const SkeletonCard = () => (
    <div className={styles.apartmentCard}>
      <div className={`${styles.apartmentImage} bg-gray-300 animate-pulse`} />
      <h3 className="h-4 bg-gray-300 rounded mb-2 animate-pulse">{}</h3>
    </div>
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <h1>MAPUMA LAKÁSCENTRUM</h1>
        <p>Fedezd fel széles kínálatunkat és találd meg a tökéletes otthont.</p>
      </div>

      <FilterBar onSearch={getRents} />

      <div className={styles.apartmentGrid}>
        {apartments === null ? (
          <>
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : apartments.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-12">
            Nincs a szűrőknek megfelelő lakás.
          </p>
        ) : (
          <ApartmentCard apartments={apartments} />
        )}
      </div>
    </div>
  );
};

export default Home;
