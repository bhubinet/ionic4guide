# Guide Ionic 4
This guide will register tips or problems that you can encounter during your app development. **All the guide is available in Wiki.**
I will register here all my experiences during the differents applications that i'll make in Ionic 4. I'm a young developper from France (so forgive me for my english's mistakes).


# Improve your application
## Test your app in IOS (or Android) with DevApp
Ionic have an application downloadable in [IOS](https://itunes.apple.com/us/app/ionic-devapp/id1233447133?ls=1&mt=8) and [Android](https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=en) which allow you to test your app directly in device pass by the wifi connection. Once you download the app, connect your device to the same wifi connection of your pc and launch :
```bash
ionic serve -devapp
```
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
## Date format in IOS
If you play with specific format of dates you'll face to a problem in IOS : the default format is not the same that in Android.
But we can convert them and dates will work in IOS and Android both : 
```javascript
const arr = planif.start.date.split(/[- :]/);
const dateArr = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
const startdate = new Date(dateArr);
```              
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
<ion-grid style="max-height: 380px" (touchstart)="refresherEnable = true; e.preventDefault()" (touchend)="refresherEnable = false; e.preventDefault()">
```
Don't forget "e.preventDefault()" if you have a click event in your scrollable content. e.preventDefault() can cause problems when you build in production. Nowadays I didn't fix that problem.

## No provider for e! (with --prod flag)
3 Days to resolve this error ! Since Ionic 4 you have to declare all your @ionic-native in app.module.ts.
So go to package.json and get all your native plugins.
```json
"@ionic-native/calendar": "^5.2.0",
    "@ionic-native/camera": "^5.2.0",
    "@ionic-native/core": "^5.0.0",
    "@ionic-native/date-picker": "^5.2.0",
    "@ionic-native/file": "^5.2.0",
    "@ionic-native/file-opener": "^5.2.0",
    "@ionic-native/file-transfer": "^5.2.0",
    "@ionic-native/native-page-transitions": "^5.2.0",
    "@ionic-native/network": "^5.3.0",
    "@ionic-native/screen-orientation": "^5.1.0",
    "@ionic-native/splash-screen": "^5.0.0",
    "@ionic-native/status-bar": "^5.0.0",
    "@ionic-native/toast": "^5.2.0",
```
And now declare them in app.module.ts :
```javascript
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    File,
    UserService,
    FormatterService,
    ApiService,
    FiltersService,
    PicturesService,
    ThemeSwitcherService,
    Network,
    Camera,
    DatePicker,
    FileTransfer,
    FileOpener,
    NativePageTransitions,
    Toast,
    Calendar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
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

# Javascript blocks (always useful)
## Sort json array (by date for example)
```javascript
    sortByKey(array, key) {
        return array.sort(function(a, b) {
            let x = a[key]; let y = b[key];
            x = new Date(x.date);
            y = new Date(y.date);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
```
So you pass your array and the key of your choice to sort. You can format your keys before comparing them.
## Replace characters or words with replace()
The function replace() provided by Prototype.String only replace the first occurence by default. To skip this constraint :
```javascript
const date = $event.replace(/-/g, '/');
```
Use g after your replace to loop each occurence.
