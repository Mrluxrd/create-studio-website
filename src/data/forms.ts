/**
 * Contact form delivery configuration — the single place to connect the form.
 *
 * The form posts a multipart/form-data body to CONTACT_ENDPOINT and treats any
 * 2xx response as delivered. That contract matches the common static-hosting
 * form services (Netlify Forms' AJAX endpoint, Formspree, Basin, Web3Forms),
 * so connecting it is a matter of setting one environment variable:
 *
 *     PUBLIC_CONTACT_ENDPOINT="https://<your form service>/<form id>"
 *
 * Notes:
 *  - This value is public by design; it is a submission URL, not a secret.
 *    Never put an API key, SMTP credential or private token here — anything in
 *    this file ships to the browser.
 *  - Until it is set, the form validates normally but shows the approved
 *    "That did not send." state rather than reporting a delivery that did not
 *    happen. It never fakes success.
 *  - Spam protection: a hidden honeypot field (`company_website`) is included
 *    in the form markup and stripped before submission. If the chosen host adds
 *    its own captcha, wire it here as well.
 */
export const CONTACT_ENDPOINT: string = import.meta.env.PUBLIC_CONTACT_ENDPOINT || '';

export const isContactEndpointConfigured = (): boolean => /^https?:\/\//.test(CONTACT_ENDPOINT);
