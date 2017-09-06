export interface ToolTipConfig {
    position?: ToolTipPosition;
    text: string;
    viewType?: ToolTipViewType;
    duration?: number;
    fadeDuration?: number;
    width?: number;
    delay?: number;
    hideArrow?: boolean;
    backgroundColor?: string;
    textColor?: string;
    style?: string;
    callback?: ToolTipCallback;
}
export interface ToolTipCallback {
    onTooltipClose(tooltip: any, fromUser: boolean, containsTouch: boolean): void;
    onTooltipFailed(view: any): void;
    onTooltipShown(view: any): void;
    onTooltipHidden(view: any): void;
}
export declare type ToolTipPosition = "left" | "up" | "right" | "down" | "top" | "bottom";
export declare type ToolTipViewType = "native";
