/// <reference path='../../node_modules/tns-core-modules/tns-core-modules.d.ts' />
/// <reference path='../../node_modules/tns-platform-declarations/android/android.d.ts' />

import { HelloWorldModel } from './main-view-model';
import { ToolTipConfig, ToolTipPosition } from 'nativescript-tooltip';
import * as app from 'application';
import * as frame from 'ui/frame';
import { View } from 'ui/core/view';
import * as LabelModule from 'ui/label';
import * as StackLayoutModule from 'ui/layouts/stack-layout';
import { EventData } from 'data/observable';

export function pageLoaded(args: any) {
    // Get the event sender
    this.view = args.object.nativeView;
}

export function pushIt(args: EventData) {
    const anchor = <View>args.object;
    const parent = <View>anchor.parent;

    this.tooltip = new ToolTip(anchor, {
        width: 300,
        height: 300,
        onClick: new android.view.View.OnClickListener({
            onClick: () => {
                console.log('onClick');
            }
        }),
        onDismiss: new android.widget.PopupWindow.OnDismissListener({
            onDismiss: () => {
                console.log('popup window hidden');
            }
        }),
        content: {
            title: 'Popup Window Title',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
        },
    });

    const anchorView = <android.view.View>anchor.android;
    const parentView = <android.view.View>parent.android;
    this.tooltip.show();
}

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

    public show(offsetX?: number, offsetY?: number) {
        this.prepareContent(this.popup.isAboveAnchor());
        this.popup.showAsDropDown(this.anchor.android, offsetX, offsetY);
        this.content.setClickable(true);
        this.layout.setClickable(true);
        this.layout.setFocusable(true);
        this.content.setFocusable(true);
        this.content.setOnClickListener(this.config.onClick);
        this.layout.setOnClickListener(this.config.onClick);
        console.log(this.config.onClick)

        if (this.popup.isAboveAnchor()) {
            this.layout.addView(this.content);
            this.layout.addView(this.getArrowView(50, true))
        } else {
            this.layout.addView(this.getArrowView(50, false));
            this.layout.addView(this.content);
        }

        this.popup.update();
    }

    public hide() {
        if (this.popup.isShowing()) {
            this.popup.dismiss();
        }
    }

    private prepareContent(isArrowBottom: boolean) {
        // prepare content
        this.arrow = this.getArrowView(50, isArrowBottom);
        this.content = this.getContentLayout(this.config);
        this.layout.setOrientation(1);
        this.content.setOrientation(1);
        this.content.setLayoutParams(new android.view.ViewGroup.LayoutParams(this.config.width, this.config.height - 10));

        // prepare popup
        if (this.config.onDismiss) {
            this.popup.setOnDismissListener(this.config.onDismiss);
        }

        this.popup.setContentView(this.layout);
        this.popup.setWidth(this.config.width);
        this.popup.setHeight(this.config.height);
        this.popup.setOutsideTouchable(true);
        this.popup.setTouchable(true);
        // this.popup.setover
        this.popup.setWindowLayoutMode(
            this.config.width,
            this.config.height);
    }

    private getContentLayout(config: ToolTipConfig): android.widget.LinearLayout {
        const wrapper = new android.widget.LinearLayout(app.android.context);
        const scrollView = new android.widget.ScrollView(app.android.context);
        const content = new android.widget.LinearLayout(app.android.context);
        content.setPadding(20, 30, 20, 30);
        content.setOrientation(1);
        content.setBackgroundColor(android.graphics.Color.BLACK);

        if (config.content) {
            if (config.content.title) {
                content.addView(this.getContentTitle(config.content.title));
                if (config.content.showBorder) {
                    content.addView(this.getContentHR());
                }
            }

            if (config.content.content) {
                content.addView(this.getContentText(config.content.content));
            }

            if (config.content.links && config.content.links.length > 0) {
                if (config.content.linksTitle) {
                    content.addView(this.getContentText(config.content.linksTitle));
                }

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

        scrollView.addView(content);
        scrollView.setClickable(true);
        scrollView.setFocusable(true);
        scrollView.setOnClickListener(this.config.onClick);
        wrapper.addView(scrollView);
        return wrapper;
    }

    private getContentTitle(title: string): android.widget.TextView {
        const twTitle = new android.widget.TextView(app.android.context);
        twTitle.setText(title);
        twTitle.setTextColor(android.graphics.Color.WHITE);
        twTitle.setPadding(0, 0, 0, 10);
        // twTitle.setOnClickListener(this.config.onClick);
        twTitle.setClickable(false);
        return twTitle;
    }

    private getContentHR(): android.view.View {
        const hr = new android.view.View(app.android.context);
        hr.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, 1));
        hr.setBackgroundColor(android.graphics.Color.WHITE);
        hr.setPadding(0, 5, 0, 5);
        // hr.setOnClickListener(this.config.onClick);        
        hr.setClickable(false);
        return hr;
    }

    private getContentText(text: string): android.widget.TextView {
        const twContent = new android.widget.TextView(app.android.context);
        twContent.setText(text);
        twContent.setTextColor(android.graphics.Color.WHITE);
        twContent.setPadding(0, 10, 0, 0);
        // twContent.setOnClickListener(this.config.onClick);
        twContent.setClickable(false);
        return twContent;
    }

    private getContentLink(link: ToolTipContentLink) {
        const twLink = new android.widget.TextView(app.android.context);
        twLink.setText(link.title);
        twLink.setTextColor(android.graphics.Color.rgb(66, 178, 214));
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
        const bitmap = android.graphics.Bitmap.createBitmap(borderWidth - (borderThickness * 2), borderHeight - (borderThickness * 2), android.graphics.Bitmap.Config.ARGB_8888);
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
        canvas.drawRoundRect(new android.graphics.RectF(0, 0, borderWidth, borderHeight), 20, 20, paint);

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