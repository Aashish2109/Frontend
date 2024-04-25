import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLibrary from "./components/createlibrary";
import AdminCreateAccount from "./components/admincreateaccount";
import ReaderCreateAccount from "./components/readercreateaccount";
import Index from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/createlibrary" element={<CreateLibrary />} />
          <Route path="/admincreateaccount" element={<AdminCreateAccount />} />
          <Route
            path="/readercreateaccount"
            element={<ReaderCreateAccount />}
          />
          {/* <Route path="/addbook" element={<AddBook />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
