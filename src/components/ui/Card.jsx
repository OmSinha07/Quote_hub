// components/ui/card.jsx
export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-md border bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
