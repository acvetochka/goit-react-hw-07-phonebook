import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getError, getIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
// import { getContacts } from 'redux/selectors';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Section } from 'components/Section/Section';
import { Container } from './App.styled';

export function App() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getContacts);
  // const error = useSelector(getError);

  // const { contactsItem, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Container>
      {/* {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      <p>{contactsItem.length > 0 && JSON.stringify(contactsItem, null, 2)}</p> */}
      <Section title={'Phonebook'}>
        <ContactForm />
      </Section>
      {isLoading && !error && <b>Request in progress...</b>}
      <Section title={'Contacts'}>
        <Filter />
        <ContactList />
      </Section>
    </Container>
  );
}

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks } from 'redux/operations';
// import { getTasks } from 'redux/selectors';
// export const App = () => {
//   const dispatch = useDispatch();
//   // Отримуємо частини стану
//   const { items, isLoading, error } = useSelector(getTasks);
//   // Викликаємо операцію
//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);
//   // Рендерим розмітку в залежності від значень у стані
//   return (
//     <div>
//       {isLoading && <p>Loading tasks...</p>}
//       {error && <p>{error}</p>}
//       <p>{items.length > 0 && JSON.stringify(items, null, 2)}</p>
//     </div>
//   );
// };
