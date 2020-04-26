export interface ResourceGroupPeriod {
    readonly ResourceGroupID: string;
    readonly Id: string;
    readonly AvailableCapacity: string;
    readonly FreeCapacity: string;
    readonly Start: number;
    readonly HasFiniteCapacity: boolean;
}