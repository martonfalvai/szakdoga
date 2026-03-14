import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface ApartmentImage {
  id: number;
  base64: string;
}

interface Props {
  images: ApartmentImage[];
  title: string;
}

const ApartmentGallery = ({ images, title }: Props) => {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () =>
    setSelected((i) => (i - 1 + images.length) % images.length);
  const next = () => setSelected((i) => (i + 1) % images.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(false);
  };

  return (
    <>
      {/* galéria */}
      <div>
        <div className="relative rounded-xl overflow-hidden mb-3 group">
          <img
            src={images[selected]?.base64}
            alt={title}
            className="w-full object-cover max-h-[420px] cursor-zoom-in"
            onClick={() => setLightbox(true)}
          />
          {/* nagyítás gomb */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-3 right-3 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Nagyítás"
          >
            <ZoomIn size={18} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1"
              >
                <ArrowLeft width={14} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1"
              >
                <ArrowRight width={14} />
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`rounded-lg overflow-hidden border-2 ${i === selected ? "border-[#d2a995]" : "border-transparent"}`}
            >
              <img src={img.base64} alt="" className="w-20 h-16 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/40"
          >
            <X size={24} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 rounded-full p-3 hover:bg-white/40"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 rounded-full p-3 hover:bg-white/40"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
          <img
            src={images[selected]?.base64}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === selected ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ApartmentGallery;
