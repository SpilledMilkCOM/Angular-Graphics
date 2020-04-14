export interface ITimer {
    timeout: number;

    doEvent(): void;
}