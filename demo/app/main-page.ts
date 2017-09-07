/// <reference path="../../node_modules/tns-platform-declarations/android/android.d.ts" />

import * as observable from 'data/observable';
import * as pages from 'ui/page';
import {HelloWorldModel} from './main-view-model';
import {ToolTip} from "nativescript-tooltip";
import {EventData} from "data/observable";
import * as app from "application";
import {TextView} from "ui/text-view";
import {Color} from "color";
// Event handler for Page 'loaded' event attached in main-page.xml

const view = null;

export function pageLoaded(args: any) {
    // Get the event sender
    this.view = args.object.nativeView;
    console.log(view);
}

export function pushIt(args) {
    const popup = new android.widget.PopupWindow();

    const layout = new android.widget.LinearLayout(app.android.context);

    const bg = new android.graphics.drawable.ColorDrawable(0xFFFF00FF);
    const twTitle = new android.widget.TextView(app.android.context);
    const anchor = <android.view.View>args.object.nativeView;

    twTitle.setText('Hello i am a title');
    layout.addView(twTitle);
    popup.setBackgroundDrawable(bg);
    popup.setContentView(layout);
    popup.setWidth(200);
    popup.setWindowLayoutMode(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT)
    console.log(layout.getMeasuredHeight())
    console.log(layout.getMinimumHeight())
    popup.showAtLocation(args.object.nativeView, android.view.Gravity.BOTTOM, 0, 0);

    const location: native.Array<number> = new native.Array<number>();
    console.log(anchor.getLocationOnScreen(location))

    // const location: native.Array<number> = new native.Array<number>();
    // console.log(anchor.getLocationOnScreen(location))
    // console.log(location)
//    const t = new ToolTip(args.object, {
//         text: prepareContent(),
//         position: "top",
//         // hideArrow: false,
//         // textColor: "white",
//         // backgroundColor: "blue",
//         style: "CustomToolTipLayoutStyle",
//         width:400,
//         callback: {
//             onTooltipClose: (tooltip: any, fromUser: boolean, containsTouch: boolean) => {
//                 console.log('onTooltipClose');
//             },
//             onTooltipFailed: (view: any) => {
//                 console.log('onTooltipClose');
//             },
//             onTooltipHidden: (view: any) => {
//                 console.log('onTooltipHidden');
//             },
//             onTooltipShown: (view: any) => {
//                 console.log('onTooltipShown');
//             }
//         }
//     });
//     t.show();
}

function prepareContent() {
    const elements: string[] = [];
    elements.push('Hoi');
    elements.push('<span style="text-decoraction: underline">x</span>')
    elements.push('<hr />');
    elements.push('<br />');
    elements.push('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');

    elements.push('<a nsRouterLink="/secure/welcome" title="">Here is a link</a>');
    return elements.join('');
}