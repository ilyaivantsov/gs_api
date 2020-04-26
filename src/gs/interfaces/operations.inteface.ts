export interface Operations {
    readonly Id: string;
    readonly OperationDescription: string;
    readonly Start: number;
    readonly End: number;
    readonly InputQuantity: number;
    readonly OutputQuantity: number;
    readonly ResourceGroupId: string;
    readonly OperationCode: number;
    readonly ProductionTime: string;
    readonly RoutingStepId: string;
}