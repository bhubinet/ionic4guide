# Guide Ionic 4
This guide will register tips or problems that you can encounter during your app development. **All the guide is available in Wiki.**
I will register here all my experiences during the differents applications that i'll make in Ionic 4. I'm a young developper from France (so forgive me for my english's mistakes).


# Improve your application
## Make a production build
The default build command will generate a debug apk which does not have optimized code.

ionic cordova build android --prod --release command will do the trick. It will generate a production-ready apk with minified and optimized code.

## Native Page Transitions
By default, when switching to a different page, Ionic will use CSS animations to switch between views. This works fine mostly, but you may notice lags sometimes on devices with lower specs and also it’s not very customizable.

To solve this problem, you should switch to Native Page Transitions which uses native hardware device acceleration to animate transitions.

From my experience, performance is improved and the app feels much more native.

It’s supported on Android, iOS and Windows Mobile and you can start using it pretty quickly.

You can get more information in their [documentation](https://ionicframework.com/docs/native/native-page-transitions/).

## Lazy Loading
This is a technique to reduce your app startup time by loading some of the views later in the lifecycle, usually just before you need it. It’s able to reduce drastically the startup time at the cost of a small delay when new views are called. Still, this can be a huge improvement for the feel of your app when used correctly.

There is nice documentation [here](https://blog.ionicframework.com/ionic-and-lazy-loading-pt-1/) and [here too](https://blog.ionicframework.com/ionic-and-lazy-loading-pt-2/)

## Less LocalStorage
You have to use LocalStorage only if needed. If possible use more a database, a lightweight database.


# Problems
## Translate I18n
I encountered a problem using ngx-translate, it's that we have to import the TranslateModule in each page that you use the pipe (|translate).
```javascript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SignaturePage]
})
```

## BugReport : ActionSheet in IOS not scrollable
There is a bug in Ionic 4 when you use an action sheet in ios with a list. This list is not scrollable. To avoid that add to your global.scss :
```scss
.action-sheet-group {
    overflow: auto !important;
}
```

## Disable ion-refresher when scroll a content
If you have a scrollable element in your page, for example a grid, when you scroll up your grid, your refresh will trigger at the same time. To avoid that add [disabled] at your refresher with a boolean variable.
```html
<ion-refresher (ionRefresh)="doRefresh($event)" [pullMin]="60" [disabled]="refresherEnable">
```
And switch the state with (touchstart) and (touchend) attribute in your scrollable content : 
```html
<ion-grid style="max-height: 380px" (touchstart)="refresherEnable = true" (touchend)="refresherEnable = false">
```


# Variables SCSS and Dynamic theming
Recently the trending is to let the choice of colors theming to the user. To do this we'll use SCSS variables with Ionic 4.
Many variables are already set by default :
```scss
/** primary **/
  --ion-color-primary: #04172b;
  --ion-color-primary-rgb: 56, 128, 255;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #3171e0;
  --ion-color-primary-tint: #4c8dff;
  ```
  As we can see a variable is defined with a base color in hexadecimal and rgb, a contrast color (if a text is above), a shade and finally a tint. If we define a variable like this we can use it in html with [color] for example :
```html
<ion-button color="primary" mode="ios" icon-only (click)="alertExit()">
 ```
Those variables can also be use in SCSS files :
```scss
canvas{
  border: 2px dashed var(--complementary);
}
```
So we will create our service to make 2 themes : a light theme and a dark theme. The source file is avalaible under the name 'theme-switcher.service.ts'.
```javascript
        this.themes = [
            {
                name: 'day',
                styles: [
                    { themeVariable: '--background-color', value: 'white'},
                    { themeVariable: '--text-color', value: 'black'},
                    { themeVariable: '--text-color-days-deactivated', value: 'rgba(19, 16, 16, 0.51)'},
                    { themeVariable: '--line-color', value: '#15bdd8'},
                    { themeVariable: '--grid-border', value: '#15bdd8'},
                    { themeVariable: '--icon-splash', value: '#15bdd8'},
                    { themeVariable: '--complementary', value: '#15bdd8'},
                    { themeVariable: '--odd', value: 'white'},
                    { themeVariable: '--filter-border', value: '#15bdd8'}
                ]
            },
            {
                name: 'night',
                styles: [
                    { themeVariable: '--background-color', value: '#04172b'},
                    { themeVariable: '--text-color', value: 'white'},
                    { themeVariable: '--text-color-days-deactivated', value: 'rgba(255, 255, 255, 0.51)'},
                    { themeVariable: '--line-color', value: '#d89115'},
                    { themeVariable: '--grid-border', value: '#d89115'},
                    { themeVariable: '--icon-splash', value: '#d89115'},
                    { themeVariable: '--complementary', value: '#d89115'},
                    { themeVariable: '--odd', value: '#142c45'},
                    { themeVariable: '--filter-border', value: 'rgba(255, 255, 255, 0)'}
                ]
            }
        ];
 ```
 We have an array of our themes, and we change the value of each color variable that we want. Be careful it's not recommended to change deaults variable like primary or danger because they are used by some defaults classes of Ionic. After that we create the method to set the theme that we want : 
 ```javascript
 setTheme(name): void {

        const theme = this.themes.find(theme => theme.name === name);

        this.domCtrl.write(() => {

            theme.styles.forEach(style => {
                document.documentElement.style.setProperty(style.themeVariable, style.value);
            });

        });

    }
```
It's done we can switch between themes with an ion-toggle for example ;-)
