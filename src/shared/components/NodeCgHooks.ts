import { useCallback, useEffect, useState } from "react";
import { clone } from "lodash";
import {
  MessageTypes,
  ReplicantTypes,
  getReplicant,
  sendMessage,
} from "../NodeCgHelpers";

export const useReplicant = <
  K extends keyof ReplicantTypes,
  V extends ReplicantTypes[K],
>(
  replicantName: K
): [V, (newValue: V) => void] => {
  const [value, updateValue] = useState<V>({} as any);

  const replicant = getReplicant(nodecg, replicantName);

  const changeHandler = (newValue: V): void => {
    updateValue((oldValue) => {
      if (newValue !== oldValue) {
        return newValue;
      }
      // replicant.value has always the same reference. Cloning to cause re-rendering
      return clone(newValue);
    });
  };

  useEffect(() => {
    replicant.on("change", changeHandler);
    return () => {
      replicant.removeListener("change", changeHandler);
    };
  }, [replicant]);

  return [
    value,
    (newValue) => {
      replicant.value = newValue;
    },
  ];
};

export const useSendMessage = <
  K extends keyof MessageTypes,
  V extends MessageTypes[K],
>(
  messageName: K
): ((data: V) => Promise<void>) => {
  return (data: V) => sendMessage(nodecg, messageName, data);
};

export const useMessageListener = <T>(
  messageName: string,
  handler: () => T
): ((data: T) => Promise<void>) => {
  useCallback(() => {
    nodecg.listenFor(messageName, handler);

    return () => nodecg.unlisten(messageName, handler);
  }, [messageName, handler]);

  return async (data: T) => {
    return await nodecg.sendMessage(messageName, data);
  };
};
