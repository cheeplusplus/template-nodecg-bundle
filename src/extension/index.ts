import type NodeCG from "@nodecg/types";
import {
  getReplicant,
  listenFor,
  onServerEvent,
} from "../shared/NodeCgHelpers";

module.exports = (nodecg: NodeCG.ServerAPI) => {
  ////  Replicants  ////

  const exampleReplicant = getReplicant(nodecg, "example");

  ////  Messages  ////

  listenFor(nodecg, "onUpdateExample", async ({ newValue }) => {
    exampleReplicant.value = { storedValue: newValue };
  });

  ////  Server events  ////

  onServerEvent(nodecg, "serverStarted", async () => {
    // start
  });

  onServerEvent(nodecg, "serverStopping", async () => {
    // stop
  });

  ////  API  ////

  const router = nodecg.Router();
  router.get("/example", (req, res) => {
    res.send(`Example value is: ${exampleReplicant.value}`);
  });
  nodecg.mount("/template", router);
};
