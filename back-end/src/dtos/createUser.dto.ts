import { IsString, IsEmail } from 'class-validator';

class CreateUserDto {
    @IsString()
    public firstName: string;
    
    @IsString()
    public lastName: string;

    @IsString()
    public userName: string;

    @IsString()
    public password: string;

    @IsEmail()
    public email: string;
}

export default CreateUserDto;