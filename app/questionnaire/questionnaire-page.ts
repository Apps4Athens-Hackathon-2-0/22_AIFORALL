import { Button, NavigatedData, Page, View, booleanConverter, Style, CssProperty, isApple, ApplicationSettings } from '@nativescript/core'
import { localUtils } from '~/code/local-utils'
import { ViewModel } from './questionnaire-view-model'
import 'nativescript-effects';

let page: Page;
let btns: Button[];
let nextBtn: Button;

export const selectedProperty = new CssProperty<Style, boolean>({
    name: "selected",
    cssName: "selected",
    defaultValue: false,
    valueConverter: booleanConverter
});

selectedProperty.register(Style);

export function onNavigatingTo(args: NavigatedData) {
  page = <Page>args.object

  page.bindingContext = new ViewModel()

  localUtils.setStatusBarStyle(true)

  btns = [
    page.getViewById('btn1'),
    page.getViewById('btn2'),
    page.getViewById('btn3'),
    page.getViewById('btn4'),
    page.getViewById('btn5'),
    page.getViewById('btn6'),
    page.getViewById('btn7'),
    page.getViewById('btn8'),
    page.getViewById('btn9'),
    page.getViewById('btn10'),
    page.getViewById('btn11'),
    page.getViewById('btn12'),
    page.getViewById('btn13'),
    page.getViewById('btn14'),
    page.getViewById('btn15'),
    page.getViewById('btn16'),
    page.getViewById('btn17'),
    page.getViewById('btn18'),
    page.getViewById('btn19'),
    page.getViewById('btn20'),

  ]

  nextBtn = page.getViewById('next')
  nextBtn.isEnabled = false;

  btns.forEach(btn => {
    (btn as any).selected = false;
    btn.className = "unselected";
    setTimeout(() => {
      localUtils.animateIn(btn, "slideRight", 1000);
    }, 100);
  });

  btns.forEach(btn => {
    btn.on("tap", () => {
        localUtils.vibrate(2);
        if ((btn as any).selected) {
          (btn as any).selected = false;
          btn.className = "unselected";
          getSelectedBtns();
          return;
        } else {
          (btn as any).selected = true;
          btn.className = "selected";
          getSelectedBtns();
        }
      });
  });

}

function resetBtns() {
  btns.forEach(btn => {
    (btn as any).selected = false;
    btn.className = "unselected";
  });
}

export function nextBtnTap() {
  localUtils.vibrate(2);
  localUtils.animateOut(nextBtn, "fade", 500);
  ApplicationSettings.setBoolean('first_time', false)
  setTimeout(() => {
    localUtils.navigateTo("home/home-page");
  }, 1000);

  btns.forEach(btn => {
    localUtils.animateOut(btn, "slideRight", 1000);
    // setTimeout(() => {
    //   resetBtns();  
    //   localUtils.animateIn(btn, "slideRight", 1000);
    //   localUtils.animateIn(nextBtn, "fade", 500);
    // }, 1200);
  });
  const selectedBtns = btns.filter((btn) => (btn as any).selected === true);
  
  selectedBtns.forEach(btn => {
    ApplicationSettings.setBoolean(btn.text, true);
  });
}

function getSelectedBtns() {
  const selectedBtns = btns.filter((btn) => (btn as any).selected === true);

  if (selectedBtns.length > 0) {
    nextBtn.isEnabled = true;
  } else {
    nextBtn.isEnabled = false;
  }
}
