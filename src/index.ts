import Cursor from "./cursor";
import gsap from "gsap";
new Cursor({
    container: "body",
    className: "pt-cursor",
    overwrite: true,
    speed: 0.4,
    skewingDelta: 0.001,
    skewingDeltaMax: 0.15,
    innerClassName: "pt-cursor-inner",
    mediaClassName: "pt-cursor-media",
    mediaBoxClassName: "pt-media-box",
    textClassName: "pt-cursor-text",
    hideTimeout: 300,
    showTimeout: 20,
    hiddenState: "-hidden",
    activeState: "-active",
    visible: true,
    hideOnLeave: true,
});

const timeline = gsap.timeline({ defaults: { duration: 2 } });
timeline
    .from(".container", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "expo.out",
    })
    .from(".info", {
        y: 40,
        opacity: 0,
        // stagger: 0.15,
        ease: "expo.out",
        delay: 0.2,
    });
