"use strict";

const OPENER_SAFE_REL = ["noopener", "noreferrer"];

function addOpenerSafeRel(tag) {
  const relMatch = tag.match(/\srel=(["'])(.*?)\1/i);

  if (!relMatch) {
    return tag.replace(/>$/, ' rel="noopener noreferrer">');
  }

  const current = relMatch[2]
    .split(/\s+/)
    .map(value => value.trim())
    .filter(Boolean);
  const merged = [...new Set([...current, ...OPENER_SAFE_REL])].join(" ");

  return tag.replace(relMatch[0], ` rel=${relMatch[1]}${merged}${relMatch[1]}`);
}

hexo.extend.filter.register("after_render:html", html => {
  return html.replace(
    /<a\b(?=[^>]*\starget=(["'])_blank\1)[^>]*>/gi,
    addOpenerSafeRel
  );
});
