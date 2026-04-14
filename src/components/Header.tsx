import { HeaderClock } from "./HeaderClock";

export const Header = () => {
  return (
    <header className="header">
      <h1 className="headerTitle">GitHub Explorer</h1>
      <HeaderClock />
    </header>
  );
};
