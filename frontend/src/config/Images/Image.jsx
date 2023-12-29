import PropTypes from "prop-types";

export default function Image({ imageUrl, style, active, index }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <div>
      {imageUrl && (
        <img
          style={style}
          className={`img-fluid ${
            active === index ? "active" : ""
          } `}
          src={`${apiUrl}${imageUrl}`}
          alt="Kategori Görseli"
        />
      )}
    </div>
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.number,
  index: PropTypes.number,
};
