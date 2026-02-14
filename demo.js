import { Layer } from "@toptensoftware/layers.core";
import { key, keyEncoder } from "./keyboard.js";
let layer = new Layer();

layer.add(key({
    key: "F1",
    repeat: true,
    //input: (ev) => console.log("input", ev),
    press: () => console.log("press"),
    release: () => console.log("release"),
}));

layer.add(keyEncoder({
    incKey: "F3",
    decKey: "F2",
    //input: (ev) => console.log("input", ev),
    adjust: (delta) => console.log("delta", delta),
}));

layer.activate();

console.log("Bound F1 as button and F2/F3 as encoder...");

