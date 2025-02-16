import { Suspense } from "react";
import { useAuth } from "./contexts/AuthContext";

import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  const { user, profile, loading } = useAuth();

  const handleAuth = () => {
    // This will open the auth modal in the Home component
  };
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={!!user}
                onAuth={handleAuth}
                userProfile={profile}
              />
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
