import * as app from "application";

import { View } from 'ui/core/view';
import { ToolTipConfig, ToolTipContentLink, ToolTipPosition } from "./tooltip.common";

export class ToolTip {
    private popup: android.widget.PopupWindow;
    private layout: android.widget.LinearLayout;
    private content: android.widget.LinearLayout;
    private arrow: android.widget.ImageView;
    private config: ToolTipConfig;
    private anchor: View;

    constructor(view: View, config: ToolTipConfig) {
        this.config = config;
        this.anchor = view;
        this.popup = new android.widget.PopupWindow();
        this.layout = new android.widget.LinearLayout(app.android.context);   
    }

    public show(x?: number, y?: number) {
        if (x >= 0 && y >= 0) {
            this.prepareContent(true);
            this.popup.showAtLocation(
                this.anchor.parent.android,
                android.view.Gravity.BOTTOM|android.view.Gravity.LEFT,
                x, y);
        } else {
            this.prepareContent(false);
            this.popup.showAsDropDown(this.anchor.android);
        }
    }

    private prepareContent(isArrowBottom: boolean) {
        // prepare content
        this.arrow = this.getArrowView(50, isArrowBottom);
        this.content = this.getContentLayout(this.config);
        this.content.setOrientation(1);

        // prepare layout
        this.layout.setOrientation(1);
        if (isArrowBottom) {
            this.layout.addView(this.content);
            this.layout.addView(this.arrow);
        } else {
            this.layout.addView(this.arrow);
            this.layout.addView(this.content);
        }

        // prepare popup
        if (this.config.onDismiss) {
            this.popup.setOnDismissListener(this.config.onDismiss);
        }

        this.popup.setContentView(this.layout);
        this.popup.setWidth(this.config.width)
        this.popup.setOutsideTouchable(true);
        this.popup.setTouchable(true);
        // this.popup.setover
        this.popup.setWindowLayoutMode(
            this.config.width,
            android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private getContentLayout(config: ToolTipConfig): android.widget.LinearLayout {
        const content = new android.widget.LinearLayout(app.android.context);
        content.setPadding(20, 30, 20, 30);
        content.setBackgroundColor(android.graphics.Color.BLACK);

        if (config.content) {
            if (config.content.title) {
                content.addView(this.getContentTitle(config.content.title));
                content.addView(this.getContentHR());
            }

            if (config.content.content) {
                content.addView(this.getContentText(config.content.content));
            }

            if (config.content.links) {
                for (let i = 0; i < config.content.links.length; i++) {
                    content.addView(this.getContentLink(config.content.links[i]));
                }
            }

            if (config.content.buttons) {
                for (let i = 0; i < config.content.buttons.length; i++) {
                    content.addView(this.getContentButton(config.content.buttons[i]));
                }
            }
        }

        return content;
    }

    private getContentTitle(title: string): android.widget.TextView {
        const twTitle = new android.widget.TextView(app.android.context);
        twTitle.setText(title);
        twTitle.setTextColor(android.graphics.Color.WHITE);
        twTitle.setPadding(0, 0, 0, 10);
        return twTitle;
    }

    private getContentHR(): android.view.View {
        const hr = new android.view.View(app.android.context);
        hr.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, 1));
        hr.setBackgroundColor(android.graphics.Color.WHITE);
        hr.setPadding(0, 5, 0, 5);
        return hr;
    }

    private getContentText(text: string): android.widget.TextView {
        const twContent = new android.widget.TextView(app.android.context);
        twContent.setText(text);
        twContent.setTextColor(android.graphics.Color.WHITE);
        twContent.setPadding(0, 10, 0, 0);
        return twContent;
    }

    private getContentLink(link: ToolTipContentLink) {
        const twLink = new android.widget.TextView(app.android.context);
        twLink.setText(link.title);
        twLink.setTextColor(android.graphics.Color.BLUE);
        twLink.setPadding(0, 5, 0, 5);
        twLink.setOnClickListener(link.androidOnClick);
        return twLink;
    }

    private getContentButton(button: ToolTipContentLink) {
        const twButton = new android.widget.TextView(app.android.context);
        twButton.setText(button.title);
        twButton.setTextColor(android.graphics.Color.WHITE);
        twButton.setPadding(5, 5, 5, 5);
        twButton.setTextAlignment(4); // <= center
        twButton.setOnClickListener(button.androidOnClick);
        twButton.setBackgroundDrawable(this.getButtonBackground(100, 50, 1).getDrawable());
        return twButton;
    }

    private getArrowView(width: number, isReverse: boolean): android.widget.ImageView {
        const view = new android.widget.ImageView(app.android.context);
        const bitmap = android.graphics.Bitmap.createBitmap(width, width / 4, android.graphics.Bitmap.Config.ARGB_8888);
        const canvas = new android.graphics.Canvas(bitmap);
        const path = new android.graphics.Path();
        const paint = new android.graphics.Paint();
    
        paint.setColor(android.graphics.Color.BLACK);
    
        if (isReverse) {
            path.moveTo(0, 0);
            path.lineTo(width, 0);
            path.lineTo(width / 2, width / 4);
            path.lineTo(0, 0);
        } else {
            path.moveTo(width / 2, 0);
            path.lineTo(width, width / 4);
            path.lineTo(0, width / 4);
            path.lineTo(width / 2, 0);
        }
        
        path.close();
    
        canvas.drawPath(path, paint);
        view.setImageBitmap(bitmap);
        return view;
    }

    private getButtonBackground(borderWidth: number, borderHeight: number, borderThickness: number): android.widget.ImageView {
        const view = new android.widget.ImageView(app.android.context);
        const bitmap = android.graphics.Bitmap.createBitmap(borderWidth - (borderThickness*2), borderHeight - (borderThickness*2), android.graphics.Bitmap.Config.ARGB_8888);
        const path = new android.graphics.Path();
        const paint = new android.graphics.Paint();
        let canvas = new android.graphics.Canvas(bitmap);

        paint.setStyle(android.graphics.Paint.Style.FILL);
        paint.setColor(android.graphics.Color.WHITE);
        canvas.drawRect(0, 0, borderWidth, borderHeight, paint);

        // Create the darkness bitmap
        const solidColor = android.graphics.Bitmap.createBitmap(borderWidth, borderHeight, android.graphics.Bitmap.Config.ARGB_8888);
        canvas = new android.graphics.Canvas(solidColor);

        paint.setStyle(android.graphics.Paint.Style.FILL);
        paint.setColor(android.graphics.Color.WHITE);
        canvas.drawRect(0, 0, borderWidth, borderHeight, paint);
        canvas.drawRoundRect(new android.graphics.RectF(0,0,borderWidth, borderHeight), 20, 20, paint);

        // Create the masked version of the darknessView
        const borderBitmap = android.graphics.Bitmap.createBitmap(borderWidth, borderHeight, android.graphics.Bitmap.Config.ARGB_8888);
        canvas = new android.graphics.Canvas(borderBitmap);

        const clearPaint = new android.graphics.Paint();
        clearPaint.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.CLEAR));

        canvas.drawBitmap(solidColor, 0, 0, null);
        canvas.drawBitmap(bitmap, borderThickness, borderThickness, clearPaint);

        clearPaint.setXfermode(null);

        const borderView = new android.widget.ImageView(app.android.context);
        borderView.setImageBitmap(borderBitmap);

        return borderView;
    }
}