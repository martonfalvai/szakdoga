import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./ImageUploader.module.css";

interface UploadedImage {
  file: File;
  preview: string;
  isDefault: boolean;
}

interface ImageUploadProps {
  rentId: number;
  token: string;
  onUploadComplete?: () => void;
}

export default function ImageUpload({
  rentId,
  token,
  onUploadComplete,
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;

    const newImages: UploadedImage[] = newFiles.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      isDefault: uploadedImages.length === 0 && index === 0,
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length > 0 && !updated.some((img) => img.isDefault)) {
        updated[0].isDefault = true;
      }
      return updated;
    });
  };

  const setDefaultImage = (index: number) => {
    setUploadedImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isDefault: i === index,
      })),
    );
  };

  const handleUpload = async () => {
    if (!uploadedImages.length) return;
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("rent_id", String(rentId));

    const defaultIndex = uploadedImages.findIndex((img) => img.isDefault);
    formData.append(
      "default_image_index",
      String(defaultIndex >= 0 ? defaultIndex : 0),
    );

    uploadedImages.forEach((img) => {
      formData.append("images[]", img.file);
    });

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
      if (res.ok) {
        toast.success("Hirdetés sikeresen feladva!");
        setUploadedImages([]);
        onUploadComplete?.();
      } else {
        setMessage(data.message || "Hiba történt a feltöltés során.");
      }
    } catch (err) {
      setMessage("Hiba történt a feltöltés során.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        <>
          <div className={styles.uploadArea}>
            <label className={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddImages}
                className={styles.fileInput}
              />
              <div className={styles.uploadPrompt}>
                <span className={styles.uploadIcon}>🖼️</span>
                <p className={styles.uploadText}>Kattints vagy húzz ide képeket</p>
                <p className={styles.uploadSubtext}>(JPG, PNG, WebP - max 10MB)</p>
              </div>
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div className={styles.previewContainer}>
              <div className={styles.previewHeader}>
                <h3 className={styles.previewTitle}>
                  Feltöltésre váró képek ({uploadedImages.length})
                </h3>
                <span className={styles.previewCount}>
                  {uploadedImages.filter((img) => img.isDefault).length > 0
                    ? `Főkép: ${uploadedImages.findIndex((img) => img.isDefault) + 1}. kép`
                    : ""}
                </span>
              </div>

              <div className={styles.previewGrid}>
                {uploadedImages.map((img, index) => (
                  <div
                    key={index}
                    className={`${styles.previewItem} ${
                      img.isDefault ? styles.defaultImage : ""
                    }`}
                  >
                    <img
                      src={img.preview}
                      alt={`preview-${index}`}
                      className={styles.previewImage}
                    />

                    {img.isDefault && (
                      <div className={styles.defaultBadge}>Főkép</div>
                    )}

                    <div className={styles.previewActions}>
                      {!img.isDefault && (
                        <button
                          type="button"
                          onClick={() => setDefaultImage(index)}
                          className={styles.setDefaultBtn}
                          title="Beállítás főképnek"
                        >
                          ★
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={styles.removeBtn}
                        title="Eltávolítás"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadedImages.length > 0 && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className={styles.uploadButton}
            >
              {`${uploadedImages.length} kép feltöltése`}
            </button>
          )}

          {message && (
            <div className={`${styles.message} ${styles.messageError}`}>
              {message}
            </div>
          )}
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Képek feltöltödnek...</p>
        </div>
      )}
    </div>
  );
}
