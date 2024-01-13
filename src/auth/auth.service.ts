import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async findUsername(username: string) {
    console.log(username);
    const validation = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (validation) {
      return { success: false, message: 'invalid-username' };
    }

    return { success: true, message: 'valid-username', username };
  }

  async findStudentId(studentId: string) {
    console.log(studentId);
    const validation = await this.prisma.user.findUnique({
      where: {
        studentId,
      },
    });

    if (validation) {
      return { success: false, message: 'invalid-studentId' };
    }

    return { success: true, message: 'valid-studentId', studentId };
  }

  async createUser(body: { signupFormdata: User }) {
    try {
      console.log(body);
      const { name, username, studentId, password } = body.signupFormdata;

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.prisma.user.create({
        data: {
          name,
          username,
          studentId,
          email: `${studentId}` + '@shinshu-u.ac.jp',
          password: hashedPassword,
        },
      });

      console.log(createdUser);

      return { success: true, message: '가입되었습니다', createdUser };
    } catch (error) {
      console.log(error);
      return { success: false, message: '알 수 없는 오류', error: error };
    }
  }

  async userLogin(body: { loginFormdata: User }) {
    try {
      const { studentId, password } = body.loginFormdata;

      const user = await this.prisma.user.findUnique({
        where: {
          studentId,
        },
      });

      if (!user) {
        return {
          success: false,
          message: '학번 또는 비밀번호가 일치하지 않습니다',
        };
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return {
          success: false,
          message: '학번 또는 비밀번호가 일치하지 않습니다',
        };
      }

      return {
        success: true,
        message: '로그인하였습니다',
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: '알 수 없는 오류', error: error };
    }
  }
}
