# Guide Ionic 4
This guide will register tips or problems that you can encounter during your app development.


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
