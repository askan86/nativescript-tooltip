"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("application");
var ToolTip = (function () {
    function ToolTip(view, config) {
        this.config = config;
        this.anchor = view;
        this.popup = new android.widget.PopupWindow();
        this.layout = new android.widget.LinearLayout(app.android.context);
    }
    ToolTip.prototype.show = function (offsetX, offsetY) {
        this.prepareContent(this.popup.isAboveAnchor());
        this.popup.showAsDropDown(this.anchor.android, offsetX, offsetY);
        this.content.setClickable(true);
        this.content.setOnClickListener(this.config.onClick);
        if (this.popup.isAboveAnchor()) {
            this.layout.addView(this.content);
            this.layout.addView(this.getArrowView(50, true));
        }
        else {
            this.layout.addView(this.getArrowView(50, false));
            this.layout.addView(this.content);
        }
        this.popup.update();
    };
    ToolTip.prototype.hide = function () {
        if (this.popup.isShowing()) {
            this.popup.dismiss();
        }
    };
    ToolTip.prototype.prepareContent = function (isArrowBottom) {
        this.arrow = this.getArrowView(50, isArrowBottom);
        this.content = this.getContentLayout(this.config);
        this.layout.setOrientation(1);
        this.content.setOrientation(1);
        this.content.setLayoutParams(new android.view.ViewGroup.LayoutParams(this.config.width, this.config.height - 10));
        if (this.config.onDismiss) {
            this.popup.setOnDismissListener(this.config.onDismiss);
        }
        this.popup.setContentView(this.layout);
        this.popup.setWidth(this.config.width);
        this.popup.setHeight(this.config.height);
        this.popup.setOutsideTouchable(true);
        this.popup.setTouchable(true);
        this.popup.setWindowLayoutMode(this.config.width, this.config.height);
    };
    ToolTip.prototype.getContentLayout = function (config) {
        var wrapper = new android.widget.LinearLayout(app.android.context);
        var scrollView = new android.widget.ScrollView(app.android.context);
        var content = new android.widget.LinearLayout(app.android.context);
        content.setPadding(20, 30, 20, 30);
        content.setOrientation(1);
        wrapper.setBackgroundColor(android.graphics.Color.BLACK);
        scrollView.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, android.view.ViewGroup.LayoutParams.FILL_PARENT));
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
                for (var i = 0; i < config.content.links.length; i++) {
                    content.addView(this.getContentLink(config.content.links[i]));
                }
            }
            if (config.content.buttons) {
                for (var i = 0; i < config.content.buttons.length; i++) {
                    content.addView(this.getContentButton(config.content.buttons[i]));
                }
            }
        }
        scrollView.addView(content);
        wrapper.addView(scrollView);
        return wrapper;
    };
    ToolTip.prototype.getContentTitle = function (title) {
        var twTitle = new android.widget.TextView(app.android.context);
        twTitle.setText(title);
        twTitle.setTextColor(android.graphics.Color.WHITE);
        twTitle.setPadding(0, 0, 0, 10);
        twTitle.setClickable(false);
        twTitle.setOnClickListener(this.config.onClick);
        return twTitle;
    };
    ToolTip.prototype.getContentHR = function () {
        var hr = new android.view.View(app.android.context);
        hr.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, 1));
        hr.setBackgroundColor(android.graphics.Color.WHITE);
        hr.setPadding(0, 5, 0, 5);
        hr.setClickable(false);
        hr.setOnClickListener(this.config.onClick);
        return hr;
    };
    ToolTip.prototype.getContentText = function (text) {
        var twContent = new android.widget.TextView(app.android.context);
        twContent.setText(text);
        twContent.setTextColor(android.graphics.Color.WHITE);
        twContent.setPadding(0, 10, 0, 0);
        twContent.setClickable(false);
        twContent.setOnClickListener(this.config.onClick);
        return twContent;
    };
    ToolTip.prototype.getContentLink = function (link) {
        var twLink = new android.widget.TextView(app.android.context);
        twLink.setText(link.title);
        twLink.setTextColor(android.graphics.Color.rgb(66, 178, 214));
        twLink.setPadding(0, 5, 0, 5);
        twLink.setOnClickListener(link.androidOnClick);
        return twLink;
    };
    ToolTip.prototype.getContentButton = function (button) {
        var twButton = new android.widget.TextView(app.android.context);
        twButton.setText(button.title);
        twButton.setTextColor(android.graphics.Color.WHITE);
        twButton.setPadding(5, 5, 5, 5);
        twButton.setTextAlignment(4);
        twButton.setOnClickListener(button.androidOnClick);
        twButton.setBackgroundDrawable(this.getButtonBackground(100, 50, 1).getDrawable());
        return twButton;
    };
    ToolTip.prototype.getArrowView = function (width, isReverse) {
        var view = new android.widget.ImageView(app.android.context);
        var bitmap = android.graphics.Bitmap.createBitmap(width, width / 4, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(bitmap);
        var path = new android.graphics.Path();
        var paint = new android.graphics.Paint();
        paint.setColor(android.graphics.Color.BLACK);
        if (isReverse) {
            path.moveTo(0, 0);
            path.lineTo(width, 0);
            path.lineTo(width / 2, width / 4);
            path.lineTo(0, 0);
        }
        else {
            path.moveTo(width / 2, 0);
            path.lineTo(width, width / 4);
            path.lineTo(0, width / 4);
            path.lineTo(width / 2, 0);
        }
        path.close();
        canvas.drawPath(path, paint);
        view.setImageBitmap(bitmap);
        return view;
    };
    ToolTip.prototype.getButtonBackground = function (borderWidth, borderHeight, borderThickness) {
        var view = new android.widget.ImageView(app.android.context);
        var bitmap = android.graphics.Bitmap.createBitmap(borderWidth - (borderThickness * 2), borderHeight - (borderThickness * 2), android.graphics.Bitmap.Config.ARGB_8888);
        var path = new android.graphics.Path();
        var paint = new android.graphics.Paint();
        var canvas = new android.graphics.Canvas(bitmap);
        paint.setStyle(android.graphics.Paint.Style.FILL);
        paint.setColor(android.graphics.Color.WHITE);
        canvas.drawRect(0, 0, borderWidth, borderHeight, paint);
        var solidColor = android.graphics.Bitmap.createBitmap(borderWidth, borderHeight, android.graphics.Bitmap.Config.ARGB_8888);
        canvas = new android.graphics.Canvas(solidColor);
        paint.setStyle(android.graphics.Paint.Style.FILL);
        paint.setColor(android.graphics.Color.WHITE);
        canvas.drawRect(0, 0, borderWidth, borderHeight, paint);
        canvas.drawRoundRect(new android.graphics.RectF(0, 0, borderWidth, borderHeight), 20, 20, paint);
        var borderBitmap = android.graphics.Bitmap.createBitmap(borderWidth, borderHeight, android.graphics.Bitmap.Config.ARGB_8888);
        canvas = new android.graphics.Canvas(borderBitmap);
        var clearPaint = new android.graphics.Paint();
        clearPaint.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.CLEAR));
        canvas.drawBitmap(solidColor, 0, 0, null);
        canvas.drawBitmap(bitmap, borderThickness, borderThickness, clearPaint);
        clearPaint.setXfermode(null);
        var borderView = new android.widget.ImageView(app.android.context);
        borderView.setImageBitmap(borderBitmap);
        return borderView;
    };
    return ToolTip;
}());
exports.ToolTip = ToolTip;
//# sourceMappingURL=tooltip.android.js.map