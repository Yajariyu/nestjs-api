import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
// import { User, BookMark } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return {
      msg: 'Sign up',
    };
  }
  signin() {
    return {
      msg: 'Sign in',
    };
  }
}
