import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, User } from 'src/utils/typeorm';
import { Services } from '../utils/constants';
import { UsersController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserProfilesController } from './controllers/user-profile.controller';
import { UserProfileService } from './services/user-profile.service';
import { ImageStorageModule } from 'src/image-storage/image-storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    ImageStorageModule,
  ],
  controllers: [
    UsersController,
    UserProfilesController,
    // UserPresenceController,
  ],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    // {
    //   provide: Services.USER_PRESENCE,
    //   useClass: UserPresenceService,
    // },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    // {
    //   provide: Services.USER_PRESENCE,
    //   useClass: UserPresenceService,
    // },
  ],
})
export class UsersModule {}
