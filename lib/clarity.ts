import Clarity from "@microsoft/clarity";

export function initClarity() {
    if (typeof window !== "undefined") {
        Clarity.init("xo4w87y33n");
    }
}