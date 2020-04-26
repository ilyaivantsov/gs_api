import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { GsService } from './gs.service';

@Controller('gs')
export class GsController {

    constructor(private readonly gsServices: GsService) { }

    @Get('/:id')
    async getListOfSheets(@Res() res,@Param('id') title) {
        // let result = [];
        let data = await this.gsServices.getData(title);
        // result.concat(Object.getOwnPropertyNames(data))
        res.status(HttpStatus.OK).json({num:data.length, data });
    }
}
