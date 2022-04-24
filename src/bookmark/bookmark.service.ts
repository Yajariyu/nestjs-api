import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookMark,
  EditBookMark,
} from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(id: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: id,
      },
    });
  }
  async getBookmarkById(id: number) {
    const book =
      await this.prisma.bookmark.findUnique({
        where: {
          id,
        },
      });
    return book;
  }

  async createBookmark(
    id: number,
    dto: CreateBookMark,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          userId: id,
          ...dto,
        },
      });

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    id: number,
    dto: EditBookMark,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id,
        },
      });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException(
        'Acess to resources denied',
      );
    }
    return this.prisma.bookmark.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteBookMarkId(id: number) {
    await this.prisma.bookmark.delete({
      where: {
        id,
      },
    });
  }
}
