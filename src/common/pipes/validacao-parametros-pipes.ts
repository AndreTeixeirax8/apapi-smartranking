import { ArgumentMetadata, PipeTransform,BadRequestException } from "@nestjs/common";

export class ValidacaoParametrosPipe implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata) {

        if(!value){
            throw new BadRequestException(`o valor ${metadata.data} deve ser informado`)
        }

        return value
        
    }

}