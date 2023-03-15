import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './SearchContact.styled';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue, getFilterValue } from 'redux/filters/filtersSlice';
function SearchContact() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const changeFilter = e => {
    dispatch(setFilterValue(e.target.value));
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={changeFilter}
        value={filterValue}
      />
    </Search>
  );
}
SearchContact.propTypes = {
  changeFilter: PropTypes.func,
  value: PropTypes.string,
};

export default SearchContact;
