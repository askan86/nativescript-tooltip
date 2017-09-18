import { View } from 'ui/core/view';
import { ToolTipConfig } from "./tooltip.common";
export declare class ToolTip {
    private popup;
    private layout;
    private content;
    private arrow;
    private config;
    private anchor;
    constructor(view: View, config: ToolTipConfig);
    show(x: number, y: number): void;
    private prepareContent(isArrowBottom);
    private getContentLayout(config);
    private getContentTitle(title);
    private getContentHR();
    private getContentText(text);
    private getContentLink(link);
    private getContentButton(button);
    private getArrowView(width, isReverse);
    private getButtonBackground(borderWidth, borderHeight, borderThickness);
}
