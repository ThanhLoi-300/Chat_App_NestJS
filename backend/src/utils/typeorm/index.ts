import { Session } from './entities/Session';
import { User } from './entities/User';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { MessageAttachment } from './entities/MessageAttachment';
import { Group } from './entities/Group';
import { GroupMessage } from './entities/GroupMessage';
import { GroupMessageAttachment } from './entities/GroupMessageAttachment';
import { Friend } from './entities/Friend';
import { FriendRequest } from './entities/FriendRequest';
import { Profile } from './entities/Profile';
import { UserPresence } from './entities/UserPresence';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  MessageAttachment,
  Group,
  GroupMessage,
  GroupMessageAttachment,
  Friend,
  FriendRequest,
  Profile,
  UserPresence,
];
export {
  User,
  Session,
  Conversation,
  Message,
  MessageAttachment,
  Group,
  GroupMessage,
  GroupMessageAttachment,
  Friend,
  FriendRequest,
  Profile,
  UserPresence,
};

export default entities;
