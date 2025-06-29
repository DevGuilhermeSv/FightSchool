export default function BaseComponent(props) {
  const { children } = props;

  return (
    <div className="shadow bg-white rounded border">
      <div className="grid gap-4 p-4">{children}</div>
    </div>
  );
}
