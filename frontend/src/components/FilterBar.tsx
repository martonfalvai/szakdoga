import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Filters {
  city: string;
  county: string;
  price_min: string;
  price_max: string;
  area_min: string;
  area_max: string;
  bedrooms: string;
  bathrooms: string;
  available_from: string;
}

export const EMPTY_FILTERS: Filters = {
  city: "", county: "", price_min: "", price_max: "",
  area_min: "", area_max: "", bedrooms: "", bathrooms: "", available_from: "",
};

// ── Constants ─────────────────────────────────────────────────────────────────

const AREA_MIN = 0;
const AREA_MAX = 300;

const COUNTIES = [
  "Bács-Kiskun", "Baranya", "Békés", "Borsod-Abaúj-Zemplén",
  "Csongrád-Csanád", "Fejér", "Győr-Moson-Sopron", "Hajdú-Bihar",
  "Heves", "Jász-Nagykun-Szolnok", "Komárom-Esztergom", "Nógrád",
  "Pest", "Somogy", "Szabolcs-Szatmár-Bereg", "Tolna", "Vas",
  "Veszprém", "Zala", "Budapest",
];

const ROOM_OPTIONS = ["1", "2", "3", "4"];

// ── Sub-components ────────────────────────────────────────────────────────────

const Field = ({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={htmlFor} className="text-xs text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const FilterSelect = ({ id, value, onValueChange, placeholder, options }: {
  id?: string;
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) => (
  <Select value={value || "_all"} onValueChange={(v) => onValueChange(v === "_all" ? "" : v)}>
    <SelectTrigger id={id} className="h-9 text-sm">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="_all">{placeholder}</SelectItem>
      {options.map((o) => (
        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// ── Main component ────────────────────────────────────────────────────────────

export default function FilterBar({ onSearch }: { onSearch: (filters: Filters) => void }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [open, setOpen] = useState(false);

  const lo = filters.area_min === "" ? AREA_MIN : Number(filters.area_min);
  const hi = filters.area_max === "" ? AREA_MAX : Number(filters.area_max);
  const hiLabel = hi === AREA_MAX ? `${AREA_MAX}+` : String(hi);

  const set = (key: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const setEvent = (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLInputElement>) => set(key)(e.target.value);

  const handleAreaChange = ([newLo, newHi]: number[]) => {
    setFilters((prev) => ({
      ...prev,
      area_min: newLo === AREA_MIN ? "" : String(newLo),
      area_max: newHi === AREA_MAX ? "" : String(newHi),
    }));
  };

  const hasActive = Object.values(filters).some(Boolean);
  const roomOptions = (max: number) => ROOM_OPTIONS.slice(0, max).map((n) => ({ value: n, label: `${n}+` }));

  const reset = () => { setFilters(EMPTY_FILTERS); onSearch(EMPTY_FILTERS); };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-2xl shadow-sm p-4 mb-6 space-y-4">
      {/* Fő sor */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width={15} />
          <Input
            value={filters.city}
            onChange={setEvent("city")}
            placeholder="Város keresése..."
            className="pl-9 h-9 text-sm"
          />
        </div>

        <Select value={filters.county || "_all"} onValueChange={(v) => set("county")(v === "_all" ? "" : v)}>
          <SelectTrigger className="h-9 text-sm w-44">
            <SelectValue placeholder="Összes megye" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Összes megye</SelectItem>
            {COUNTIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen((o) => !o)}
          className={open ? "bg-muted" : ""}
        >
          <SlidersHorizontal width={14} className="mr-1.5" />
          Szűrők
          {hasActive && <span className="ml-1.5 w-2 h-2 rounded-full bg-[#d2a995]" />}
        </Button>

        <Button type="submit" size="sm" className="bg-[#d2a995] hover:bg-[#c09a85] text-white">
          Keresés
        </Button>

        {hasActive && (
          <Button type="button" variant="outline" size="sm" onClick={reset}>
            <X width={13} className="mr-1" /> Törlés
          </Button>
        )}
      </div>

      {/* Kibővített panel */}
      {open && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
          <Field label="Ár min. (Ft)" htmlFor="price_min">
            <Input id="price_min" type="number" min={0} value={filters.price_min} onChange={setEvent("price_min")} placeholder="pl. 100 000" className="h-9 text-sm" />
          </Field>
          <Field label="Ár max. (Ft)" htmlFor="price_max">
            <Input id="price_max" type="number" min={0} value={filters.price_max} onChange={setEvent("price_max")} placeholder="pl. 500 000" className="h-9 text-sm" />
          </Field>
          <Field label="Min. szobák" htmlFor="bedrooms">
            <FilterSelect id="bedrooms" value={filters.bedrooms} onValueChange={set("bedrooms")} placeholder="Mindegy" options={roomOptions(4)} />
          </Field>
          <Field label="Min. fürdők" htmlFor="bathrooms">
            <FilterSelect id="bathrooms" value={filters.bathrooms} onValueChange={set("bathrooms")} placeholder="Mindegy" options={roomOptions(3)} />
          </Field>

          <Field label="Elérhető ettől" htmlFor="available_from">
            <Input id="available_from" type="date" value={filters.available_from} onChange={setEvent("available_from")} className="h-9 text-sm" />
          </Field>

          <div className="col-span-2 md:col-span-3 space-y-3 pt-1">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Terület (m²)</Label>
              <span className="text-xs text-muted-foreground tabular-nums">{lo} – {hiLabel} m²</span>
            </div>
            <Slider
              min={AREA_MIN}
              max={AREA_MAX}
              step={5}
              value={[lo, hi]}
              onValueChange={handleAreaChange}
              className="[&_[role=slider]]:border-[#d2a995] [&_[role=slider]]:bg-white [&_.bg-primary]:bg-[#d2a995]"
            />
          </div>
        </div>
      )}
    </form>
  );
}
