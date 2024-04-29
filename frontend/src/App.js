import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLibrary from "./components/createlibrary";
import AdminCreateAccount from "./components/admincreateaccount";
import ReaderCreateAccount from "./components/readercreateaccount";
import Index from "./components";
import Admin from "./components/admin";
import Reader from "./components/reader";
import AddBook from "./components/addbook";
import "./App.css";
import DeleteLibrary from "./components/deletelibrary";
import AdminFunctions from "./components/adminfunctions";
import RemoveBook from "./components/removebook";
import UpdateBook from "./components/updatebook";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/owner/createlibrary" element={<CreateLibrary />} />
          <Route path="/owner/deletelibrary" element={<DeleteLibrary />} />
          <Route path="/admincreateaccount" element={<AdminCreateAccount />} />
          <Route
            path="/readercreateaccount"
            element={<ReaderCreateAccount />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reader" element={<Reader />} />
          <Route path="/admin/addbook" element={<AddBook />} />
          
          <Route path="/admin/adminfunctions" element={<AdminFunctions/>}/>
          <Route path="/admin/removebook" element={<RemoveBook/>}/>
          <Route path="/admin/updatebook" element={<UpdateBook/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
