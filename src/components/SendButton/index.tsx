import { Button, Spinner } from "@chakra-ui/react";

type SendButtonType = {
  title: string;
  isLoading?: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export default function SendButton(props: SendButtonType) {
  return props.isLoading ? (
    <Button borderRadius="25px" colorScheme={"blackAlpha"}>
      <Spinner colorScheme={"gray"} />
    </Button>
  ) : (
    <Button
      borderRadius="25px"
      disabled={props.disabled}
      onClick={props.onClick}
      colorScheme={"blue"}
    >
      {props.title.toLocaleUpperCase()}
    </Button>
  );
}
