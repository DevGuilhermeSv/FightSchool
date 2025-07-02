function WarningButton(props) {
  return (
    <button className="bg-vermelho hover:bg-vermelho-100 text-vermelho-text px-4 py-2 rounded">
      {props.children}
    </button>
  );
}

export default WarningButton;
