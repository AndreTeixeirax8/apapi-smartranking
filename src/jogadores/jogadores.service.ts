import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriaJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from'uuid'

@Injectable()
export class JogadoresService {

    private jogadores:Jogador[] = [];

   private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto:CriaJogadorDto):Promise<void>{
       
        const{email} =criaJogadorDto
        const jogadorEncotrado = await this.jogadores.find(jogador => jogador.email === email)

        if(jogadorEncotrado){
             await this.atualizar(jogadorEncotrado,criaJogadorDto)
        }else {
            await this.criar(criaJogadorDto);
        }
       
    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadores;
    }

    async consultarJogadorPeloEmail(email:string): Promise<Jogador>{
        const jogadorEncotrado = await this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncotrado){
            throw new NotFoundException(`Jogador ${email} não encotrado`)
        }
        return jogadorEncotrado

    }

    async deletarJogador(email){
        const jogadorEncotrado = await this.jogadores.find(jogador => jogador.email === email)
        this.jogadores= this.jogadores.filter(jogador => jogador.email !== jogadorEncotrado.email)   
    }

    private criar(criaJogadorDto:CriaJogadorDto): void{
        const{nome, telefoneCelular,email} = criaJogadorDto

        const jogador:Jogador ={
            _id:uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking:'A',
            posicaoRanking: 1,
            urlFotoJogador: 'teste'
        };
        this.jogadores.push(jogador);
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
    }

    private atualizar(jogadorEncotrado: Jogador, criaJogadorDto:CriaJogadorDto): void{
        const { nome } = criaJogadorDto
        jogadorEncotrado.nome =nome;

    }
}
