export type Apartment = {
  id: number;
  title: string;
  highlighted: boolean;
  price: number;
  currency: string;
  city: string;
  available_from: string;
  rating: number;
  defaultimage: string | null;
};
