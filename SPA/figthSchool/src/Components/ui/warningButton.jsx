import { Button } from "flowbite-react";

function WarningButton(props) {
  return (
    <Button
      color="red"
      className="hover:bg-vermelho-100 text-vermelho-text px-4 py-2 rounded-sm"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}

export default WarningButton;
