import { useEffect, useState } from "react";

type imageType = {
  id: number;
  rent_id: number;
  base64: string;
};

type rent = {
  id: number;
  title: string;
  highlighted: Date;
  price: number;
  currency: string;
  city: string;
  available_from: Date;
  defaultimage?: string;
};

export default function ShowImage() {
  const [rents, setRents] = useState<rent[]>([]);

  async function loadRents() {
    const resp = await fetch("http://localhost:8000/api/rents");
    const data = await resp.json();
    setRents(data);
  }

  useEffect(() => {
    loadRents();
  }, []);

  const placeholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2RkZGRkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";

  return (
    <div>
      {rents.map((rent) => {
        return (
          <img
            src={rent.defaultimage ?? placeholder}
            key={rent.id}
            alt="Embedded Logo"
          />
        );
      })}
    </div>
  );
}
