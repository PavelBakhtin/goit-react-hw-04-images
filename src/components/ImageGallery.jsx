export const ImageGallery = galleryImages => {
  return (
    <ul className="gallery">
      {galleryImages.map(({ id, webformatURL }) => (
        <li key={id} className="gallery-item">
          <img src={webformatURL} alt="" />
        </li>
      ))}
    </ul>
  );
};
