import PropTypes from 'prop-types';

import { Btn } from './Button.styled';

export const Button = ({ onClick, totalImages, total }) => {
  return (
    <Btn
      type="button"
      onClick={onClick}
      disabled={total > totalImages ? false : true}
    >
      {total > totalImages ? 'Load more' : 'No more images'}
    </Btn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  totalImages: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
