import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

type warnningProps = {
  status: number;
  setStatus: (status: number) => void;
  params?: string[];
};

function Warnning({ status, setStatus, params }: warnningProps) {
  const [currentType, setCurrentType] = useState<
    "error" | "info" | "warning" | "success"
  >();
  const [currentMsg, setCurrentMsg] = useState<string>("");

  const statusList = {
    500: {
      type: "warning" as "warning",
      msg: "Formato poligonal inválido, verifique se não há linhas sobrepondo linhas!",
    },
  };

  useEffect(() => {
    switchStatus();
  }, [status]);

  function switchStatus() {
    switch (status) {
      case 500:
        setCurrentType(statusList[500].type);
        setCurrentMsg(statusList[500].msg);
        break;
    }
  }

  return status === 0 || status === 200 ? (
    <></>
  ) : (
    <Alert
      zIndex={100}
      position="absolute"
      top="13%"
      data-testid="alert"
      status={currentType}
    >
      <AlertIcon />
      <AlertDescription>{currentMsg}</AlertDescription>

      <CloseButton
        data-testid="close"
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setStatus(0)}
      />
    </Alert>
  );
}

export default Warnning;
