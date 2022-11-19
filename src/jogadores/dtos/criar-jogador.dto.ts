import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class CriaJogadorDto{
    @IsNotEmpty()
    readonly telefoneCelular:string;
    @IsEmail()
    readonly email:string;
    @IsString()
    readonly nome:string;
   
}