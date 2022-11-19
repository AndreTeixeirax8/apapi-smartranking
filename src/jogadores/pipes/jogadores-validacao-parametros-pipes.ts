import { ArgumentMetadata, PipeTransform,BadRequestException } from "@nestjs/common";

export class JogadoresValidacaoParametrosPipe implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata) {

        if(!value){
            throw new BadRequestException(`o valor ${metadata.data} deve ser informado`)
        }

        return value
        
    }

}