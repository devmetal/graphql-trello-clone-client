import styled from 'styled-components';

const Button = styled.button`
  color: ${props => props.theme.colors.btn};
  font-size: 1em;
  margin: ${props => props.fullWidth ? '0' : '0.5em'};
  padding: 0.25em 1em;
  border: 2px solid ${props => props.theme.colors.btn};
  border-radius: ${props => props.theme.border.radius};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  cursor: pointer;
`

export default Button;
