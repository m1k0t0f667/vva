import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "./Pages/Page";
import Page2 from "./Pages/Pages2";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/simu2" element={<Page2 />} />
    </Routes>
  );
};

export default AppRoutes;
