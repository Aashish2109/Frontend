import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLibrary from "./components/owner/createlibrary";
import DeleteLibrary from "./components/owner/deletelibrary";
import Admin from "./components/admin/admin";
import AdminCreateAccount from "./components/admin/admincreateaccount";
import AdminFunctions from "./components/admin/adminfunctions";
import AddBook from "./components/admin/addbook";
import UpdateBook from "./components/admin/updatebook";
import RemoveBook from "./components/admin/removebook";
import Reader from "./components/reader/reader";
import ReaderCreateAccount from "./components/reader/readercreateaccount";
import Index from "./components";
import "./App.css";
import ReaderFunctions from "./components/reader/readerfunctions";
import SearchBook from "./components/reader/searchbook";
import ErrorPage from "./components/error/errorpage";

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
          <Route path="/reader/readerfunctions" element={<ReaderFunctions/>}/>
          <Route path="/reader/searchbook" element={<SearchBook/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
