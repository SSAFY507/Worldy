import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import IntroPage from "./routes/IntroPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<IntroPage />} />
    </Route>,
  ),
);

export default router;