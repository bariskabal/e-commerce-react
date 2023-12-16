import PropTypes from "prop-types";

export default function Image({ imageUrl, style }) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    return (
      <div>
        {imageUrl && <img style={style} src={`${apiUrl}${imageUrl}`} alt="Kategori Görseli" />}
      </div>
    );
  }
  
  Image.propTypes = {
    imageUrl: PropTypes.string,
    style: PropTypes.object
  };
  
  