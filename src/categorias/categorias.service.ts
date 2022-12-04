import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel:Model<Categoria>,
        private readonly jogadoresService :JogadoresService
    ){}

    async criarCategoria(criarCategoriaDto:CriarCategoriaDto):Promise<Categoria>{

        const {categoria} = criarCategoriaDto
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if(categoriaEncontrada){
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
        }
        const categoriaCriada =  new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();

    }

    async consultarTodasCategorias(): Promise<Array<Categoria>>{
        return await this.categoriaModel.find().populate("jogadores").exec();
    }

    async consutarCategoriaPeloId(categoria:string):Promise<Categoria>{
        const  categoriaEncotrada =  await this.categoriaModel.findOne({categoria}).exec();

        if(!categoriaEncotrada){
            throw new NotFoundException('Categoria informada não existe')
        }
        return categoriaEncotrada;

    }

    async atualizarCategoria(categoria:string,atualizarCategoriaDto:AtualizarCategoriaDto):Promise<void>{

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if(!categoria){
            throw new NotFoundException('Categoria não encotrada')
        }

        await this.categoriaModel.findOneAndUpdate({categoria},{$set:atualizarCategoriaDto}).exec()

    }

    async atribuirCategoriaJogador(params:string[]):Promise<void>{

        const  categoria= params['categoria']
        const idJogador = params['idJogador']

        const categoriaEncotrada = await this.categoriaModel.findOne({categoria}).exec()

        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec()

        await this.jogadoresService.consultarJogadorPeloId(idJogador);

        //const jogadorJaCadastrado

        if(!categoriaEncotrada){
            throw new BadRequestException(`Categoria não encotrada`)
        }

        if(jogadorJaCadastradoCategoria.length>0){
            throw new  BadRequestException(`Jogador já cadastrado na categoria `)
        }

        categoriaEncotrada.jogadores.push(idJogador)

        await this.categoriaModel.findOneAndUpdate({categoria},{$set:categoriaEncotrada}).exec()

        

    }

}
