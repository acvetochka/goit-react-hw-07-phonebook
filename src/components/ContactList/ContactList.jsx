import { useDispatch, useSelector } from 'react-redux';

import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import {
  ContactListStyled,
  ContactItem,
  ContactData,
  ButtonDelete,
} from './ContactList.styled';

export function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getFilterContact();

  return (
    <ContactListStyled>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <ContactData>
            {name}: <span>{number}</span>
          </ContactData>
          <ButtonDelete
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </ButtonDelete>
        </ContactItem>
      ))}
    </ContactListStyled>
  );
}
