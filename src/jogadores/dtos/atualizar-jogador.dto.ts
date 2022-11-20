import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class AtualizarJogadorDto{
    @IsNotEmpty()
    readonly telefoneCelular:string;

    @IsString()
    readonly nome:string;
   
}