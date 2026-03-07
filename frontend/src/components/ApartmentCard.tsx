import { Apartment } from "../types";
import { getPrice } from "../hooks/getPrice";
import { StarReviews } from "../components/StarReviews";
import styles from "../Pages/Home.module.css";
import placeholderImage from "../images/placeholder.png";
import { Link } from "react-router-dom";

export const ApartmentCard = ({ apartments }: { apartments: Apartment[] }) => {
  return apartments.map((apt: Apartment) => (
    <Link to={`/rent//${apt.id}`} key={apt.id} className={styles.apartmentCard}>
      <img
        src={apt.defaultimage ?? placeholderImage}
        alt={apt.title}
        className={styles.apartmentImage}
      />
      <h3>{apt.title}</h3>
      <div className="flex gap-3 justify-between">
        <div className="flex gap-1 items-center justify-center">
          <StarReviews apartment={apt} />
        </div>
        <p>{getPrice(apt.price, apt.currency)}</p>
      </div>
    </Link>
  ));
};
