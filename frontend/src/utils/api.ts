import axios from "axios";
import { AcceptFriendRequestResponse,CancelFriendRequestResponse, AddGroupRecipientParams, Conversation, ConversationType, CreateConversationParams, CreateGroupParams, CreateUserParams, DeleteGroupMessageParams, DeleteGroupMessageResponse, DeleteMessageParams, DeleteMessageResponse, EditMessagePayload, FetchGroupMessagePayload, FetchMessagePayload, Friend, FriendRequest, Group, GroupMessageType, MessageType, RemoveGroupRecipientParams, UpdateGroupDetailsPayload, UpdateGroupOwnerParams, UpdateStatusParams, User, UserCredentialsParams, CreateMessageParams1} from "./types";

const API_URL = "http://localhost:3001/api";

let config = {
  headers: {
    authorization: ''
  }
}
                                    
export const updateToken = () => {
  const token = window.localStorage.getItem('accessToken');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
};

const axiosClient = axios.create({ baseURL: API_URL });

export const postRegisterUser = async (data: CreateUserParams) =>
  axiosClient.post("/auth/register", data);
  
export const postLoginUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data);
    
export const logoutUser = () => axiosClient.post('/auth/logout', config);

export const getUser = () => axiosClient.get<User>(`/users`, config);

export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const getConversations = () =>
  axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationById = (id: number) =>
  axiosClient.get<ConversationType>(`/conversations/${id}`, config);

export const getConversationMessages = (conversationId: number) =>
  axiosClient.get<FetchMessagePayload>(
    `/conversations/${conversationId}/messages`,
    config
  );

export const createMessage = ( id: string, type: ConversationType, data: CreateMessageParams1 ) => {
  const url = type === 'private' ? `/conversations/${id}/messages` : `/groups/${id}/messages`;
  console.log(data)
  return axiosClient.post(url, data, config);
};

export const postNewConversation = (data: CreateConversationParams) =>
  axiosClient.post<Conversation>(`/conversations`, data, config);

  export const deleteMessage = ({ id, messageId }: DeleteMessageParams) =>
  axiosClient.delete<DeleteMessageResponse>(
    `/conversations/${id}/messages/${messageId}`, config
  );

export const editMessage = ({ content, id, messageId }: EditMessagePayload) =>
  axiosClient.patch<MessageType>(
    `/conversations/${id}/messages/${messageId}`, { content }, config
  );

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const createGroup = (params: CreateGroupParams) =>
  axiosClient.post(`/groups`, params, config);

export const removeGroupRecipient = ({
  id,
  userId,
}: RemoveGroupRecipientParams) =>
  axiosClient.delete<Group>(`/groups/${id}/recipients/${userId}`, config);

export const updateGroupOwner = ({ id, newOwnerId }: UpdateGroupOwnerParams) =>
  axiosClient.patch(`/groups/${id}/owner`, { newOwnerId }, config);

export const leaveGroup = (id: number) =>
  axiosClient.delete(`/groups/${id}/recipients/leave`, config);

export const updateGroupDetails = ({ id, data }: UpdateGroupDetailsPayload) =>
  axiosClient.patch<Group>(`/groups/${id}/details`, data, config);

export const fetchGroupById = (id: number) =>
  axiosClient.get<Group>(`/groups/${id}`, config);


export const fetchGroupMessages = (id: number) =>
  axiosClient.get<FetchGroupMessagePayload>(`/groups/${id}/messages`, config);

export const deleteGroupMessage = ({
  id,
  messageId,
}: DeleteGroupMessageParams) =>
  axiosClient.delete<DeleteGroupMessageResponse>(
    `/groups/${id}/messages/${messageId}`,
    config
  );

export const editGroupMessage = ({
  content,
  id,
  messageId,
}: EditMessagePayload) =>
  axiosClient.patch<GroupMessageType>(
    `/groups/${id}/messages/${messageId}`,
    { content },
    config
  );

export const addGroupRecipient = ({ id, recipentId }: AddGroupRecipientParams) =>
  axiosClient.post(`/groups/${id}/recipients`, { recipentId }, config);

export const updateStatusMessage = (data: UpdateStatusParams) =>
  axiosClient.patch('/users/presence/status', data, config);

export const fetchFriends = () => axiosClient.get<Friend[]>('/friends', config);

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>('/friends/requests', config);

export const createFriendRequest = (username: string) =>
  axiosClient.post<FriendRequest>('/friends/requests', { username }, config);

export const cancelFriendRequest = (id: number) =>
  axiosClient.delete<CancelFriendRequestResponse>(
    `/friends/requests/${id}/cancel`,
    config
  );

export const acceptFriendRequest = (id: number) =>
  axiosClient.patch<AcceptFriendRequestResponse>(
    `/friends/requests/${id}/accept`,
    {},
    config
  );

export const rejectFriendRequest = (id: number) =>
  axiosClient.patch<FriendRequest>(
    `/friends/requests/${id}/reject`,
    {},
    config
  );

export const removeFriend = (id: number) =>
  axiosClient.delete<Friend>(`/friends/${id}/delete`, config);

export const checkConversationOrCreate = (recipientId: number) =>
  axiosClient.get<Conversation>(`/exists/conversations/${recipientId}`, config);

export const completeUserProfile = (data: FormData) =>
  axiosClient.post('/users/profiles', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const checkUsernameExists = (username: string) =>
  axiosClient.get(`/users/check?username=${username}`, config);

export const updateUserProfile = (data: FormData) =>
  axiosClient.patch<User>('/users/profiles', data, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

