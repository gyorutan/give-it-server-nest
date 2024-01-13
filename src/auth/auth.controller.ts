import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('username/:username')
  async validateUsername(@Param('username') username: string) {
    return this.authService.findUsername(username);
  }

  @Get('studentId/:studentId')
  async validateStudentId(@Param('studentId') studentId: string) {
    return this.authService.findStudentId(studentId);
  }

  @Post('signup')
  async signUp(@Body() body: {signupFormdata : User}) {
    return this.authService.createUser(body);
  }

  @Post('login')
  async logIn(@Body() body: {loginFormdata : User}) {
    return this.authService.userLogin(body);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string) {
  //   return this.authService.update(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
