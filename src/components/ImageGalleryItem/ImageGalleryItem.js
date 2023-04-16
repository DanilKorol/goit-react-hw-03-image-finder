import PropTypes from 'prop-types';

import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { largeImageURL, webformatURL, tags },
  onClick,
}) => {
  return (
    <Item onClick={() => onClick(largeImageURL)}>
      <Image src={webformatURL} alt={tags} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
