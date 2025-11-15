import { NavigatedData, Page, View, ApplicationSettings, Button, StackLayout, Image, Label, ScrollView, Color } from '@nativescript/core'
import { Builder } from '@nativescript/core/ui/builder'
import { localUtils, apiUrl } from '~/code/local-utils'
import { ViewModel } from './events-view-model'
import 'nativescript-effects';
import { apiUtils } from '~/code/api-utils';

let page: Page;

export async function onNavigatingTo(args: NavigatedData) {
  page = <Page>args.object

  page.bindingContext = new ViewModel()

  localUtils.setStatusBarStyle(true)

  const navBar = page.getViewById<StackLayout>("navbar")
  const navBarView = Builder.parse(localUtils.getNavBar(), { goHome, goEvents, goChat, goMood, goSettings });
  navBar.addChild(navBarView);

  randomEventGenerator();
}

function randomEventGenerator() {
  const eventsScrollView = page.getViewById<ScrollView>("events");

  const eventsContainer = new StackLayout();
  eventsContainer.orientation = "vertical";

  const eventCategories = [
    { name: "Art Exhibition", image: "~/assets/art.png" },
    { name: "Sports Event", image: "~/assets/sports.png" },
    { name: "Cinema", image: "~/assets/cinema.png" },
    { name: "Music", image: "~/assets/music_note.png" },
    { name: "Theater", image: "~/assets/theater.png" },
    { name: "Festival", image: "~/assets/festival.png" },
    { name: "Culture", image: "~/assets/culture.png" },
    { name: "Education", image: "~/assets/education.png" },
    { name: "Health", image: "~/assets/health.png" },
    { name: "Fashion", image: "~/assets/fashion.png" },
    { name: "Dining", image: "~/assets/dining.png" },
    { name: "Nightlife", image: "~/assets/nightlife.png" },
    { name: "Outdoor", image: "~/assets/outdoor.png" },
    { name: "Technology", image: "~/assets/technology.png" },
    { name: "Literature", image: "~/assets/literature.png" },
    { name: "Esports", image: "~/assets/esports.png" },
    { name: "Business", image: "~/assets/buisness.png" },
    { name: "Community", image: "~/assets/comunity.png" },
    { name: "Travel", image: "~/assets/travel_explore_100dp_4B77D1_FILL0_wght400_GRAD0_opsz48.png" },
    { name: "Other", image: "~/assets/other.png" }
  ];

  // Generate 5 random events
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * eventCategories.length);
    const event = eventCategories[randomIndex];

    const eventContainer = new StackLayout();
    eventContainer.orientation = "horizontal";
    eventContainer.id = "event-container";

    const eventImage = new Image();
    eventImage.src = event.image;
    eventImage.id = "event-image";

    const eventLabel = new Label();
    eventLabel.text = event.name;
    eventLabel.id = "event-name";
    eventLabel.color = new Color("black");

    eventContainer.addChild(eventImage);
    eventContainer.addChild(eventLabel);

    eventsContainer.addChild(eventContainer);
  }

  eventsScrollView.content = eventsContainer;
}

export function goHome() {
  localUtils.navigateTo("home/home-page")
}

export function goEvents() {
  localUtils.navigateTo("events/events-page")
}

export function goChat() {
  localUtils.navigateTo("chat/chat-page")
}

export function goMood() {
  localUtils.navigateTo("mood/mood-page")
}

export function goSettings() {
  localUtils.navigateTo("settings/settings-page")
}