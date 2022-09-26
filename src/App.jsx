import { BrowserRouter } from "react-router-dom";
import Pages from "./Pages";
import { useState, useMemo } from "react";
import { UserContext } from "./UserContext";
function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={providerValue}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
