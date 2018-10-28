import PropTypes from 'prop-types';
import TicketType from './Ticket';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tickets: PropTypes.arrayOf(TicketType),
});
