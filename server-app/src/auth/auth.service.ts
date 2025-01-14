import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async signup(authDto: AuthDto) {
        const {email, password} = authDto;

        // 암호 처리
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ email, password: hashedPassword, });
    
    }
}
