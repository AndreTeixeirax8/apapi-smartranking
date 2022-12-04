import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [JogadoresModule,MongooseModule.
    forRoot('mongodb://localhost/smart',{useNewUrlParser: true, useUnifiedTopology: true}), CategoriasModule, DesafiosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
