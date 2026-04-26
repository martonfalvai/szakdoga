import { useState, useRef, useEffect } from "react";
import styles from "./UtilitySelector.module.css";
import { ChevronDown, X } from "lucide-react";

interface Option {
  id: number;
  name: string;
}

interface UtilitySelectorProps {
  id?: string;
  options: Option[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

export default function UtilitySelector({
  id = "utilities",
  options,
  selected,
  onChange,
}: UtilitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((opt) => selected.includes(opt.id));
  const filteredOptions = options.filter(
    (opt) =>
      !selected.includes(opt.id) &&
      opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const handleRemoveChip = (id: number) => {
    onChange(selected.filter((s) => s !== id));
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.selectedContainer} id={id}>
        {selectedOptions.length === 0 ? (
          <span className={styles.placeholder}>Válassz felszereltséget...</span>
        ) : (
          selectedOptions.map((opt) => (
            <div key={opt.id} className={styles.chip}>
              <span>{opt.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveChip(opt.id)}
                className={styles.chipClose}
                aria-label="Eltávolítás"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={styles.trigger}
          aria-haspopup="listbox"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            type="text"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            autoFocus
          />

          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.emptyState}>Nincs több opció</div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggle(opt.id)}
                  className={styles.option}
                >
                  {opt.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
