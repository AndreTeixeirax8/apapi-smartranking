import { Body, Controller, Post } from '@nestjs/common';
import { CriaJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(
        @Body() criaJogadorDto: CriaJogadorDto ){
            const{email} =criaJogadorDto 
        return JSON.stringify(`{
            "nome":${email}
        }`)
    }
}
