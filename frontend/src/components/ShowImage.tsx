import { useEffect, useState } from "react";

type imageType = {
  id: number;
  rent_id: number;
  base64: string;
};

export default function ShowImage() {
  const [kepek, setKepek] = useState<imageType[]>([]);

  async function loadImage() {
    const resp = await fetch("http://localhost:8000/api/images");
    const data = await resp.json();
    console.log(data);
    setKepek(data);
  }

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div>
      Random kéP!!!!
      {kepek.map((kep, index) => {
        return <img src={kep.base64} key={kep.rent_id} alt="Embedded Logo" />;
      })}
    </div>
  );
}
