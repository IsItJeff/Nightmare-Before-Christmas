import React from "react";
import { UserProvider } from "./contexts/UserContext";
import { Nav } from "./components/Nav.view/Nav.component";

export default function App() {
  return (
    <UserProvider>
      <Nav />
    </UserProvider>
  );
}
