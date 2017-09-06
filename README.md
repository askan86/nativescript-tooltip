[![npm](https://img.shields.io/npm/v/nativescript-tooltip.svg)](https://www.npmjs.com/package/nativescript-tooltip)
[![npm](https://img.shields.io/npm/dt/nativescript-tooltip.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-tooltip)

# NativeScript ToolTip

## Install
`npm install ninjaonsafari/nativescript-tooltip --save`


> Note: I will deploy a npm package as soon as [@triniwiz](https://github.com/triniwiz/nativescript-tooltip) gives me the rights.

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

toggleTooltip(args: any) {
    if (!t) {
        t = new ToolTip(args.object, {
            text: 'I am a Tooltip.',
            position: 'bottom'
        });
        t.show();
    } else {
        t.hide();
    }
}
```

### Callbacks
#### Android

add the following to the tooltip config
```js
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
```

#### IOS
> Needs to be implemented

## Styling

### Android

Add the following to your styles.xml in `app/App_Resources/Android/values`
```xml
<!-- Custom ToolTip -->

    <style name="CustomToolTipLayoutStyle" parent="ToolTipLayoutDefaultStyle">
        <item name="ttlm_backgroundColor">#FFFF00</item>
        <item name="android:textColor">#000000</item>
    </style>
```

### IOS
TypeScript
```ts
import {ToolTip} from "nativescript-tooltip";
const tip = new ToolTip(view,{text:"Some Text",backgroundColor:"pink",textColor:"black"});
tip.show();  //.hide()
```
JavaScript
```js
const ToolTip = require("nativescript-tooltip").ToolTip;
const tip = new ToolTip(view,{text:"Some Text",backgroundColor:"pink",textColor:"black"});
tip.show();  //.hide()
```

### Config
```ts
const config = {
  position?: "left" | "up" | "right" | "down" | "top" | "bottom";;
  text: string;
  viewType?: "native";
  duration?: number;
  fadeDuration?: number,
  width?: number;
  delay?: number;
  hideArrow?: boolean;
  backgroundColor?: string;
  textColor?: string;
  style?:string;
  callback?: {
    onTooltipClose(tooltip: any, fromUser: boolean, containsTouch: boolean): void;
    onTooltipFailed(view: any): void;
    onTooltipShown(view: any): void;
    onTooltipHidden(view: any): void;
  }
}
```

# ScreenShots
Android | IOS
--------- | ----------
![ss](ss/tooltip_android.png?raw=true) | ![splash](ss/tooltip_ios.png?raw=true)
