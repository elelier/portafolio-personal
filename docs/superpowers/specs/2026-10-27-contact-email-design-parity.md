# Contact email design parity (Preview)

## Decision

Improve, rather than reproduce byte-for-byte, the two BuildShip `ContactMe` email templates. The Google Apps Script alternative must retain the visitor-facing warmth and branding while making the owner's notice immediately actionable. This change affects only email HTML and its plain-text equivalents; it does not change the form, capture contract, persistence, or delivery sequence.

## Visitor acknowledgement

- Retain the original blue (`#2e86c1`), Elier's profile photo (verified live), personalized greeting, a concise acknowledgement, and a readable recap of the visitor's original message.
- Offer current links to elelier.com, LinkedIn, GitHub, and WhatsApp; remove the deleted Calendly meeting URL and the dead image banner. Avoid false promises of a response deadline.
- Match the chosen `es`/`en` language throughout; keep the dynamic subject and text/plain alternative.
- Use an email-safe fluid HTML layout with inline styles, descriptive alternative text, meaningful link text, and graceful degradation if images are disabled.

## Owner notification

- Display a visually related blue heading, name, mail, full message, and submission ID.
- Provide clickable mailto reply and a direct link to the `contact_v2` sheet tab using the actual sheet GID, not BuildShip's outdated `gid=0`.
- Include received UTC timestamp, but remove motivational filler and dead banner.
- Preserve `replyTo=contact.mail`, text/plain alternative, and user-input escaping.

## Global requirements

- No new providers, secrets, dependencies, analytics pixels, mass mail, or database changes.
- Keep text escaped for HTML and protect line breaks; never interpolate visitor HTML as markup.
- Keep sending only in existing Preview deployment until QA shows **both** rendered emails received in Gmail.
- Do not merge PR #58, change production environment, or disable BuildShip without separate approval.

## Acceptance

1. Automated tests assert both distinct HTML structures and correct multilingual messaging with escaped potentially hostile user input.
2. Local Apps Script tests pass; existing contract remains unchanged.
3. Updated Apps Script editor matches version-controlled `Code.gs`; a new Preview-only deployment version is selected.
4. A user-approved Preview submission yields the same Sheet record and both beautifully formatted emails, confirmed in inboxes.
