import { useEffect, useState } from "react";
import useSocketClient from "hooks/useSocketClient";

function useSocketSubscription(types) {
  // {type: string, data: Any, errors: Any}
  const socket = useSocketClient();

  const [data, setData] = useState(null);

  useEffect(() => {
    function subscribe(payload) {
      const payloadParsed = JSON.parse(payload);
      if (types.includes(payloadParsed.type)) {
        setData(payloadParsed.payload);
      }
    }

    socket.on("message", subscribe);

    return function () {
      socket.off("message", subscribe);
    };
  }, [setData, socket, types]);

  return data;
}

export default useSocketSubscription;
