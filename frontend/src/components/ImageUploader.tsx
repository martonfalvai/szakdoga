import { useState } from "react";

export default function ImageUpload({
  rentId,
  token,
}: {
  rentId: number;
  token: string;
}) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = async () => {
    if (!images.length) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("rent_id", String(rentId));
    formData.append("default_image_index", String(defaultIndex));
    images.forEach((img) => formData.append("images[]", img));

    try {
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Hiba történt a feltöltés során.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" accept="image/*" multiple onChange={handleChange} />

      {previews.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          {previews.map((src, index) => (
            <div
              key={index}
              onClick={() => setDefaultIndex(index)}
              style={{
                cursor: "pointer",
                border:
                  defaultIndex === index
                    ? "3px solid blue"
                    : "3px solid transparent",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={src}
                alt={`preview-${index}`}
                width={120}
                height={120}
                style={{ objectFit: "cover" }}
              />
              {defaultIndex === index && (
                <p style={{ textAlign: "center", margin: 0, fontSize: "12px" }}>
                  Default
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !images.length}
        style={{ marginTop: "10px", padding: "8px 16px" }}
      >
        {loading ? "Feltöltés..." : "Feltöltés"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
