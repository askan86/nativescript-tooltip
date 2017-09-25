export interface ToolTipConfig {
    width?: number;
    height?: number;
    onClick?: android.view.View.OnClickListener;
    onDismiss?: android.widget.PopupWindow.OnDismissListener;
    callback?: ToolTipCallback;
    content?: ToolTipContent;
}
export interface ToolTipCallback {
    onTooltipClose(tooltip: any, fromUser: boolean, containsTouch: boolean): void;
    onTooltipFailed(view: any): void;
    onTooltipShown(view: any): void;
    onTooltipHidden(view: any): void;
}
export interface ToolTipContent {
    title?: string;
    showBorder?: boolean;
    content?: string;
    linksTitle?: string;
    links?: ToolTipContentLink[];
    buttons?: ToolTipContentLink[];
}
export interface ToolTipContentLink {
    title: string;
    androidOnClick: android.view.View.OnClickListener;
}
export declare type ToolTipPosition = "top" | "bottom";
export declare type ToolTipViewType = "native";
