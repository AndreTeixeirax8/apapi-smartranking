import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriaJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros-pipes';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService)
    {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criaJogadorDto: CriaJogadorDto ){
          await this.jogadoresService.criarJogador(criaJogadorDto);  
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() criaJogadorDto: CriaJogadorDto,
        @Param('_id',JogadoresValidacaoParametrosPipe)_id:string):Promise<void>{
          await this.jogadoresService.atualizarJogador(_id,criaJogadorDto);  
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
      
            return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadorPeloId(@Param('_id',JogadoresValidacaoParametrosPipe) id:string): Promise<Jogador>{
        
            return await this.jogadoresService.consultarJogadorPeloId(_id);
       
        
    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id',JogadoresValidacaoParametrosPipe) _id:string):Promise<void>{
        this.jogadoresService.deletarJogador(_id)
    }
}
