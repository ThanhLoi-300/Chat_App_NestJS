import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { WebsocketAdapter } from './gateway/gateway.adapter';
import { Session } from './utils/typeorm';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

async function bootstrap() {
  const {PORT, COOKIE_SECRET} = process.env
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const sessionRepository = getRepository(Session);
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app.setGlobalPrefix('api')
  app.enableCors({origin: 'http://localhost:5173', credentials: true})
  app.useGlobalPipes(new ValidationPipe())

  app.use(session({
    secret: COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    name: "CHAT_APP_SESION_ID",
    cookie: {
      maxAge: 86400000 // expires 1day 
    },
    store: new TypeormStore().connect(sessionRepository),
  }))

  app.use(passport.initialize())
  app.use(passport.session())
  try {
    await app.listen(PORT, ()=> console.log(`Running on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
bootstrap();
