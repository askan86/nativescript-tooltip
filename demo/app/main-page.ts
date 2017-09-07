import * as observable from 'data/observable';
import * as pages from 'ui/page';
import {HelloWorldModel} from './main-view-model';
import {ToolTip} from "nativescript-tooltip";
import {EventData} from "data/observable";
import * as app from "application";
import {TextView} from "ui/text-view";
import {Color} from "color";
// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function pushIt(args) {
   const t = new ToolTip(args.object, {
        text: prepareContent(),
        position: "top",
        // hideArrow: false,
        // textColor: "white",
        // backgroundColor: "blue",
        style: "CustomToolTipLayoutStyle",
        width:400,
        callback: {
            onTooltipClose: (tooltip: any, fromUser: boolean, containsTouch: boolean) => {
                console.log('onTooltipClose');
            },
            onTooltipFailed: (view: any) => {
                console.log('onTooltipClose');
            },
            onTooltipHidden: (view: any) => {
                console.log('onTooltipHidden');
            },
            onTooltipShown: (view: any) => {
                console.log('onTooltipShown');
            }
        }
    });
    t.show();
}

function prepareContent() {
    const elements: string[] = [];
    elements.push('Hoi');
    elements.push('<span style="float: right; text-align: right">x</span>')
    elements.push('<hr />');
    elements.push('<br />');
    elements.push('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');

    elements.push('<a nsRouterLink="/secure/welcome" title="">Here is a link</a>');
    return elements.join('');
}