import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriaJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

   constructor(@InjectModel('Jogador') private readonly jogadorModel:Model<Jogador>){}
   private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto:CriaJogadorDto):Promise<void>{
       
      const{email} =criaJogadorDto
      const jogadorEncotrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncotrado){
             await this.atualizar(criaJogadorDto)
        }else {
            await this.criar(criaJogadorDto);
        }
       
    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
       return await this.jogadorModel.find().exec()
    }

    async consultarJogadorPeloEmail(email:string): Promise<Jogador>{
        const jogadorEncotrado = await this.jogadorModel.findOne({email}).exec();
        if(!jogadorEncotrado){
            throw new NotFoundException(`Jogador ${email} não encotrado`)
        }
        return jogadorEncotrado

    }

    async deletarJogador(email):Promise<any>{
      return await this.jogadorModel.remove({email}).exec(); 
    }

    private async criar(criaJogadorDto:CriaJogadorDto): Promise<Jogador>{
        const{nome, telefoneCelular,email} = criaJogadorDto
        const jogadorCriado = new this.jogadorModel(criaJogadorDto);

        return await jogadorCriado.save()

        /*
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
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)*/
    }

    private async atualizar( criaJogadorDto:CriaJogadorDto): Promise<Jogador>{
        return  await this.jogadorModel.findOneAndUpdate({email:criaJogadorDto.email},
            {$set:criaJogadorDto}).exec()
    }
}
