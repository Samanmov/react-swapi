import React from "react";
import ReactDOM from "react-dom";
import * as _ from "lodash";
import closeIcon from "../../assets/icons/close.svg";
import "./MovieDetails.css";

const MovieDetails = ({ movie, onClose, isShowing, actors }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <div>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <h1 className="modal-title"> {movie.title} </h1>
                <img
                  className="closeButton"
                  onClick={onClose}
                  aria-label="Close"
                  alt="close"
                  src={closeIcon}
                />
              </div>

              <div>
                <div className="card">
                  <div className="serial-info-row">
                    <div>
                      {_.sortBy(actors, "name").map((x) => {
                        return <div key={x.created}> {x.name}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default MovieDetails;
