import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Proptypes from "prop-types";
import Search from "../components/Modals/Search/Search";
import { useState, useEffect } from "react";
import Dialog from "../components/Modals/Dialog/Dialog";

export default function MainLayout({ children }) {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

      setTimeout(() => {
        setIsDialogShow(dialogStatus);
      }, 3000);
  }, []); // buradaki arrayin boş olması useEffectin sadece sayfa yüklendiğinde calısmasını sağlar

  return (
    <div className="main-layout">
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: Proptypes.node,
};
