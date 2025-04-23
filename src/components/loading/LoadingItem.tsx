"use client";
import ClipLoader from "react-spinners/ClipLoader";
import "./loading.css";

const LoadingItem = () => {
  return (
    <div className="overlay__loading--item">
      <div className="sweet-loading-item">
        <ClipLoader
          color="#ff3333"
          loading={true}
          cssOverride={{
            display: "block",
            margin: "0 auto",

            zIndex: 999,

            borderWidth: "10px",
          }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default LoadingItem;
