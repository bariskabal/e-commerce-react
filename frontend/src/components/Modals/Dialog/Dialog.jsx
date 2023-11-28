import "./Dialog.css";
import Proptypes from "prop-types"
import {useEffect} from "react"

export default function Dialog({ isDialogShow, setIsDialogShow }) {

    const handleCloseDialog = (e) => {
        const checked = e.target.checked
        localStorage.setItem("dialog",JSON.stringify(!checked))
    }

    useEffect(() => {
      
    }, [isDialogShow])
    

  return (
    <div className={`modal-dialog ${isDialogShow ? "show" : ""}`}>
      <div className="modal-content">
        <button onClick={() => setIsDialogShow(false)} className="modal-close">
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-image">
          <img src="/img/modal-dialog.jpg" alt="" />
        </div>
        <div className="popup-wrapper">
          <div className="popup-content">
            <div className="popup-title">
              <h3>NEWSLETTER</h3>
            </div>
            <p className="popup-text">
              Sign up to our newsletter and get exclusive deals you won find any
              where else straight to your inbox!
            </p>
            <form className="popup-form">
              <input type="text" placeholder="Enter Email Address Here" />
              <button className="btn btn-primary">SUBSCRIBE</button>
              <label>
                <input onChange={handleCloseDialog} type="checkbox" />
                <span >Don`t show this popup again</span>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsDialogShow(false)}
        className="modal-overlay"
      ></div>
    </div>
  );
}

Dialog.propTypes = {
    isDialogShow: Proptypes.bool,
    setIsDialogShow: Proptypes.func
}
