import { useEffect, useState } from "react";

export default function ShowImage() {
  const [kepek, setKepek] = useState([]);

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
      {kepek && kepek.length > 0 && (
        <img src={kepek[0].base64} alt="Embedded Logo" />
      )}
    </div>
  );
}
