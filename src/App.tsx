import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/searchBar/searchBar"


import SearchResultsPage from "./pages/searchResultPage";
import ProductDetailsPage from "./pages/productDetailPage";
function App() {

  return (
    <div className="parent">
      <div className="divBar"><SearchBar></SearchBar></div>
      <div className="divContent">
        <Routes>
          <Route path="/items" element={<SearchResultsPage />} />
          <Route path="/items/:id" element={<ProductDetailsPage />} />
        </Routes>

      </div>
    </div>
  )
}

export default App
