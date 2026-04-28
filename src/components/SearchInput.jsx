import PropTypes from 'prop-types';

function SearchInput({ value, onChange }) {
  return (
    <>
      <h3>Improved components Example</h3>
      <input value={value} onChange={onChange} placeholder="Search..." />
    </>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;