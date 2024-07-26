import React from "react";
import { useReplicant } from "./NodeCgHooks";

import "./ExampleGraphic.scss";

export default function ExampleGraphic() {
  const [example] = useReplicant("example");

  return (
    <div>
      Example value is{" "}
      <span className="example-value">{example?.storedValue || "unset"}</span>
    </div>
  );
}
