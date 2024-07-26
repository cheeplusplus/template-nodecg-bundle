import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useReplicant, useSendMessage } from "../shared/components/NodeCgHooks";

export default function SettingsPanel() {
  const [exampleReplica, setExampleReplica] = useReplicant("example");
  const [example, setExample] = useState<string>();
  const sendOnUpdateExample = useSendMessage("onUpdateExample");

  useEffect(() => {
    setExample(exampleReplica?.storedValue);
  }, [exampleReplica?.storedValue]);

  return (
    <div>
      <h2>Example settings</h2>
      <div>
        Value:{" "}
        <input
          type="text"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
        <br />
        <button onClick={() => setExampleReplica({ storedValue: example })}>
          Save directly
        </button>
        <button onClick={() => sendOnUpdateExample({ newValue: example })}>
          Save via message
        </button>
      </div>
    </div>
  );
}

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<SettingsPanel />);
