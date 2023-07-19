import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchContacts, deleteContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';
import {
  ContactListStyled,
  ContactItem,
  ContactData,
  ButtonDelete,
} from './ContactList.styled';

export function ContactList() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const { contactsItem, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contactsItem.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getFilterContact();

  return (
    <ContactListStyled>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {contactsItem.length > 0 &&
        visibleContacts.map(({ id, name, phone }) => (
          <ContactItem key={id}>
            <ContactData>
              {name}: <span>{phone}</span>
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
