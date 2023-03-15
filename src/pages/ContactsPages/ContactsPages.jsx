import { LinearProgress, Fab } from '@mui/material';
import Contacts from 'modules/Contacts/Contacts';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { useGetContactsQuery } from 'redux/api/contacts/contacts/contactsApi';
import DialogAddContact from 'modules/DialogAddContact/DialogAddContact';
export default function ContactsPages() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { data: contacts, isFetching } = useGetContactsQuery();

  const onClose = () => {
    setIsOpenDialog(false);
  };
  return (
    <main>
      <section>
        {isFetching && <LinearProgress />}
        {contacts && <Contacts contacts={contacts} />}
        <Fab
          sx={{ position: 'sticky', bottom: 20 }}
          aria-label={'Add contact'}
          color={'primary'}
          onClick={() => {
            setIsOpenDialog(true);
          }}
        >
          <Add />
        </Fab>
        <DialogAddContact
          isOpen={isOpenDialog}
          onClose={onClose}
          contacts={contacts}
        />
      </section>
    </main>
  );
}
