export interface SupplyOrder {
    readonly ID: string;
    readonly ProductId: string;
    readonly ProductName: string;
    readonly Vid_Product: string;
    readonly Quantity: number;
    readonly IDStore: string;
    readonly PlannedStatus: string;
    readonly ProductIdFull: string;
    readonly RoutingId: string;
    readonly DownstreamCustomerOrders: string;
    readonly Start: number;
    readonly End: number;
    readonly EdgeDate: number;
}