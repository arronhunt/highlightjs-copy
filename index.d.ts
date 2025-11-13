import type { HighlightResult } from "highlight.js"

declare module "highlightjs-copy" {
    declare interface CopyCallback {
        (text: string, el: HTMLElement): undefined
    }

    declare interface Hook {
        (text: string, el: HTMLElement): string | undefined
    }


    declare class CopyButtonPlugin {
        constructor(options?: {
            callback?: CopyCallback,
            hook?: Hook,
            lang?: String,
            autohide?: Boolean
        })

        "after:highlightElement"(data: { el: Element, text: string }): void
    }

    export = CopyButtonPlugin
}
