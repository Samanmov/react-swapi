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
            <div className="modal-container">
              <div className="modal">
                <div className="modal-content">
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
                    <p className="movie-episode">
                      <label className="movie-episode-label">Episode:</label>
                      {movie.episode_id}
                    </p>
                    <h2 className="movie-characters-title">Characters</h2>
                    <div className="grid-row">
                      {_.sortBy(actors, "name").map((x) => {
                        return (
                          <div className="colum" key={x.hair_color}>
                            <div>{x.name}</div>
                          </div>
                        );
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
