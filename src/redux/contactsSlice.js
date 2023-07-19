import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const initialState = {
  // contactsItem: [
  // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ],
  contactsItem: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const handleFetchContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.contactsItem = action.payload;
};

const handleAddContactsFulfilled = (state, action) => {
  state.isLoading = false;
  // state.error = null;
  state.contactsItem.unshift(action.payload);
};

const handleDeleteContactsFulfilled = (state, action) => {
  console.log(action.payload.id);
  state.isLoading = false;
  // state.error = null;
  // return {
  const deleteIdx = state.contactsItem.findIndex(
    contact => contact.id === action.payload.id
  );
  console.log(deleteIdx);
  state.contactsItem.splice(deleteIdx, 1);
  // contactsItem: state.contactsItem.filter(
  //   contact => contact.id !== action.payload
  // ),
  // };
};

export const contactsSlice = createSlice(
  {
    name: 'contacts',
    initialState,
    extraReducers: builder =>
      builder
        .addCase(fetchContacts.pending, handlePending)
        .addCase(fetchContacts.fulfilled, handleFetchContactsFulfilled)
        .addCase(fetchContacts.rejected, handleRejected)
        .addCase(addContact.pending, handlePending)
        .addCase(addContact.fulfilled, handleAddContactsFulfilled)
        .addCase(addContact.rejected, handleRejected)
        .addCase(deleteContact.pending, handlePending)
        .addCase(deleteContact.fulfilled, handleDeleteContactsFulfilled)
        .addCase(deleteContact.rejected, handleRejected),
  }
  // reducers: {
  //   fetchingInProgress(state) {
  //     state.isLoading = true;
  //   },
  //   fetchingSuccess(state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.contactsItem = action.payload;
  //   },
  //   fetchingError(state, action) {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
  // reducers: {
  //   addContact: {
  //     reducer(state, action) {
  //       state.contactsItem.push(action.payload);
  //     },
  //     prepare(name, number) {
  //       return {
  //         payload: {
  //

  //           name,
  //           number,
  //         },
  //       };
  //     },
  //   },
  //   deleteContact(state, action) {
  //     return {
  //       contactsItem: state.contactsItem.filter(
  //         contact => contact.id !== action.payload
  //       ),
  //     };
  //   },
  // },
);

// export const contactReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

// export const { addContact, deleteContact } = contactsSlice.actions;

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;

export const contactReducer = contactsSlice.reducer;
