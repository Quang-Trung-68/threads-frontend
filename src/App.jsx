import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/App.css";
import { ROUTES } from "@/routes";


function App() {
  return (
    <Router>
      <Routes>
        {ROUTES.map((rou, index) => {
          const Layout = rou.layout;
          return (
            <Route key={index} element={<Layout />}>
              {rou.children.map((child, index) => {
                const Element = child.element;
                return (
                  <Route key={index} path={child.path} element={<Element />} />
                );
              })}
            </Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
