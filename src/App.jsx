import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import ThreadsPage from "./pages/MainPage";
import Category from "./pages/Category";
import DetailPage from "./pages/DetailPage";
import { PostProvider } from "./contexts/PostContext"; // pastikan path-nya benar

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="container">
          <Menu />
          <Routes>
            <Route path="/" element={<ThreadsPage />} />
            <Route path="/post/:id" element={<DetailPage />} />
          </Routes>
          <Category />
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
