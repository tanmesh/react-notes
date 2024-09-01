import styled from 'styled-components';

/**
 * A styled button component.
 * 
 * It automatically injects the component's props as an argument.
 */
export const StyledButton = styled.button`
    background-color: ${(props) => props.variant === 'outline' ? '#FFF' : '#4caf50'};
    color: ${(props) => props.variant === 'outline' ? '#4caf50' : '#FFF'};
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    cursor: pointer;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`

/**
 * Extending the StyledButton component to create a new component.
 */
export const FancyButton = styled(StyledButton)`
    background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
    border: none;
`
