import type NodeCG from "@nodecg/types";

// Replicants

export type ReplicantTypes = {
  example: { storedValue: string };
};

export function getReplicant<
  K extends keyof ReplicantTypes,
  V extends ReplicantTypes[K],
>(nodecg: NodeCG.ServerAPI | NodeCG.ClientAPI, replicantName: K) {
  // Typescript why
  if ("mount" in nodecg) {
    return nodecg.Replicant<V>(replicantName);
  } else {
    return nodecg.Replicant<V>(replicantName);
  }
}

// Messages

export type MessageTypes = {
  onUpdateExample: { newValue: string };
};

export async function sendMessage<
  K extends keyof MessageTypes,
  V extends MessageTypes[K],
>(nodecg: NodeCG.ServerAPI | NodeCG.ClientAPI, messageName: K, data?: V) {
  await nodecg.sendMessage(messageName, data);
}

export function listenFor<
  K extends keyof MessageTypes,
  V extends MessageTypes[K],
>(
  nodecg: NodeCG.ServerAPI,
  messageName: K,
  handlerFunc: (data: V) => Promise<void> | void
) {
  nodecg.listenFor(messageName, (data) => {
    (async () => {
      try {
        await handlerFunc(data);
      } catch (err) {
        nodecg.log.error("Got error sending message", messageName, err);
      }
    })();
  });
}

// Server events

export function onServerEvent(
  nodecg: NodeCG.ServerAPI,
  eventName: string,
  handlerFunc: (data?: any) => Promise<void> | void
) {
  nodecg.on(eventName as any, (data: any) => {
    (async () => {
      try {
        await handlerFunc(data);
      } catch (err) {
        nodecg.log.error("Got error handling server event", eventName, err);
      }
    })();
  });
}
