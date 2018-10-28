import PropTypes from 'prop-types';
import CommentType from './Comment';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(CommentType),
});
