import { Dispatch, FC, useContext, useEffect, useState } from 'react';
import { GroupRecipientsField } from '../recipients/GroupRecipientsField';
import {
    InputContainer,
    InputLabel,
    TextField,
    Button,
    RecipientChipContainer,
    InputField,
} from '../../utils/styles';
import styles from './index.module.scss';
import { User } from '../../utils/types';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { searchUsers } from '../../utils/api';
import { createGroupThunk } from '../../store/groupSlice';
import { RecipientResultContainer } from '../recipients/RecipientResultContainer';
import { SelectedGroupRecipientChip } from '../recipients/SelectedGroupRecipientChip';
import { AuthContext } from '../../utils/context/AuthContext';

type Props = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateGroupForm: FC<Props> = ({ setShowModal }) => {
    const [title, setTitle] = useState('');
    const { user } = useContext(AuthContext)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);
    const [selectedRecipients, setSelectedRecipients] = useState<User[]>([]);
    const [searching, setSearching] = useState(false);
    const debouncedQuery = useDebounce(query, 1000);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedQuery) {
            setSearching(true);
            searchUsers(debouncedQuery)
                .then(({ data }) => {
                    console.log(data);
                    setResults(data);
                })
                .catch((err) => console.log(err))
                .finally(() => setSearching(false));
        }
    }, [debouncedQuery]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedRecipients.length === 0 || !title) return;
        const users = selectedRecipients.map((user) => user.id);
        return dispatch(createGroupThunk({ title, users, creator: user! }))
            .unwrap()
            .then(({ data }) => {
                console.log(data);
                console.log('done');
                setShowModal(false);
                navigate(`/groups/${data.id}`);
            })
            .catch((err) => console.log(err));
    };

    const handleUserSelect = (user: User) => {
        const exists = selectedRecipients.find((u) => u.id === user.id);
        if (!exists) setSelectedRecipients((prev) => [...prev, user]);
    };

    const removeUser = (user: User) =>
        setSelectedRecipients((prev) => prev.filter((u) => u.id !== user.id));

    return (
        <form className={styles.createConversationForm} onSubmit={onSubmit}>
            <RecipientChipContainer>
                {selectedRecipients.map((user) => (
                    <SelectedGroupRecipientChip user={user} removeUser={removeUser} />
                ))}
            </RecipientChipContainer>
            <GroupRecipientsField setQuery={setQuery} />
            {results.length > 0 && query && (
                <RecipientResultContainer
                    userResults={results}
                    handleUserSelect={handleUserSelect}
                />
            )}
            <section className={styles.message}>
                <InputContainer backgroundColor="#161616">
                    <InputLabel>Title</InputLabel>
                    <InputField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </InputContainer>
            </section>
            <Button>Create Conversation</Button>
        </form>
    );
};