function TextInputWithLabel({ elementId, label, onChange, value, ref }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
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
