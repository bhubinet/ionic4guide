import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';

interface Theme {
    name: string;
    styles: ThemeStyle[];
}

interface ThemeStyle {
    themeVariable: string;
    value: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeSwitcherService {

    private themes: Theme[] = [];
    private currentTheme = 0;

    constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document) {

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
                    { themeVariable: '--filter-border', value: '#15bdd8'},
                    { themeVariable: '--ion-color-light', value: '#bababa'},
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
                    { themeVariable: '--filter-border', value: 'rgba(255, 255, 255, 0)'},
                    { themeVariable: '--ion-color-light', value: '#ffffff'},
                ]
            }
        ];

    }

    cycleTheme(): void {

        if (this.themes.length > this.currentTheme + 1) {
            this.currentTheme++;
        } else {
            this.currentTheme = 0;
        }

        this.setTheme(this.themes[this.currentTheme].name);

    }

    setTheme(name): void {

        const theme = this.themes.find(theme => theme.name === name);

        this.domCtrl.write(() => {

            theme.styles.forEach(style => {
                document.documentElement.style.setProperty(style.themeVariable, style.value);
            });

        });

    }

}
