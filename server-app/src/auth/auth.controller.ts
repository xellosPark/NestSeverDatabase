import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) authDto: AuthDto){
        return this.authService.signup(authDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authDto: AuthDto){
        return this.authService.signin(authDto);
    }

    
    @Get('/refresh')
    //사용자 정의 파라미터 데코레이터 사용 @GetUser()
    @UseGuards(AuthGuard)
    refresh(@GetUser() user: User){
        return this.authService.refreshToken(user);
    }
}
