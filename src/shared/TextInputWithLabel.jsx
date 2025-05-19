import styled from 'styled-components';

const StyledTextInputWithLabel = styled.input`
  margin: 0.2em 0.8em;
  padding: 0.1em 0.4em;
`;

function TextInputWithLabel({ elementId, label, onChange, value, ref }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <StyledTextInputWithLabel
        type="text"
        id={elementId}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </>
  );
}

export default TextInputWithLabel;
