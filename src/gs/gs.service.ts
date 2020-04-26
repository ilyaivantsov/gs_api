import { Injectable, Inject } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Connection } from './interfaces/connection.interface';

import { Cols } from './interfaces/cols.interface';
import { SupplyOrder } from './interfaces/supplyOrder.interface';
import { Operations } from './interfaces/operations.inteface';
import { ResourceGroupPeriod } from './interfaces/resourcegroupperiod.interface';
import { Routrings } from './interfaces/routrings.interface';
import { RoutringSteps } from './interfaces/routringsteps.interface';

@Injectable()
export class GsService {
    private docs: Map<string, any> = new Map();

    constructor(@Inject('GOOGLE_CONNECTION') private readonly connection: Connection) {
        this.build().catch(err => console.error(err));
    }

    public async getData(title: string) {
        let data = await this.getDataRows(title);
        switch (title) {
            case 'cols':
                return this.prepareCols(data);
            case 'supplyorders':
                return this.prepareSupplyOrders(data);
            case 'operations':
                return this.prepareOperations(data);
            case 'resourcegroupperiod':
                return this.prepareResourceGroupPeriod(data);
            case 'routrings':
                return this.prepareRoutrings(data);
            case 'routringsteps':
                return this.prepareRoutringSteps(data);
            default:
                return [];
        }

    }

    private prepareCols(data: Array<any>): Cols[] {
        let colsArray: Cols[] = data.map(cols => {
            return {
                COLAlloc: cols.COLAlloc,
                Quantity: cols.Quantity,
                MinQuantity: cols.MinQuantity,
                MaxQuantity: cols.MaxQuantity,
                RoutingId: cols.RoutingId,
                ProductId: cols.ProductId,
                ProductName: cols.ProductName,
                LatestDesiredDeliveryDate: new Date(cols.LatestDesiredDeliveryDate).getTime(),
                ProductSpecificationId: cols.ProductSpecificationId,
                ResourceGroupIds: cols.ResourceGroupIds,
                ImgPlannedStatus: cols.ImgPlannedStatus
            }
        });
        return colsArray;
    }

    private prepareSupplyOrders(data: Array<any>): SupplyOrder[] {
        let supplyOrderArray: SupplyOrder[] = data.map(so => {
            return {
                ID: so['ID план. зак.'],
                ProductName: so['Название продукта'],
                ProductId: so.ProductId,
                Quantity: so['Кол-во'],
                IDStore: so['ID склада'],
                PlannedStatus: so['Planned Status'],
                Vid_Product: so.Vid_Product,
                ProductIdFull: so.ProductIdFull,
                RoutingId: so.RoutingId,
                DownstreamCustomerOrders: so.DownstreamCustomerOrders,
                Start: new Date(so['Начало']).getTime(),
                End: new Date(so['Окончание']).getTime(),
                EdgeDate: new Date(so['Крайняя дата']).getTime()
            }
        });
        return supplyOrderArray;
    }

    private prepareOperations(data: Array<any>): Operations[] {
        let operationsArray: Operations[] = data.map(op => {
            return {
                Id: op.Id,
                OperationDescription: op.OperationDescription,
                Start: new Date(op.Start).getTime(),
                End: new Date(op.End).getTime(),
                InputQuantity: op.InputQuantity,
                OutputQuantity: op.OutputQuantity,
                ResourceGroupId: op.ResourceGroupId,
                OperationCode: op.OperationCode,
                ProductionTime: op.ProductionTime,
                RoutingStepId: op.RoutingStepId,
            }
        });
        return operationsArray;
    }

    private prepareResourceGroupPeriod(data: Array<any>): ResourceGroupPeriod[] {
        let arrayRGP: ResourceGroupPeriod[] = data.map(rgp => {
            return {
                ResourceGroupID: rgp.ResourceGroupID,
                Id: rgp.Id,
                AvailableCapacity: rgp.AvailableCapacity,
                FreeCapacity: rgp.FreeCapacity,
                Start: new Date(rgp.Start).getTime(),
                HasFiniteCapacity: rgp.HasFiniteCapacity
            }
        });
        return arrayRGP;
    }

    private prepareRoutrings(data: Array<any>): Routrings[] {
        let arrayRoutrings: Routrings[] = data.map(rg => {
            return {
                RoutingId: rg.RoutingId,
                InputProductId: rg.InputProductId,
                OutputProductId: rg.OutputProductId,
                InputStockingPointId: rg.InputStockingPointId,
                OutputStockingPointId: rg.OutputStockingPointId
            }
        });
        return arrayRoutrings;
    }

    private prepareRoutringSteps(data: Array<any>): RoutringSteps[] {
        let arrayRoutringSteps: RoutringSteps[] = data.map(rs => {
            return {
                RoutingStepId: rs.RoutingStepId,
                SequenceNr: rs.SequenceNr,
                RoutingId: rs.RoutingId,
                ResourceGroupId: rs.ResourceGroupId,
                Yield: rs.Yield,
                IdPlant: rs.IdPlant
            }
        });
        return arrayRoutringSteps;
    }

    private async getDataRows(title: string) {
        const sheet = this.docs.get(title);
        let data = await sheet.getRows();
        return data;
    }

    private async build(): Promise<void> {
        const {
            client_secret,
            spreadsheet_id,
            spreadsheet_id_routringsteps
        } = this.connection;
        const doc = new GoogleSpreadsheet(spreadsheet_id);
        const doc_routringsteps = new GoogleSpreadsheet(spreadsheet_id_routringsteps);
        await doc.useServiceAccountAuth({
            client_email: client_secret.client_email,
            private_key: client_secret.private_key,
        });
        await doc_routringsteps.useServiceAccountAuth({
            client_email: client_secret.client_email,
            private_key: client_secret.private_key,
        });
        await doc.loadInfo();
        await doc_routringsteps.loadInfo();
        this.docs.set(doc_routringsteps.sheetsByIndex[0].title, doc_routringsteps.sheetsByIndex[0]);
        doc.sheetsByIndex.forEach(sh => {
            this.docs.set(sh.title, sh);
        });
    }
}