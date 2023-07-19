import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import { Container, FilterLabel, FilterInput } from './Filter.styled';


export function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChangeFilter = evt => {
    dispatch(setFilter(evt.target.value));
  };

  return (
    <Container>
      <FilterLabel>
        Find contact by name
        <FilterInput type="text" onChange={onChangeFilter} value={filter} />
      </FilterLabel>
    </Container>
  );
}

