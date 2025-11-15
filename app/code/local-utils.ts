import { Application, Device, isIOS, isAndroid, View, Image, StackLayout } from "@nativescript/core";
import { TNSFancyAlert } from '@nstudio/nativescript-fancyalert';

export const apiUrl = "https://fireblocksmp.sdesignshost.gr:25575/"

export class localUtils {

    public static setStatusBarStyle(darkText: boolean) {
        if (isIOS) {
            class MyController extends UIResponder {
                static ObjCProtocols = [UIApplicationDelegate];

                applicationDidFinishLaunchingWithOptions(app: UIApplication, launchOptions: NSDictionary<any, any>): boolean {
                    Application.ios.rootController.overrideUserInterfaceStyle = UIUserInterfaceStyle.Light;
                    return true;
                }
            }

            Application.ios.delegate = MyController;
        }

        const window = Application.android.startActivity.getWindow();

        if (Device.sdkVersion >= "30") {
            const controller = window.getInsetsController();
            if (controller) {
                if (darkText) {
                    controller.setSystemBarsAppearance(
                        android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS,
                        android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    );
                } else {
                    controller.setSystemBarsAppearance(
                        0,
                        android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    );
                }
            }
        } else {
            const decorView = window.getDecorView();
            decorView.setSystemUiVisibility(
                android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                (darkText ? android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR : 0)
            );
        }
    }

    public static vibrate(t: number) {
        if (isAndroid) {
            try {
                const context = Application.android.context;
                const vibrator = context.getSystemService(android.content.Context.VIBRATOR_SERVICE);
                if (vibrator && vibrator.vibrate) {
                    vibrator.vibrate(t);
                }
            } catch (e) {
                // ignore errors
            }
        } else if (isIOS) {
            try {
                const UIImpactFeedbackGenerator = (ObjCClass as any)('UIImpactFeedbackGenerator');
                const feedbackGenerator = UIImpactFeedbackGenerator.alloc().initWithStyle(1);
                feedbackGenerator.impactOccurred(t);
            } catch (e) {
                // ignore errors
            }
        }
    }

    public static navigateTo(directory: string) {
        const frame = require('@nativescript/core/ui/frame').Frame.topmost();
        frame.navigate({
            moduleName: directory,
            animated: false
        });

    }

    public static DisplayMessage(messageLevel: MessageLevel, title: string, message: string, buttonmessage: string) {
        switch (messageLevel) {
            case MessageLevel.success:
                TNSFancyAlert.showSuccess(title, message, buttonmessage);
                break;

            case MessageLevel.warning:
                TNSFancyAlert.showWarning(title, message, buttonmessage);
                break;

            case MessageLevel.error:
                TNSFancyAlert.showError(title, message, buttonmessage);
                break;

            case MessageLevel.waiting:
                TNSFancyAlert.showNotice(title, message, buttonmessage);

                break;
        }

    }

    public static animateIn(element: any, type: "fade" | "slideUp" | "slideRight" = "fade", duration: number) {
        if (!element) {
            console.warn("No element provided to animateIn!");
            return;
        }

        const doAnimate = () => {
            switch (type) {
                case "fade":
                    (element as any).opacity = 0; // set initial opacity
                    (element as any).animate({ opacity: 1, duration: duration, curve: "easeInOut" })
                        .catch((err: any) => console.error(err));
                    break;

                case "slideUp":
                    (element as any).translateY = 100; // start offscreen
                    (element as any).opacity = 0;
                    (element as any).animate({
                        translate: { x: 0, y: 0 },
                        opacity: 1,
                        duration: duration,
                        curve: "easeOut"
                    }).catch((err: any) => console.error(err));
                    break;

                case "slideRight":
                    (element as any).translateX = -500; // start offscreen
                    (element as any).opacity = 0;
                    (element as any).animate({
                        translate: { x: 0, y: 0 },
                        opacity: 1,
                        duration: duration,
                        curve: "easeOut"
                    }).catch((err: any) => console.error(err));
                    break;

                default:
                    console.warn(`Unknown animation type: ${type}`);
            }
        };

        // If the element is already loaded, animate immediately
        if ((element as any)._isLoaded) {
            doAnimate();
        } else {
            (element as any).on("loaded", doAnimate);
        }
    }

    public static animateOut(element: any, type: "fade" | "slideUp" | "slideRight" = "fade", duration: number) {
        if (!element) {
            console.warn("No element provided to animateIn!");
            return;
        }

        const doAnimate = () => {
            switch (type) {
                case "fade":
                    (element as any).opacity = 1; // set initial opacity
                    (element as any).animate({ opacity: 0, duration: duration, curve: "easeInOut" })
                        .catch((err: any) => console.error(err));
                    break;

                case "slideUp":
                    (element as any).translateY = 0; // start offscreen
                    (element as any).opacity = 1;
                    (element as any).animate({
                        translate: { x: 0, y: -100 },
                        opacity: 0,
                        duration: duration,
                        curve: "easeOut"
                    }).catch((err: any) => console.error(err));
                    break;

                case "slideRight":
                    (element as any).translateX = 0; // start offscreen
                    (element as any).opacity = 1;
                    (element as any).animate({
                        translate: { x: 500, y: 0 },
                        opacity: 0,
                        duration: duration,
                        curve: "easeOut"
                    }).catch((err: any) => console.error(err));
                    break;

                default:
                    console.warn(`Unknown animation type: ${type}`);
            }
        };

        // If the element is already loaded, animate immediately
        if ((element as any)._isLoaded) {
            doAnimate();
        } else {
            (element as any).on("loaded", doAnimate);
        }
    }

    public static getNavBar() {
        return `<StackLayout orientation="horizontal">
            <Image id="home-nav" class="nav-btn" src="~/assets/home.png" ontap="goHome"/>
            <Image id="events-nav" class="nav-btn" src="~/assets/events.png" ontap="goEvents"/>
            <Image id="chat-nav" class="nav-btn" src="~/assets/chat.png" ontap="goChat"/>
            <Image id="mood-nav" class="nav-btn" src="~/assets/mood.png" ontap="goMood"/>
            <Image id="setting-nav" class="nav-btn" src="~/assets/settings.png" ontap="goSettings"/>
        </StackLayout>`;
    }
}

export enum MessageLevel {
    success = 1,
    error,
    warning,
    waiting
}