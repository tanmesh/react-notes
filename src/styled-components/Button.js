import styled from 'styled-components';

/**
 * A styled button component.
 * 
 * It automatically injects the component's props as an argument.
 */
export const StyledButton = styled.button`
    background-color: ${(props) => props.variant === 'outline' ? '#FFF' : '#04AA6D'};
    color: ${(props) => props.variant === 'outline' ? '#04AA6D' : '#FFF'};
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 1px;
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


export const SubmitButton = styled(StyledButton).attrs({
    type: 'submit'
})`
    background-color: #4caf50;
    color: #FFF;
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

export const DarkButton = styled(StyledButton)`
    border: 2px solid ${(props) => props.theme.dark.primary};
    background-color: ${(props) => props.theme.dark.primary};
    color: ${(props) => props.theme.dark.text};
`