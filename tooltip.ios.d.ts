import { ToolTipConfig } from "./tooltip.common";
export declare class ToolTip {
    private tip;
    private config;
    private view;
    constructor(view: any, config: ToolTipConfig);
    show(x: number, y: number): void;
}
