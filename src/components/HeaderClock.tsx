import { useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

export const HeaderClock = () => {
  const [value, setValue] = useState(new Date());

  setInterval(() => setValue(new Date()), 1000);

  return (
    <div style={{ marginLeft: "auto" }}>
      <Clock value={value} size={90} renderNumbers={true} />
    </div>
  );
};
