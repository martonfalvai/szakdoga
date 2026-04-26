import { MapPin, Mail, Phone, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f0] to-[#f5ede6]">
      {/* Fejléc */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#6a3918] mb-4">Rólunk</h1>
        <p className="text-lg text-gray-600">
          Megismerkedj a MAPUMA csapatával
        </p>
      </div>

      {/* Főoldal tartalom */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Bemutatkozás */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#6a3918] mb-4">
            Ki vagyunk mi?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A MAPUMA egy modern albérlet-keresési platform, amely leegyszerűsíti
            a lakáskereső és a tulajdonosok közötti kapcsolat létesítését.
            Célunk, hogy mindenki megtalálja az ideális lakást gyorsan és
            biztonságosan hosszú vagy rövidtávon egyaránt.
          </p>
        </div>

        {/* Csapat */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#6a3918] mb-6">Csapatunk</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Csapattag 1 */}
            <div className="border-l-4 border-[#d2a995] pl-6">
              <h3 className="text-lg font-semibold text-[#6a3918] mb-1">
                Márki András
              </h3>
              <p className="text-sm text-[#8b5e3c]">Frontend fejlesztés</p>
            </div>

            {/* Csapattag 2 */}
            <div className="border-l-4 border-[#d2a995] pl-6">
              <h3 className="text-lg font-semibold text-[#6a3918] mb-1">
                Urbanics Pál
              </h3>
              <p className="text-sm text-[#8b5e3c]">Backend + Adatbázis</p>
            </div>

            {/* Csapattag 3 */}
            <div className="border-l-4 border-[#d2a995] pl-6">
              <h3 className="text-lg font-semibold text-[#6a3918] mb-1">
                Martonfalvai Manassé Antal
              </h3>
              <p className="text-sm text-[#8b5e3c]">
                Backend + Adatbázis tervezés
              </p>
            </div>
          </div>
        </div>

        {/* Értékek */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#6a3918] mb-6">
            Az értékeink
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Heart className="text-[#d2a995] flex-shrink-0 mt-1" width={24} />
              <div>
                <h3 className="font-semibold text-[#6a3918] mb-1">
                  Megbízhatóság
                </h3>
                <p className="text-gray-600 text-sm">
                  Biztonságos és transzparens kapcsolat a felhasználók között.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin
                className="text-[#d2a995] flex-shrink-0 mt-1"
                width={24}
              />
              <div>
                <h3 className="font-semibold text-[#6a3918] mb-1">
                  Egyszerűség
                </h3>
                <p className="text-gray-600 text-sm">
                  Könnyű és intuitív platformot nyújtunk mindenkinek.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kapcsolat */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#6a3918] mb-6">
            Lépj velünk kapcsolatba
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="text-[#d2a995] flex-shrink-0 mt-1" width={24} />
              <div>
                <p className="font-semibold text-[#6a3918]">Email</p>
                <a
                  href="mailto:info@mapuma.hu"
                  className="text-[#8b5e3c] hover:text-[#6a3918]"
                >
                  info@mapuma.hu
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-[#d2a995] flex-shrink-0 mt-1" width={24} />
              <div>
                <p className="font-semibold text-[#6a3918]">Telefon</p>
                <a
                  href="tel:+36123237582"
                  className="text-[#8b5e3c] hover:text-[#6a3918]"
                >
                  +36 1 233 7582
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
