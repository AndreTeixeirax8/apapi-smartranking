import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

   constructor(@InjectModel('Jogador') private readonly jogadorModel:Model<Jogador>){}
   private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(criarJogadorDto:CriarJogadorDto):Promise<Jogador>{
       
      const{email} =criarJogadorDto
      const jogadorEncotrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncotrado){
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
        }
            
            const jogadorCriado = new this.jogadorModel(criarJogadorDto);
            return await jogadorCriado.save()
        
       
    }

    async atualizarJogador(_id:string, atualizarJogadorDto:AtualizarJogadorDto):Promise<void>{
       
        const jogadorEncotrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncotrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
  
                 await this.jogadorModel.findOneAndUpdate({_id},
                {$set:atualizarJogadorDto}).exec()
          
         
      }

    async consultarTodosJogadores(): Promise<Jogador[]>{
       return await this.jogadorModel.find().exec()
    }

    async consultarJogadorPeloId(_id:string): Promise<Jogador>{
        const jogadorEncotrado = await this.jogadorModel.findOne({_id}).exec();
        if(!jogadorEncotrado){
            throw new NotFoundException(`Jogador ${_id} não encotrado`)
        }
        return jogadorEncotrado

    }

    async deletarJogador(_id):Promise<any>{
        const jogadorEncotrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncotrado){
            throw new NotFoundException(`Jogador ${_id} não encotrado`)
        }

      return await this.jogadorModel.deleteOne({_id}).exec(); 
    }


}
