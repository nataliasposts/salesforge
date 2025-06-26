import React from "react";
import type { ReactNode } from "react";

type AppProps = {
  children: ReactNode;
};

const App: React.FC<AppProps> = ({ children }: AppProps) => {
  return <div>{children}</div>;
};

export default App;
