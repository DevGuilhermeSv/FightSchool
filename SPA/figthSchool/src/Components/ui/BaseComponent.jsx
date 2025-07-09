export default function BaseComponent(props) {
  const { children, className } = props;

  return (
    <div
      className={`shadow-sm bg-preto-200 text-preto border-preto-300 rounded-sm border px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-amarelo ${className}`}
    >
      <div className="grid gap-4 p-4">{children}</div>
    </div>
  );
}
