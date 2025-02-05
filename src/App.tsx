import { Route, Routes } from "react-router-dom";

import { Container } from "./components/shared/container/container";
import { publicRoutes } from "./routes";

function App() {
  return (
    <Container>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Container>
  );
}

export default App;
