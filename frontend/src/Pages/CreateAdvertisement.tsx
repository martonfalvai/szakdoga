import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/authProvider";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUploader";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import styles from "./CreateAdvertisement.module.css";
import toast from "react-hot-toast";

interface FormErrors {
  [key: string]: string[];
}

const fieldNameMap: { [key: string]: string } = {
  title: "Cím",
  description: "Leírás",
  price: "Ár",
  currency: "Pénznem",
  city: "Város",
  address: "Cím",
  area: "Terület",
  bedrooms: "Szobák száma",
  bathrooms: "Fürdőszobák száma",
  available_from: "Elérhető dátuma",
  rent_type: "Lakás típusa",
  county: "Megye",
  status: "Státusz",
};

const errorMessageMap: { [key: string]: string } = {
  "field is required": "kötelező mező",
  "must be an integer": "egész számnak kell lennie",
  "must be a valid date": "érvényes dátumnak kell lennie",
  "must be numeric": "számnak kell lennie",
  "must be a string": "szövegnek kell lennie",
};

interface SelectOption {
  id: number;
  name: string;
}

const CreateAdvertisement = () => {
  const navigate = useNavigate();
  const { apartmentId } = useParams();
  const { user, token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rentId, setRentId] = useState<number | null>(null);
  const isEditMode = !!apartmentId;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("A hirdetés feladásához be kell jelentkezned!");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [counties, setCounties] = useState<SelectOption[]>([]);
  const [rentTypes, setRentTypes] = useState<SelectOption[]>([]);
  const [utilities, setUtilities] = useState<SelectOption[]>([]);
  const [selectedUtilities, setSelectedUtilities] = useState<number[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "HUF",
    city: "",
    county: "",
    rent_type: "",
    address: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    available_from: getTodayDate(),
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [citiesRes, countiesRes, typesRes, utilitiesRes] =
          await Promise.all([
            axios.get("/api/cities"),
            axios.get("/api/counties"),
            axios.get("/api/rent-types"),
            axios.get("/api/utility-options"),
          ]);
        setCities(citiesRes.data);
        setCounties(countiesRes.data);
        setRentTypes(typesRes.data);
        setUtilities(utilitiesRes.data);

        // Betöltés szerkesztés módban
        if (isEditMode && apartmentId) {
          try {
            const rentRes = await axios.get(`/api/rents/${apartmentId}`);
            const rent = rentRes.data;
            setFormData({
              title: rent.title || "",
              description: rent.description || "",
              price: rent.price.toString() || "",
              currency: rent.currency || "HUF",
              city: rent.city.toString() || "",
              county: rent.county?.toString() || "",
              rent_type: rent.rent_type?.toString() || "",
              address: rent.address || "",
              area: rent.area?.toString() || "",
              bedrooms: rent.bedrooms?.toString() || "",
              bathrooms: rent.bathrooms?.toString() || "",
              available_from: rent.available_from || getTodayDate(),
            });
            setSelectedUtilities(
              rent.utilities?.map((u: { id: number }) => u.id) || []
            );
          } catch (error) {
            console.error("Error loading apartment:", error);
            toast.error("Hiba a hirdetés betöltésekor");
          }
        }
      } catch (error) {
        console.error("Error fetching options:", error);
        toast.error("Hiba az adatok betöltésekor");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [isEditMode, apartmentId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (
      !user ||
      !formData.title.trim() ||
      !formData.city ||
      !formData.county ||
      !formData.rent_type ||
      !formData.address.trim() ||
      !formData.price ||
      !formData.available_from ||
      !formData.bedrooms ||
      !formData.bathrooms
    ) {
      toast.error("Töltsd ki az összes kötelező mezőt!");
      return;
    }

    setLoading(true);

    try {
      // Határozd meg a status-t az elérhető dátum alapján
      const today = getTodayDate();
      const status = formData.available_from === today ? "available" : "draft";

      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        currency: formData.currency,
        city: parseInt(formData.city),
        county: parseInt(formData.county),
        rent_type: parseInt(formData.rent_type),
        address: formData.address,
        area: formData.area ? parseInt(formData.area) : null,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        available_from: formData.available_from,
        status: status,
        utility_ids: selectedUtilities,
        owner_id: user.id,
      };

      let response;
      if (isEditMode && apartmentId) {
        response = await axios.put(`/api/rents/${apartmentId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Hirdetés frissítve!");
        setTimeout(() => navigate(`/rent/${apartmentId}`), 1500);
      } else {
        response = await axios.post("/api/rents", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newRentId = response.data.id;
        setRentId(newRentId);
        toast.success("Hirdetés létrehozva! Most tölts fel képeket.");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, messages]: [string, any]) => {
            const fieldName = fieldNameMap[key] || key;
            let errorMsg = messages[0];

            // Fordítsd le az error üzeneteket
            Object.entries(errorMessageMap).forEach(([en, hu]) => {
              errorMsg = errorMsg.toLowerCase().replace(en, hu);
            });

            return `${fieldName}: ${errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}`;
          })
          .join("\n");
        toast.error(errorMessages);
      } else {
        toast.error("Hiba történt a hirdetés létrehozása során!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (rentId && token) {
    return (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1>Képek feltöltése</h1>
          <p className={styles.subtitle}>
            A hirdetés létrehozva! Most tölts fel legalább egy képet.
          </p>
          <ImageUpload
            rentId={rentId}
            token={token}
            onUploadComplete={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>{isEditMode ? "Hirdetés szerkesztése" : "Új hirdetés feladása"}</h1>

        {loadingOptions ? (
          <p className={styles.loading}>Adatok betöltése...</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.gridTwo}>
              <div className={styles.formGroup}>
                <Label htmlFor="title">Cím *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="pl. Szép lakás a belvárosban"
                  required
                  className={errors.title ? styles.inputError : ""}
                />
                {errors.title && (
                  <span className={styles.errorMessage}>
                    {errors.title[0]}
                  </span>
                )}
              </div>

              <div className={styles.priceGroup}>
                <div className={styles.priceTwoCol}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="price">Ár (Ft) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="150000"
                      required
                      className={errors.price ? styles.inputError : ""}
                    />
                    {errors.price && (
                      <span className={styles.errorMessage}>
                        {errors.price[0]}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <Label htmlFor="currency">Pénznem</Label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className={`${styles.select} ${
                        errors.currency ? styles.inputError : ""
                      }`}
                    >
                      <option value="HUF">HUF</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                    {errors.currency && (
                      <span className={styles.errorMessage}>
                        {errors.currency[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="description">Leírás</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Részletesen írj a lakásról..."
                className={`${styles.textarea} ${
                  errors.description ? styles.inputError : ""
                }`}
                rows={4}
              />
              {errors.description && (
                <span className={styles.errorMessage}>
                  {errors.description[0]}
                </span>
              )}
            </div>

            <div className={styles.gridThree}>
              <div className={styles.formGroup}>
                <Label htmlFor="county">Megye *</Label>
                <select
                  id="county"
                  name="county"
                  value={formData.county}
                  onChange={handleInputChange}
                  className={`${styles.select} ${
                    errors.county ? styles.inputError : ""
                  }`}
                  required
                >
                  <option value="">-- Megye --</option>
                  {counties.map((county) => (
                    <option key={county.id} value={county.id}>
                      {county.name}
                    </option>
                  ))}
                </select>
                {errors.county && (
                  <span className={styles.errorMessage}>
                    {errors.county[0]}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="city">Város *</Label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`${styles.select} ${
                    errors.city ? styles.inputError : ""
                  }`}
                  required
                >
                  <option value="">-- Város --</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <span className={styles.errorMessage}>{errors.city[0]}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="address">Cím (utca, házszám) *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Andrássy út 1."
                  required
                  className={errors.address ? styles.inputError : ""}
                />
                {errors.address && (
                  <span className={styles.errorMessage}>
                    {errors.address[0]}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.gridFour}>
              <div className={styles.formGroup}>
                <Label htmlFor="rent_type">Lakás típusa *</Label>
                <select
                  id="rent_type"
                  name="rent_type"
                  value={formData.rent_type}
                  onChange={handleInputChange}
                  className={`${styles.select} ${
                    errors.rent_type ? styles.inputError : ""
                  }`}
                  required
                >
                  <option value="">-- Típus --</option>
                  {rentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.rent_type && (
                  <span className={styles.errorMessage}>
                    {errors.rent_type[0]}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="area">Terület (m²)</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="65"
                  className={errors.area ? styles.inputError : ""}
                />
                {errors.area && (
                  <span className={styles.errorMessage}>{errors.area[0]}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="bedrooms">Szobák *</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="2"
                  required
                  className={errors.bedrooms ? styles.inputError : ""}
                />
                {errors.bedrooms && (
                  <span className={styles.errorMessage}>
                    {errors.bedrooms[0]}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="bathrooms">Fürdőszobák *</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="1"
                  required
                  className={errors.bathrooms ? styles.inputError : ""}
                />
                {errors.bathrooms && (
                  <span className={styles.errorMessage}>
                    {errors.bathrooms[0]}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="available_from">
                Elérhető dátuma *
              </Label>
              <Input
                id="available_from"
                name="available_from"
                type="date"
                value={formData.available_from}
                onChange={handleInputChange}
                required
              />
              {errors.available_from && (
                <span className={styles.errorMessage}>
                  {errors.available_from[0]}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <Label>Felszereltség</Label>
              <div className={styles.utilitiesCheckboxes}>
                {utilities.map((utility) => (
                  <label key={utility.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedUtilities.includes(utility.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUtilities([
                            ...selectedUtilities,
                            utility.id,
                          ]);
                        } else {
                          setSelectedUtilities(
                            selectedUtilities.filter((id) => id !== utility.id)
                          );
                        }
                      }}
                      className={styles.checkbox}
                    />
                    <span>{utility.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading
                ? "Feldolgozás..."
                : isEditMode
                  ? "Hirdetés mentése"
                  : "Hirdetés feladása"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAdvertisement;
