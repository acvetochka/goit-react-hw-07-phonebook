import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
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
  state.contactsItem.unshift(action.payload);
};

const handleDeleteContactsFulfilled = (state, action) => {
  console.log(action.payload.id);
  state.isLoading = false;
  const deleteIdx = state.contactsItem.findIndex(
    contact => contact.id === action.payload.id
  );
  console.log(deleteIdx);
  state.contactsItem.splice(deleteIdx, 1);
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
);

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;

export const contactReducer = contactsSlice.reducer;
