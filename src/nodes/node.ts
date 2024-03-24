import bodyParser from "body-parser";
import express from "express";
import { BASE_NODE_PORT } from "../config";
import { Value } from "../types";

export async function node(
  nodeId: number, // the ID of the node
  N: number, // total number of nodes in the network
  F: number, // number of faulty nodes in the network
  initialValue: Value, // initial value of the node
  isFaulty: boolean, // true if the node is faulty, false otherwise
  nodesAreReady: () => boolean, // used to know if all nodes are ready to receive requests
  setNodeIsReady: (index: number) => void // this should be called when the node is started and ready to receive requests
) {
  const node = express();
  node.use(express.json());
  node.use(bodyParser.json());

  // Route to retrieve the current status of the node
  node.get("/status", (req, res) => {
    if (isFaulty) {
      res.status(500).send("faulty");
    } else {
      res.status(200).send("live");
    }
  });

  // Route to receive messages from other nodes
  node.post("/message", (req, res) => {
    // TODO: Implement message handling logic
    res.sendStatus(200);
  });

  // Route to start the consensus algorithm
  node.get("/start", async (req, res) => {
    // TODO: Implement logic to start the consensus algorithm
    res.sendStatus(200);
  });

  // Route to stop the consensus algorithm
  node.get("/stop", async (req, res) => {
    // TODO: Implement logic to stop the consensus algorithm
    res.sendStatus(200);
  });

  // Route to get the current state of a node
  node.get("/getState", (req, res) => {
    // TODO: Implement logic to get the current state of the node
    const nodeState = {
      killed: false, // Assuming this is always false when getting the state
      x: initialValue, // Assuming initial value is returned as current value
      decided: null, // Assuming no decision is made initially
      k: null // Assuming k is not set initially
    };
    res.json(nodeState);
  });

  // Start the server
  const server = node.listen(BASE_NODE_PORT + nodeId, async () => {
    console.log(
      `Node ${nodeId} is listening on port ${BASE_NODE_PORT + nodeId}`
    );

    // The node is ready
    setNodeIsReady(nodeId);
  });

  return server;
}
