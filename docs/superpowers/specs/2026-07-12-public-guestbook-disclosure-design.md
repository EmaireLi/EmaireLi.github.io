# Public Guestbook Disclosure Design

## Visitor outcome

Before deciding to type, a visitor understands that the chosen signature and message will be displayed publicly on this page. The interface prevents an easy privacy misunderstanding without pretending to offer protection or a private alternative.

## Content and placement

Place one muted helper paragraph between the existing warm invitation and the compose action:

> 署名和留言会公开显示在本页；请勿填写手机号、邮箱或其他隐私信息。留言最多 100 字。

Rename the button `写公开留言`. Keep the `联系我` heading and warm invitation unchanged.

## Semantics

The helper has one stable id. Both the compose button and form use `aria-describedby` with that id. It remains visible before expansion and while the form is open, including when JavaScript or the API is unavailable.

## Visual treatment

Use muted text, a subtle left rule or low-contrast surface, readable line-height, and normal wrapping. Do not use red, warning icons, alert roles, modal confirmation, or a checkbox.

## Truth boundary

The current client and Worker prove public display and the 100-character message limit. They do not prove moderation, privacy, retention, deletion on request, replies, or private delivery, so the UI must not claim them.
