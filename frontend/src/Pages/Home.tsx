import { useEffect, useState } from "react";
import styles from "../Pages/Home.module.css";
import { Apartment } from "../types";
import axios from "../api/axiosConfig";
import { ApartmentCard } from "../components/ApartmentCard";

const Home = () => {
  const [apartments, setApartments] = useState<Apartment[] | null>(null);

  const getRents = async () => {
    try {
      const response = await axios.get("/api/rents");
      const data = await response.data;
      setApartments(data);
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
      <div className={styles.apartmentGrid}>
        {apartments ? (
          <ApartmentCard apartments={apartments} />
        ) : (
          <>
            {new Array(4).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
