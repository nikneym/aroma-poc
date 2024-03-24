import { useState } from "preact/hooks";

export default function Page() {
  const [state, setState] = useState<number>(0);

  return (
    <>
      <br />
      <span>{state}</span>
      <br />
      <button type="button" onClick={() => setState((prev) => (prev += 1))}>
        increment
      </button>
      <div>hello there!</div>
    </>
  );
}
