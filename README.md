# NativeScript ToolTip

Nativescript implementation for android PopupWindow.


## Install
`npm install ninjaonsafari/nativescript-tooltip --save`

## Usage
#### View / Template
``` 
<Label
    style="color: #ff00ff"
    text="hit me"
    (tap)="toggleTooltip($event)"></Label>

```

#### TypeScript
```ts
import {ToolTip} from "nativescript-tooltip";

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

    const parentHeight = parentView.getHeight();
    const x = anchorView.getX() + parentView.getX();
    const y = (parentHeight - anchorView.getY()) + getBarHeight();
    
    if ((parentHeight / 2) < anchorView.getY()) {
        this.tooltip.show(x, y); // showAtLocation
    } else {
        this.tooltip.show(); // showAsDropdown
    }
}
```