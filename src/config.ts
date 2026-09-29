/**
 * Site-wide runtime configuration.
 *
 * Both values are empty on purpose: nothing is injected into the pages until
 * you fill them in, so a half-configured build never ships broken tracking.
 *
 * 1) GA_MEASUREMENT_ID  — Google Analytics 4, format "G-XXXXXXXXXX"
 *    Get it: analytics.google.com → Admin → Data streams → Web → Measurement ID
 *
 * 2) ADSENSE_CLIENT     — AdSense publisher client, format "ca-pub-XXXXXXXXXXXXXXXX"
 *    Get it: adsense.google.com → Account → Account information
 *    (apply only AFTER the site has been indexed and has real content)
 */
export const GA_MEASUREMENT_ID = '';
export const ADSENSE_CLIENT = '';

/** AdSense ad unit slot ids. Fill these in after your account is approved. */
export const ADSENSE_SLOTS = {
  /** In-article unit shown on blog posts. */
  article: '',
  /** Unit shown under the tool content blocks. */
  tool: '',
};

/** Google Search Console HTML-tag verification code (content of the meta tag). */
export const GOOGLE_SITE_VERIFICATION = '';
export const configured = {
  get ga() { return GA_MEASUREMENT_ID.length > 0; },
  get ads() { return ADSENSE_CLIENT.length > 0; },
};
