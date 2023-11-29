---
"react18-themes": major
---

When headers or cookies used in server component, it is no longer static. It will be generated on server side for every request. Thus, wrapping antire layout in `<ServerSideWrapper>` had disadvantage of always causing re-renders on the server.

In this version, we have rebranded `ServerSideWrapper` as `NextJsSSRThemeSwitcher`. `NextJsSSRThemeSwitcher` need not wrap any components. Rather we use CSS Combinators to apply appropreate themes.

More in the docs...
