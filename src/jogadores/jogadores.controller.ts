import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriaJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService)
    {}

    @Post()
    async criarAtualizarJogador(
        @Body() criaJogadorDto: CriaJogadorDto ){
              
          await this.jogadoresService.criarAtualizarJogador(criaJogadorDto);  
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{

        return this.jogadoresService.consultarTodosJogadores();
    }
}
