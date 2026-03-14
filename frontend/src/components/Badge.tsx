interface Props {
  label: string;
  variant?: "renter" | "owner";
}

const variants = {
  renter: "bg-blue-100 text-blue-600",
  owner: "bg-amber-100 text-amber-600",
};

const Badge = ({ label, variant = "renter" }: Props) => (
  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${variants[variant]}`}>
    {label}
  </span>
);

export default Badge;
