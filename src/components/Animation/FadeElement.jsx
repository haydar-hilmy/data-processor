import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
0% {
    opacity: 0;
    }
100% {
    opacity: 1;
  }
`;

const FadeInCustom = styled.div`
animation: ${fadeIn} ${props => props.duration || '0.5s'} ${props => props.timing_function || 'linear'} 1;
opacity: 1;
`;

export default FadeInCustom;


