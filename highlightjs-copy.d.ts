/**
 * @file highlightjs-copy.d.ts
 * @author Arron Hunt <arronjhunt@gmail.com>
 */

/**
 * Callback function that is called after text is copied to clipboard
 */
export type CopyCallback = (text: string, el: HTMLElement) => void;

/**
 * Hook function that can modify text before it's copied to clipboard
 */
export type Hook = (text: string, el: HTMLElement) => string | undefined;

/**
 * Options for configuring the CopyButtonPlugin
 */
export interface CopyButtonOptions {
  /**
   * Function that will be called when a copy event fires
   */
  callback?: CopyCallback;

  /**
   * Function that can modify text before it's copied to clipboard
   */
  hook?: Hook;

  /**
   * Language for the copy button text. Defaults to the document body's lang attribute and falls back to "en"
   */
  lang?: string;

  /**
   * Automatically hides the copy button until a user hovers the code block. Defaults to true
   */
  autohide?: boolean;
}

/**
 * Adds a copy button to highlightjs code blocks
 */
export class CopyButtonPlugin {
  /**
   * Create a new CopyButtonPlugin class instance
   * @param options - Configuration options for the plugin
   */
  constructor(options?: CopyButtonOptions);

  /**
   * Hook into highlightjs's after:highlightElement event
   */
  "after:highlightElement": (params: { el: HTMLElement; text: string }) => void;
}

/**
 * Localization strings for different languages
 */
export const locales: {
  [key: string]: [string, string, string]; // [Copy, Copied!, Copied to clipboard]
};
