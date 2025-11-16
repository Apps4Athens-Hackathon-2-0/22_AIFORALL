import { NavigatedData, Page, View, ApplicationSettings } from '@nativescript/core'
import { localUtils } from '~/code/local-utils'
import { ViewModel } from './init-view-model'
import 'nativescript-effects';

let page: Page;
const first_time = ApplicationSettings.getBoolean('first_time', true);

export function onNavigatingTo(args: NavigatedData) {
  page = <Page>args.object

  page.bindingContext = new ViewModel()

  localUtils.setStatusBarStyle(true)

  if (first_time) {
    localUtils.navigateTo("welcome/welcome-page")
  }
  else {
    localUtils.navigateTo("home/home-page")
  }
}