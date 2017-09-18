export interface ToolTipConfig {
    width?: number;
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
    content?: string;
    links?: ToolTipContentLink[];
    buttons?: ToolTipContentLink[];
}

export interface ToolTipContentLink {
    title: string;
    androidOnClick: android.view.View.OnClickListener;
}

export type ToolTipPosition = "top" | "bottom";
export type ToolTipViewType = "native";
