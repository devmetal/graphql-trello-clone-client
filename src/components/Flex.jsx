import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-basis: ${props => props.flexBasis || 'auto'};
  justify-content: ${props => props.justifyContent || 'auto'};
`;

const FlexItem = styled.div`
  flex-basis: ${props => props.flexBasis || 'auto'}
`;

export { Flex, FlexItem };
