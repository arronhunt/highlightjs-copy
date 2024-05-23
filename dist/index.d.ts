export = CopyButtonPlugin;
/**
 *  @file highlight-copy.js
 *  @author Arron Hunt <arronjhunt@gmail.com>
 *  @copyright Copyright 2021. All rights reserved.
 */
/**
 * Adds a copy button to highlightjs code blocks
 */
declare class CopyButtonPlugin {
    /**
     * Create a new CopyButtonPlugin class instance
     * @param {Object} [options] - Functions that will be called when a copy event fires
     * @param {CopyCallback} [options.callback]
     * @param {Hook} [options.hook]
     * @param {String} [options.lang] Defaults to the document body's lang attribute and falls back to "en"
     */
    constructor(options?: {
        callback?: CopyCallback;
        hook?: Hook;
        lang?: string;
    });
    "after:highlightElement"({ el, text }: {
        el: any;
        text: any;
    }): void;
}
declare namespace CopyButtonPlugin {
    export { CopyCallback, Hook };
}
type CopyCallback = Function;
type Hook = Function;
//# sourceMappingURL=index.d.ts.map