/// <reference path='../../node_modules/tns-core-modules/tns-core-modules.d.ts' />
/// <reference path='../../node_modules/tns-platform-declarations/android/android.d.ts' />

import { HelloWorldModel } from './main-view-model';
import { ToolTip, ToolTipConfig, ToolTipPosition } from 'nativescript-tooltip';
import * as app from 'application';
import * as frame from 'ui/frame';
import { View } from 'ui/core/view';
import * as LabelModule from 'ui/label';
import * as StackLayoutModule from 'ui/layouts/stack-layout';
import { EventData } from 'data/observable';
// Event handler for Page 'loaded' event attached in main-page.xml

const view = null;
const tooltip: ToolTip;

export function pageLoaded(args: any) {
    // Get the event sender
    this.view = args.object.nativeView;
}

export function pushIt(args: EventData) {
    const anchor = <View>args.object;
    const parent = <View>anchor.parent;

    this.tooltip = new ToolTip(anchor, {
        width: 300,
        onDismiss: new android.widget.PopupWindow.OnDismissListener({
            onDismiss: () => {
                console.log('popup window hidden');
            }
        }),
        content: {
            title: 'Popup Window Title',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
            links: [
                {
                    title: 'This is a link',
                    androidOnClick: new android.view.View.OnClickListener({
                        onClick: (view: any) => {
                            console.log('This is a clicked link');
                        }
                    })
                }
            ],
            buttons: [
                {
                    title: 'I am a button',
                    androidOnClick: new android.view.View.OnClickListener({
                        onClick: (view: any) => {
                            console.log('I am a clicked button');
                        }
                    })
                }
            ]
        },
    });

    const anchorView = <android.view.View>anchor.android;
    const parentView = <android.view.View>parent.android;

    const res = app.android.context.getResources();
    //.getDrawable(R.drawable.AppThemeRoundedCornerButton);
    console.log(res);
    console.log(res.getIdentifier("AppThemeRoundedCornerButton", "drawable", app.android.context.getPackageName()));
    console.log(app.android.context.getPackageName());
    // console.log(android.);
    

    // const asdf = new android.view.getWindow
    const parentHeight = parentView.getHeight();
    const x = anchorView.getX() + parentView.getX();
    const y = (parentHeight - anchorView.getY()) + getBarHeight();
    console.log((parentHeight / 2) + ' ' + anchorView.getY());
    
    if ((parentHeight / 2) < anchorView.getY()) {
        this.tooltip.show(x, y);
    } else {
        this.tooltip.show();
    }
}

export function getBarHeight(): number {
    const windowManager = <android.view.WindowManager>app.android.context.getSystemService(android.content.Context.WINDOW_SERVICE);
    const metrics = new android.util.DisplayMetrics();
    windowManager.getDefaultDisplay().getMetrics(metrics)
    const usableHeight = metrics.heightPixels;
    windowManager.getDefaultDisplay().getRealMetrics(metrics);
    const realHeight = metrics.heightPixels;
    return realHeight - usableHeight;
}