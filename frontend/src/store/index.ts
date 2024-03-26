import { configureStore } from '@reduxjs/toolkit'
import conversationReducer from './conversationsSlice'
import messageReducer from './Messages/messageSlice'
import selectedTypeReducer from './selectedSlice';
import groupsReducer from './groupSlice';
import groupMessagesReducer from './groupMessagesSlice';
import messageContainerReducer from './messageContainerSlice';
import groupSidebarReducer from './groupRecipientsSidebarSlice';
import friendsReducer from './friends/friendsSlice';
import rateLimitReducer from './rate-limit/rateLimitSlice';
import settingsReducer from './settings/settingsSlice';

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        messages: messageReducer,
        selectedConversationType: selectedTypeReducer,
        groups: groupsReducer,
        groupMessages: groupMessagesReducer,
        messageContainer: messageContainerReducer,
        groupSidebar: groupSidebarReducer,
        friends: friendsReducer,
        rateLimit: rateLimitReducer,
        settings: settingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch