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

export interface ApartmentImage {
  id: number;
  base64: string;
}

export interface ApartmentData {
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
  owner_id?: number;
  images: ApartmentImage[];
  utilities: { id: number; name: string }[];
  reviews: {
    rating: number;
    renter_comment: string;
    owner_comment: string;
    created_at: string;
    renter_name: string;
    owner_name: string;
  }[];
  average_rating: number;
}
