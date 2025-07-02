export default function BaseComponent(props) {
  const { children } = props;

  return (
    <div className="shadow bg-preto-200 text-preto border-preto-300 rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amarelo">
      <div className="grid gap-4 p-4">{children}</div>
    </div>
  );
}
