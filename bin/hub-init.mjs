#!/usr/bin/env node
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/sisteransi/src/index.js
var require_src = __commonJS((exports, module) => {
  var ESC2 = "\x1B";
  var CSI2 = `${ESC2}[`;
  var beep = "\x07";
  var cursor = {
    to(x, y) {
      if (!y)
        return `${CSI2}${x + 1}G`;
      return `${CSI2}${y + 1};${x + 1}H`;
    },
    move(x, y) {
      let ret = "";
      if (x < 0)
        ret += `${CSI2}${-x}D`;
      else if (x > 0)
        ret += `${CSI2}${x}C`;
      if (y < 0)
        ret += `${CSI2}${-y}A`;
      else if (y > 0)
        ret += `${CSI2}${y}B`;
      return ret;
    },
    up: (count = 1) => `${CSI2}${count}A`,
    down: (count = 1) => `${CSI2}${count}B`,
    forward: (count = 1) => `${CSI2}${count}C`,
    backward: (count = 1) => `${CSI2}${count}D`,
    nextLine: (count = 1) => `${CSI2}E`.repeat(count),
    prevLine: (count = 1) => `${CSI2}F`.repeat(count),
    left: `${CSI2}G`,
    hide: `${CSI2}?25l`,
    show: `${CSI2}?25h`,
    save: `${ESC2}7`,
    restore: `${ESC2}8`
  };
  var scroll = {
    up: (count = 1) => `${CSI2}S`.repeat(count),
    down: (count = 1) => `${CSI2}T`.repeat(count)
  };
  var erase = {
    screen: `${CSI2}2J`,
    up: (count = 1) => `${CSI2}1J`.repeat(count),
    down: (count = 1) => `${CSI2}J`.repeat(count),
    line: `${CSI2}2K`,
    lineEnd: `${CSI2}K`,
    lineStart: `${CSI2}1K`,
    lines(count) {
      let clear = "";
      for (let i = 0;i < count; i++)
        clear += this.line + (i < count - 1 ? cursor.up() : "");
      if (count)
        clear += cursor.left;
      return clear;
    }
  };
  module.exports = { cursor, scroll, erase, beep };
});

// node_modules/@clack/core/dist/index.mjs
import { styleText as y } from "node:util";
import { stdout as S, stdin as $ } from "node:process";
import * as _ from "node:readline";
import P from "node:readline";

// node_modules/fast-string-truncated-width/dist/utils.js
var isAmbiguous = (x) => {
  return x === 161 || x === 164 || x === 167 || x === 168 || x === 170 || x === 173 || x === 174 || x >= 176 && x <= 180 || x >= 182 && x <= 186 || x >= 188 && x <= 191 || x === 198 || x === 208 || x === 215 || x === 216 || x >= 222 && x <= 225 || x === 230 || x >= 232 && x <= 234 || x === 236 || x === 237 || x === 240 || x === 242 || x === 243 || x >= 247 && x <= 250 || x === 252 || x === 254 || x === 257 || x === 273 || x === 275 || x === 283 || x === 294 || x === 295 || x === 299 || x >= 305 && x <= 307 || x === 312 || x >= 319 && x <= 322 || x === 324 || x >= 328 && x <= 331 || x === 333 || x === 338 || x === 339 || x === 358 || x === 359 || x === 363 || x === 462 || x === 464 || x === 466 || x === 468 || x === 470 || x === 472 || x === 474 || x === 476 || x === 593 || x === 609 || x === 708 || x === 711 || x >= 713 && x <= 715 || x === 717 || x === 720 || x >= 728 && x <= 731 || x === 733 || x === 735 || x >= 768 && x <= 879 || x >= 913 && x <= 929 || x >= 931 && x <= 937 || x >= 945 && x <= 961 || x >= 963 && x <= 969 || x === 1025 || x >= 1040 && x <= 1103 || x === 1105 || x === 8208 || x >= 8211 && x <= 8214 || x === 8216 || x === 8217 || x === 8220 || x === 8221 || x >= 8224 && x <= 8226 || x >= 8228 && x <= 8231 || x === 8240 || x === 8242 || x === 8243 || x === 8245 || x === 8251 || x === 8254 || x === 8308 || x === 8319 || x >= 8321 && x <= 8324 || x === 8364 || x === 8451 || x === 8453 || x === 8457 || x === 8467 || x === 8470 || x === 8481 || x === 8482 || x === 8486 || x === 8491 || x === 8531 || x === 8532 || x >= 8539 && x <= 8542 || x >= 8544 && x <= 8555 || x >= 8560 && x <= 8569 || x === 8585 || x >= 8592 && x <= 8601 || x === 8632 || x === 8633 || x === 8658 || x === 8660 || x === 8679 || x === 8704 || x === 8706 || x === 8707 || x === 8711 || x === 8712 || x === 8715 || x === 8719 || x === 8721 || x === 8725 || x === 8730 || x >= 8733 && x <= 8736 || x === 8739 || x === 8741 || x >= 8743 && x <= 8748 || x === 8750 || x >= 8756 && x <= 8759 || x === 8764 || x === 8765 || x === 8776 || x === 8780 || x === 8786 || x === 8800 || x === 8801 || x >= 8804 && x <= 8807 || x === 8810 || x === 8811 || x === 8814 || x === 8815 || x === 8834 || x === 8835 || x === 8838 || x === 8839 || x === 8853 || x === 8857 || x === 8869 || x === 8895 || x === 8978 || x >= 9312 && x <= 9449 || x >= 9451 && x <= 9547 || x >= 9552 && x <= 9587 || x >= 9600 && x <= 9615 || x >= 9618 && x <= 9621 || x === 9632 || x === 9633 || x >= 9635 && x <= 9641 || x === 9650 || x === 9651 || x === 9654 || x === 9655 || x === 9660 || x === 9661 || x === 9664 || x === 9665 || x >= 9670 && x <= 9672 || x === 9675 || x >= 9678 && x <= 9681 || x >= 9698 && x <= 9701 || x === 9711 || x === 9733 || x === 9734 || x === 9737 || x === 9742 || x === 9743 || x === 9756 || x === 9758 || x === 9792 || x === 9794 || x === 9824 || x === 9825 || x >= 9827 && x <= 9829 || x >= 9831 && x <= 9834 || x === 9836 || x === 9837 || x === 9839 || x === 9886 || x === 9887 || x === 9919 || x >= 9926 && x <= 9933 || x >= 9935 && x <= 9939 || x >= 9941 && x <= 9953 || x === 9955 || x === 9960 || x === 9961 || x >= 9963 && x <= 9969 || x === 9972 || x >= 9974 && x <= 9977 || x === 9979 || x === 9980 || x === 9982 || x === 9983 || x === 10045 || x >= 10102 && x <= 10111 || x >= 11094 && x <= 11097 || x >= 12872 && x <= 12879 || x >= 57344 && x <= 63743 || x >= 65024 && x <= 65039 || x === 65533 || x >= 127232 && x <= 127242 || x >= 127248 && x <= 127277 || x >= 127280 && x <= 127337 || x >= 127344 && x <= 127373 || x === 127375 || x === 127376 || x >= 127387 && x <= 127404 || x >= 917760 && x <= 917999 || x >= 983040 && x <= 1048573 || x >= 1048576 && x <= 1114109;
};
var isFullWidth = (x) => {
  return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
};
var isWide = (x) => {
  return x >= 4352 && x <= 4447 || x === 8986 || x === 8987 || x === 9001 || x === 9002 || x >= 9193 && x <= 9196 || x === 9200 || x === 9203 || x === 9725 || x === 9726 || x === 9748 || x === 9749 || x >= 9800 && x <= 9811 || x === 9855 || x === 9875 || x === 9889 || x === 9898 || x === 9899 || x === 9917 || x === 9918 || x === 9924 || x === 9925 || x === 9934 || x === 9940 || x === 9962 || x === 9970 || x === 9971 || x === 9973 || x === 9978 || x === 9981 || x === 9989 || x === 9994 || x === 9995 || x === 10024 || x === 10060 || x === 10062 || x >= 10067 && x <= 10069 || x === 10071 || x >= 10133 && x <= 10135 || x === 10160 || x === 10175 || x === 11035 || x === 11036 || x === 11088 || x === 11093 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12771 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 19903 || x >= 19968 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 94176 && x <= 94180 || x === 94192 || x === 94193 || x >= 94208 && x <= 100343 || x >= 100352 && x <= 101589 || x >= 101632 && x <= 101640 || x >= 110576 && x <= 110579 || x >= 110581 && x <= 110587 || x === 110589 || x === 110590 || x >= 110592 && x <= 110882 || x === 110898 || x >= 110928 && x <= 110930 || x === 110933 || x >= 110948 && x <= 110951 || x >= 110960 && x <= 111355 || x === 126980 || x === 127183 || x === 127374 || x >= 127377 && x <= 127386 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x === 127568 || x === 127569 || x >= 127584 && x <= 127589 || x >= 127744 && x <= 127776 || x >= 127789 && x <= 127797 || x >= 127799 && x <= 127868 || x >= 127870 && x <= 127891 || x >= 127904 && x <= 127946 || x >= 127951 && x <= 127955 || x >= 127968 && x <= 127984 || x === 127988 || x >= 127992 && x <= 128062 || x === 128064 || x >= 128066 && x <= 128252 || x >= 128255 && x <= 128317 || x >= 128331 && x <= 128334 || x >= 128336 && x <= 128359 || x === 128378 || x === 128405 || x === 128406 || x === 128420 || x >= 128507 && x <= 128591 || x >= 128640 && x <= 128709 || x === 128716 || x >= 128720 && x <= 128722 || x >= 128725 && x <= 128727 || x >= 128732 && x <= 128735 || x === 128747 || x === 128748 || x >= 128756 && x <= 128764 || x >= 128992 && x <= 129003 || x === 129008 || x >= 129292 && x <= 129338 || x >= 129340 && x <= 129349 || x >= 129351 && x <= 129535 || x >= 129648 && x <= 129660 || x >= 129664 && x <= 129672 || x >= 129680 && x <= 129725 || x >= 129727 && x <= 129733 || x >= 129742 && x <= 129755 || x >= 129760 && x <= 129768 || x >= 129776 && x <= 129784 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
};

// node_modules/fast-string-truncated-width/dist/index.js
var ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/y;
var CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var TAB_RE = /\t{1,1000}/y;
var EMOJI_RE = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
var LATIN_RE = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var MODIFIER_RE = /\p{M}+/gu;
var NO_TRUNCATION = { limit: Infinity, ellipsis: "" };
var getStringTruncatedWidth = (input, truncationOptions = {}, widthOptions = {}) => {
  const LIMIT = truncationOptions.limit ?? Infinity;
  const ELLIPSIS = truncationOptions.ellipsis ?? "";
  const ELLIPSIS_WIDTH = truncationOptions?.ellipsisWidth ?? (ELLIPSIS ? getStringTruncatedWidth(ELLIPSIS, NO_TRUNCATION, widthOptions).width : 0);
  const ANSI_WIDTH = widthOptions.ansiWidth ?? 0;
  const CONTROL_WIDTH = widthOptions.controlWidth ?? 0;
  const TAB_WIDTH = widthOptions.tabWidth ?? 8;
  const AMBIGUOUS_WIDTH = widthOptions.ambiguousWidth ?? 1;
  const EMOJI_WIDTH = widthOptions.emojiWidth ?? 2;
  const FULL_WIDTH_WIDTH = widthOptions.fullWidthWidth ?? 2;
  const REGULAR_WIDTH = widthOptions.regularWidth ?? 1;
  const WIDE_WIDTH = widthOptions.wideWidth ?? 2;
  let indexPrev = 0;
  let index = 0;
  let length = input.length;
  let lengthExtra = 0;
  let truncationEnabled = false;
  let truncationIndex = length;
  let truncationLimit = Math.max(0, LIMIT - ELLIPSIS_WIDTH);
  let unmatchedStart = 0;
  let unmatchedEnd = 0;
  let width = 0;
  let widthExtra = 0;
  outer:
    while (true) {
      if (unmatchedEnd > unmatchedStart || index >= length && index > indexPrev) {
        const unmatched = input.slice(unmatchedStart, unmatchedEnd) || input.slice(indexPrev, index);
        lengthExtra = 0;
        for (const char of unmatched.replaceAll(MODIFIER_RE, "")) {
          const codePoint = char.codePointAt(0) || 0;
          if (isFullWidth(codePoint)) {
            widthExtra = FULL_WIDTH_WIDTH;
          } else if (isWide(codePoint)) {
            widthExtra = WIDE_WIDTH;
          } else if (AMBIGUOUS_WIDTH !== REGULAR_WIDTH && isAmbiguous(codePoint)) {
            widthExtra = AMBIGUOUS_WIDTH;
          } else {
            widthExtra = REGULAR_WIDTH;
          }
          if (width + widthExtra > truncationLimit) {
            truncationIndex = Math.min(truncationIndex, Math.max(unmatchedStart, indexPrev) + lengthExtra);
          }
          if (width + widthExtra > LIMIT) {
            truncationEnabled = true;
            break outer;
          }
          lengthExtra += char.length;
          width += widthExtra;
        }
        unmatchedStart = unmatchedEnd = 0;
      }
      if (index >= length)
        break;
      LATIN_RE.lastIndex = index;
      if (LATIN_RE.test(input)) {
        lengthExtra = LATIN_RE.lastIndex - index;
        widthExtra = lengthExtra * REGULAR_WIDTH;
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / REGULAR_WIDTH));
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break;
        }
        width += widthExtra;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = LATIN_RE.lastIndex;
        continue;
      }
      ANSI_RE.lastIndex = index;
      if (ANSI_RE.test(input)) {
        if (width + ANSI_WIDTH > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index);
        }
        if (width + ANSI_WIDTH > LIMIT) {
          truncationEnabled = true;
          break;
        }
        width += ANSI_WIDTH;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = ANSI_RE.lastIndex;
        continue;
      }
      CONTROL_RE.lastIndex = index;
      if (CONTROL_RE.test(input)) {
        lengthExtra = CONTROL_RE.lastIndex - index;
        widthExtra = lengthExtra * CONTROL_WIDTH;
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / CONTROL_WIDTH));
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break;
        }
        width += widthExtra;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = CONTROL_RE.lastIndex;
        continue;
      }
      TAB_RE.lastIndex = index;
      if (TAB_RE.test(input)) {
        lengthExtra = TAB_RE.lastIndex - index;
        widthExtra = lengthExtra * TAB_WIDTH;
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / TAB_WIDTH));
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break;
        }
        width += widthExtra;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = TAB_RE.lastIndex;
        continue;
      }
      EMOJI_RE.lastIndex = index;
      if (EMOJI_RE.test(input)) {
        if (width + EMOJI_WIDTH > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index);
        }
        if (width + EMOJI_WIDTH > LIMIT) {
          truncationEnabled = true;
          break;
        }
        width += EMOJI_WIDTH;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = EMOJI_RE.lastIndex;
        continue;
      }
      index += 1;
    }
  return {
    width: truncationEnabled ? truncationLimit : width,
    index: truncationEnabled ? truncationIndex : length,
    truncated: truncationEnabled,
    ellipsed: truncationEnabled && LIMIT >= ELLIPSIS_WIDTH
  };
};
var dist_default = getStringTruncatedWidth;

// node_modules/fast-string-width/dist/index.js
var NO_TRUNCATION2 = {
  limit: Infinity,
  ellipsis: "",
  ellipsisWidth: 0
};
var fastStringWidth = (input, options = {}) => {
  return dist_default(input, NO_TRUNCATION2, options).width;
};
var dist_default2 = fastStringWidth;

// node_modules/fast-wrap-ansi/lib/main.js
var ESC = "\x1B";
var CSI = "";
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var GROUP_REGEX = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`, "y");
var getClosingCode = (openingCode) => {
  if (openingCode >= 30 && openingCode <= 37)
    return 39;
  if (openingCode >= 90 && openingCode <= 97)
    return 39;
  if (openingCode >= 40 && openingCode <= 47)
    return 49;
  if (openingCode >= 100 && openingCode <= 107)
    return 49;
  if (openingCode === 1 || openingCode === 2)
    return 22;
  if (openingCode === 3)
    return 23;
  if (openingCode === 4)
    return 24;
  if (openingCode === 7)
    return 27;
  if (openingCode === 8)
    return 28;
  if (openingCode === 9)
    return 29;
  if (openingCode === 0)
    return 0;
  return;
};
var wrapAnsiCode = (code) => `${ESC}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESC}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wrapWord = (rows, word, columns) => {
  const characters = word[Symbol.iterator]();
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let lastRow = rows.at(-1);
  let visible = lastRow === undefined ? 0 : dist_default2(lastRow);
  let currentCharacter = characters.next();
  let nextCharacter = characters.next();
  let rawCharacterIndex = 0;
  while (!currentCharacter.done) {
    const character = currentCharacter.value;
    const characterLength = dist_default2(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (character === ESC || character === CSI) {
      isInsideEscape = true;
      isInsideLinkEscape = word.startsWith(ANSI_ESCAPE_LINK, rawCharacterIndex + 1);
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
    } else {
      visible += characterLength;
      if (visible === columns && !nextCharacter.done) {
        rows.push("");
        visible = 0;
      }
    }
    currentCharacter = nextCharacter;
    nextCharacter = characters.next();
    rawCharacterIndex += character.length;
  }
  lastRow = rows.at(-1);
  if (!visible && lastRow !== undefined && lastRow.length && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last) {
    if (dist_default2(words[last - 1])) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
};
var exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const words = string.split(" ");
  let rows = [""];
  let rowLength = 0;
  for (let index = 0;index < words.length; index++) {
    const word = words[index];
    if (options.trim !== false) {
      const row = rows.at(-1) ?? "";
      const trimmed = row.trimStart();
      if (row.length !== trimmed.length) {
        rows[rows.length - 1] = trimmed;
        rowLength = dist_default2(trimmed);
      }
    }
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    const wordLength = dist_default2(word);
    if (options.hard && wordLength > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((wordLength - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      rowLength = dist_default2(rows.at(-1) ?? "");
      continue;
    }
    if (rowLength + wordLength > columns && rowLength && wordLength) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        rowLength = dist_default2(rows.at(-1) ?? "");
        continue;
      }
      rows.push("");
      rowLength = 0;
    }
    if (rowLength + wordLength > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      rowLength = dist_default2(rows.at(-1) ?? "");
      continue;
    }
    rows[rows.length - 1] += word;
    rowLength += wordLength;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join(`
`);
  let inSurrogate = false;
  for (let i = 0;i < preString.length; i++) {
    const character = preString[i];
    returnValue += character;
    if (!inSurrogate) {
      inSurrogate = character >= "\uD800" && character <= "\uDBFF";
    } else {
      continue;
    }
    if (character === ESC || character === CSI) {
      GROUP_REGEX.lastIndex = i + 1;
      const groupsResult = GROUP_REGEX.exec(preString);
      const groups = groupsResult?.groups;
      if (groups?.code !== undefined) {
        const code = Number.parseFloat(groups.code);
        escapeCode = code === END_CODE ? undefined : code;
      } else if (groups?.uri !== undefined) {
        escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
      }
    }
    if (preString[i + 1] === `
`) {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      const closingCode = escapeCode ? getClosingCode(escapeCode) : undefined;
      if (escapeCode && closingCode) {
        returnValue += wrapAnsiCode(closingCode);
      }
    } else if (character === `
`) {
      if (escapeCode && getClosingCode(escapeCode)) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
  }
  return returnValue;
};
var CRLF_OR_LF = /\r?\n/;
function wrapAnsi(string, columns, options) {
  return String(string).normalize().split(CRLF_OR_LF).map((line) => exec(line, columns, options)).join(`
`);
}

// node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src(), 1);
import { ReadStream as D } from "node:tty";
function d(r, t, e) {
  if (!e.some((o) => !o.disabled))
    return r;
  const s = r + t, i = Math.max(e.length - 1, 0), n = s < 0 ? i : s > i ? 0 : s;
  return e[n].disabled ? d(n, t < 0 ? -1 : 1, e) : n;
}
var E = ["up", "down", "left", "right", "space", "enter", "cancel"];
var G = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var u = { actions: new Set(E), aliases: new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"], ["\x03", "cancel"], ["escape", "cancel"]]), messages: { cancel: "Canceled", error: "Something went wrong" }, withGuide: true, date: { monthNames: [...G], messages: { required: "Please enter a valid date", invalidMonth: "There are only 12 months in a year", invalidDay: (r, t) => `There are only ${r} days in ${t}`, afterMin: (r) => `Date must be on or after ${r.toISOString().slice(0, 10)}`, beforeMax: (r) => `Date must be on or before ${r.toISOString().slice(0, 10)}` } } };
function V(r, t) {
  if (typeof r == "string")
    return u.aliases.get(r) === t;
  for (const e of r)
    if (e !== undefined && V(e, t))
      return true;
  return false;
}
function j(r, t) {
  if (r === t)
    return;
  const e = r.split(`
`), s = t.split(`
`), i = Math.max(e.length, s.length), n = [];
  for (let o = 0;o < i; o++)
    e[o] !== s[o] && n.push(o);
  return { lines: n, numLinesBefore: e.length, numLinesAfter: s.length, numLines: i };
}
var Y = globalThis.process.platform.startsWith("win");
var C = Symbol("clack:cancel");
function q(r) {
  return r === C;
}
function w(r, t) {
  const e = r;
  e.isTTY && e.setRawMode(t);
}
function z({ input: r = $, output: t = S, overwrite: e = true, hideCursor: s = true } = {}) {
  const i = _.createInterface({ input: r, output: t, prompt: "", tabSize: 1 });
  _.emitKeypressEvents(r, i), r instanceof D && r.isTTY && r.setRawMode(true);
  const n = (o, { name: a, sequence: h }) => {
    const l = String(o);
    if (V([l, a, h], "cancel")) {
      s && t.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!e)
      return;
    const f = a === "return" ? 0 : -1, v = a === "return" ? -1 : 0;
    _.moveCursor(t, f, v, () => {
      _.clearLine(t, 1, () => {
        r.once("keypress", n);
      });
    });
  };
  return s && t.write(import_sisteransi.cursor.hide), r.once("keypress", n), () => {
    r.off("keypress", n), s && t.write(import_sisteransi.cursor.show), r instanceof D && r.isTTY && !Y && r.setRawMode(false), i.terminal = false, i.close();
  };
}
var O = (r) => ("columns" in r) && typeof r.columns == "number" ? r.columns : 80;
var A = (r) => ("rows" in r) && typeof r.rows == "number" ? r.rows : 20;
function R(r, t, e, s = e) {
  const i = O(r ?? S);
  return wrapAnsi(t, i - e.length, { hard: true, trim: false }).split(`
`).map((n, o) => `${o === 0 ? s : e}${n}`).join(`
`);
}
var p = class {
  input;
  output;
  _abortSignal;
  rl;
  opts;
  _render;
  _track = false;
  _prevFrame = "";
  _subscribers = new Map;
  _cursor = 0;
  state = "initial";
  error = "";
  value;
  userInput = "";
  constructor(t, e = true) {
    const { input: s = $, output: i = S, render: n, signal: o, ...a } = t;
    this.opts = a, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = n.bind(this), this._track = e, this._abortSignal = o, this.input = s, this.output = i;
  }
  unsubscribe() {
    this._subscribers.clear();
  }
  setSubscriber(t, e) {
    const s = this._subscribers.get(t) ?? [];
    s.push(e), this._subscribers.set(t, s);
  }
  on(t, e) {
    this.setSubscriber(t, { cb: e });
  }
  once(t, e) {
    this.setSubscriber(t, { cb: e, once: true });
  }
  emit(t, ...e) {
    const s = this._subscribers.get(t) ?? [], i = [];
    for (const n of s)
      n.cb(...e), n.once && i.push(() => s.splice(s.indexOf(n), 1));
    for (const n of i)
      n();
  }
  prompt() {
    return new Promise((t) => {
      if (this._abortSignal) {
        if (this._abortSignal.aborted)
          return this.state = "cancel", this.close(), t(C);
        this._abortSignal.addEventListener("abort", () => {
          this.state = "cancel", this.close();
        }, { once: true });
      }
      this.rl = P.createInterface({ input: this.input, tabSize: 2, prompt: "", escapeCodeTimeout: 50, terminal: true }), this.rl.prompt(), this.opts.initialUserInput !== undefined && this._setUserInput(this.opts.initialUserInput, true), this.input.on("keypress", this.onKeypress), w(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), w(this.input, false), t(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), w(this.input, false), t(C);
      });
    });
  }
  _isActionKey(t, e) {
    return t === "\t";
  }
  _setValue(t) {
    this.value = t, this.emit("value", this.value);
  }
  _setUserInput(t, e) {
    this.userInput = t ?? "", this.emit("userInput", this.userInput), e && this._track && this.rl && (this.rl.write(this.userInput), this._cursor = this.rl.cursor);
  }
  _clearUserInput() {
    this.rl?.write(null, { ctrl: true, name: "u" }), this._setUserInput("");
  }
  onKeypress(t, e) {
    if (this._track && e.name !== "return" && (e.name && this._isActionKey(t, e) && this.rl?.write(null, { ctrl: true, name: "h" }), this._cursor = this.rl?.cursor ?? 0, this._setUserInput(this.rl?.line)), this.state === "error" && (this.state = "active"), e?.name && (!this._track && u.aliases.has(e.name) && this.emit("cursor", u.aliases.get(e.name)), u.actions.has(e.name) && this.emit("cursor", e.name)), t && (t.toLowerCase() === "y" || t.toLowerCase() === "n") && this.emit("confirm", t.toLowerCase() === "y"), this.emit("key", t?.toLowerCase(), e), e?.name === "return") {
      if (this.opts.validate) {
        const s = this.opts.validate(this.value);
        s && (this.error = s instanceof Error ? s.message : s, this.state = "error", this.rl?.write(this.userInput));
      }
      this.state !== "error" && (this.state = "submit");
    }
    V([t, e?.name, e?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), w(this.input, false), this.rl?.close(), this.rl = undefined, this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const t = wrapAnsi(this._prevFrame, process.stdout.columns, { hard: true, trim: false }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, t * -1));
  }
  render() {
    const t = wrapAnsi(this._render(this) ?? "", process.stdout.columns, { hard: true, trim: false });
    if (t !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const e = j(this._prevFrame, t), s = A(this.output);
        if (this.restoreCursor(), e) {
          const i = Math.max(0, e.numLinesAfter - s), n = Math.max(0, e.numLinesBefore - s);
          let o = e.lines.find((a) => a >= i);
          if (o === undefined) {
            this._prevFrame = t;
            return;
          }
          if (e.lines.length === 1) {
            this.output.write(import_sisteransi.cursor.move(0, o - n)), this.output.write(import_sisteransi.erase.lines(1));
            const a = t.split(`
`);
            this.output.write(a[o]), this._prevFrame = t, this.output.write(import_sisteransi.cursor.move(0, a.length - o - 1));
            return;
          } else if (e.lines.length > 1) {
            if (i < n)
              o = i;
            else {
              const h = o - n;
              h > 0 && this.output.write(import_sisteransi.cursor.move(0, h));
            }
            this.output.write(import_sisteransi.erase.down());
            const a = t.split(`
`).slice(o);
            this.output.write(a.join(`
`)), this._prevFrame = t;
            return;
          }
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(t), this.state === "initial" && (this.state = "active"), this._prevFrame = t;
    }
  }
};
function W(r, t) {
  if (r === undefined || t.length === 0)
    return 0;
  const e = t.findIndex((s) => s.value === r);
  return e !== -1 ? e : 0;
}
function B(r, t) {
  return (t.label ?? String(t.value)).toLowerCase().includes(r.toLowerCase());
}
function J(r, t) {
  if (t)
    return r ? t : t[0];
}
var H = class extends p {
  filteredOptions;
  multiple;
  isNavigating = false;
  selectedValues = [];
  focusedValue;
  #e = 0;
  #o = "";
  #t;
  #n;
  #a;
  get cursor() {
    return this.#e;
  }
  get userInputWithCursor() {
    if (!this.userInput)
      return y(["inverse", "hidden"], "_");
    if (this._cursor >= this.userInput.length)
      return `${this.userInput}█`;
    const t = this.userInput.slice(0, this._cursor), [e, ...s] = this.userInput.slice(this._cursor);
    return `${t}${y("inverse", e)}${s.join("")}`;
  }
  get options() {
    return typeof this.#n == "function" ? this.#n() : this.#n;
  }
  constructor(t) {
    super(t), this.#n = t.options, this.#a = t.placeholder;
    const e = this.options;
    this.filteredOptions = [...e], this.multiple = t.multiple === true, this.#t = typeof t.options == "function" ? t.filter : t.filter ?? B;
    let s;
    if (t.initialValue && Array.isArray(t.initialValue) ? this.multiple ? s = t.initialValue : s = t.initialValue.slice(0, 1) : !this.multiple && this.options.length > 0 && (s = [this.options[0].value]), s)
      for (const i of s) {
        const n = e.findIndex((o) => o.value === i);
        n !== -1 && (this.toggleSelected(i), this.#e = n);
      }
    this.focusedValue = this.options[this.#e]?.value, this.on("key", (i, n) => this.#s(i, n)), this.on("userInput", (i) => this.#i(i));
  }
  _isActionKey(t, e) {
    return t === "\t" || this.multiple && this.isNavigating && e.name === "space" && t !== undefined && t !== "";
  }
  #s(t, e) {
    const s = e.name === "up", i = e.name === "down", n = e.name === "return", o = this.userInput === "" || this.userInput === "\t", a = this.#a, h = this.options, l = a !== undefined && a !== "" && h.some((f) => !f.disabled && (this.#t ? this.#t(a, f) : true));
    if (e.name === "tab" && o && l) {
      this.userInput === "\t" && this._clearUserInput(), this._setUserInput(a, true), this.isNavigating = false;
      return;
    }
    s || i ? (this.#e = d(this.#e, s ? -1 : 1, this.filteredOptions), this.focusedValue = this.filteredOptions[this.#e]?.value, this.multiple || (this.selectedValues = [this.focusedValue]), this.isNavigating = true) : n ? this.value = J(this.multiple, this.selectedValues) : this.multiple ? this.focusedValue !== undefined && (e.name === "tab" || this.isNavigating && e.name === "space") ? this.toggleSelected(this.focusedValue) : this.isNavigating = false : (this.focusedValue && (this.selectedValues = [this.focusedValue]), this.isNavigating = false);
  }
  deselectAll() {
    this.selectedValues = [];
  }
  toggleSelected(t) {
    this.filteredOptions.length !== 0 && (this.multiple ? this.selectedValues.includes(t) ? this.selectedValues = this.selectedValues.filter((e) => e !== t) : this.selectedValues = [...this.selectedValues, t] : this.selectedValues = [t]);
  }
  #i(t) {
    if (t !== this.#o) {
      this.#o = t;
      const e = this.options;
      t && this.#t ? this.filteredOptions = e.filter((n) => this.#t?.(t, n)) : this.filteredOptions = [...e];
      const s = W(this.focusedValue, this.filteredOptions);
      this.#e = d(s, 0, this.filteredOptions);
      const i = this.filteredOptions[this.#e];
      i && !i.disabled ? this.focusedValue = i.value : this.focusedValue = undefined, this.multiple || (this.focusedValue !== undefined ? this.toggleSelected(this.focusedValue) : this.deselectAll());
    }
  }
};
var X = { Y: { type: "year", len: 4 }, M: { type: "month", len: 2 }, D: { type: "day", len: 2 } };
function L(r) {
  return [...r].map((t) => X[t]);
}
function Z(r) {
  const t = new Intl.DateTimeFormat(r, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(2000, 0, 15)), e = [];
  let s = "/";
  for (const i of t)
    i.type === "literal" ? s = i.value.trim() || i.value : (i.type === "year" || i.type === "month" || i.type === "day") && e.push({ type: i.type, len: i.type === "year" ? 4 : 2 });
  return { segments: e, separator: s };
}
function k(r) {
  return Number.parseInt((r || "0").replace(/_/g, "0"), 10) || 0;
}
function I(r) {
  return { year: k(r.year), month: k(r.month), day: k(r.day) };
}
function T(r, t) {
  return new Date(r || 2001, t || 1, 0).getDate();
}
function F(r) {
  const { year: t, month: e, day: s } = I(r);
  if (!t || t < 0 || t > 9999 || !e || e < 1 || e > 12 || !s || s < 1)
    return;
  const i = new Date(Date.UTC(t, e - 1, s));
  if (!(i.getUTCFullYear() !== t || i.getUTCMonth() !== e - 1 || i.getUTCDate() !== s))
    return { year: t, month: e, day: s };
}
function N(r) {
  const t = F(r);
  return t ? new Date(Date.UTC(t.year, t.month - 1, t.day)) : undefined;
}
function tt(r, t, e, s) {
  const i = e ? { year: e.getUTCFullYear(), month: e.getUTCMonth() + 1, day: e.getUTCDate() } : null, n = s ? { year: s.getUTCFullYear(), month: s.getUTCMonth() + 1, day: s.getUTCDate() } : null;
  return r === "year" ? { min: i?.year ?? 1, max: n?.year ?? 9999 } : r === "month" ? { min: i && t.year === i.year ? i.month : 1, max: n && t.year === n.year ? n.month : 12 } : { min: i && t.year === i.year && t.month === i.month ? i.day : 1, max: n && t.year === n.year && t.month === n.month ? n.day : T(t.year, t.month) };
}

class et extends p {
  #e;
  #o;
  #t;
  #n;
  #a;
  #s = { segmentIndex: 0, positionInSegment: 0 };
  #i = true;
  #r = null;
  inlineError = "";
  get segmentCursor() {
    return { ...this.#s };
  }
  get segmentValues() {
    return { ...this.#t };
  }
  get segments() {
    return this.#e;
  }
  get separator() {
    return this.#o;
  }
  get formattedValue() {
    return this.#c(this.#t);
  }
  #c(t) {
    return this.#e.map((e) => t[e.type]).join(this.#o);
  }
  #h() {
    this._setUserInput(this.#c(this.#t)), this._setValue(N(this.#t) ?? undefined);
  }
  constructor(t) {
    const e = t.format ? { segments: L(t.format), separator: t.separator ?? "/" } : Z(t.locale), s = t.separator ?? e.separator, i = t.format ? L(t.format) : e.segments, n = t.initialValue ?? t.defaultValue, o = n ? { year: String(n.getUTCFullYear()).padStart(4, "0"), month: String(n.getUTCMonth() + 1).padStart(2, "0"), day: String(n.getUTCDate()).padStart(2, "0") } : { year: "____", month: "__", day: "__" }, a = i.map((h) => o[h.type]).join(s);
    super({ ...t, initialUserInput: a }, false), this.#e = i, this.#o = s, this.#t = o, this.#n = t.minDate, this.#a = t.maxDate, this.#h(), this.on("cursor", (h) => this.#d(h)), this.on("key", (h, l) => this.#f(h, l)), this.on("finalize", () => this.#g(t));
  }
  #u() {
    const t = Math.max(0, Math.min(this.#s.segmentIndex, this.#e.length - 1)), e = this.#e[t];
    if (e)
      return this.#s.positionInSegment = Math.max(0, Math.min(this.#s.positionInSegment, e.len - 1)), { segment: e, index: t };
  }
  #l(t) {
    this.inlineError = "", this.#r = null;
    const e = this.#u();
    e && (this.#s.segmentIndex = Math.max(0, Math.min(this.#e.length - 1, e.index + t)), this.#s.positionInSegment = 0, this.#i = true);
  }
  #p(t) {
    const e = this.#u();
    if (!e)
      return;
    const { segment: s } = e, i = this.#t[s.type], n = !i || i.replace(/_/g, "") === "", o = Number.parseInt((i || "0").replace(/_/g, "0"), 10) || 0, a = tt(s.type, I(this.#t), this.#n, this.#a);
    let h;
    n ? h = t === 1 ? a.min : a.max : h = Math.max(Math.min(a.max, o + t), a.min), this.#t = { ...this.#t, [s.type]: h.toString().padStart(s.len, "0") }, this.#i = true, this.#r = null, this.#h();
  }
  #d(t) {
    if (t)
      switch (t) {
        case "right":
          return this.#l(1);
        case "left":
          return this.#l(-1);
        case "up":
          return this.#p(1);
        case "down":
          return this.#p(-1);
      }
  }
  #f(t, e) {
    if (e?.name === "backspace" || e?.sequence === "" || e?.sequence === "\b" || t === "" || t === "\b") {
      this.inlineError = "";
      const s = this.#u();
      if (!s)
        return;
      if (!this.#t[s.segment.type].replace(/_/g, "")) {
        this.#l(-1);
        return;
      }
      this.#t[s.segment.type] = "_".repeat(s.segment.len), this.#i = true, this.#s.positionInSegment = 0, this.#h();
      return;
    }
    if (e?.name === "tab") {
      this.inlineError = "";
      const s = this.#u();
      if (!s)
        return;
      const i = e.shift ? -1 : 1, n = s.index + i;
      n >= 0 && n < this.#e.length && (this.#s.segmentIndex = n, this.#s.positionInSegment = 0, this.#i = true);
      return;
    }
    if (t && /^[0-9]$/.test(t)) {
      const s = this.#u();
      if (!s)
        return;
      const { segment: i } = s, n = !this.#t[i.type].replace(/_/g, "");
      if (this.#i && this.#r !== null && !n) {
        const m = this.#r + t, g = { ...this.#t, [i.type]: m }, b = this.#m(g, i);
        if (b) {
          this.inlineError = b, this.#r = null, this.#i = false;
          return;
        }
        this.inlineError = "", this.#t[i.type] = m, this.#r = null, this.#i = false, this.#h(), s.index < this.#e.length - 1 && (this.#s.segmentIndex = s.index + 1, this.#s.positionInSegment = 0, this.#i = true);
        return;
      }
      this.#i && !n && (this.#t[i.type] = "_".repeat(i.len), this.#s.positionInSegment = 0), this.#i = false, this.#r = null;
      const o = this.#t[i.type], a = o.indexOf("_"), h = a >= 0 ? a : Math.min(this.#s.positionInSegment, i.len - 1);
      if (h < 0 || h >= i.len)
        return;
      let l = o.slice(0, h) + t + o.slice(h + 1), f = false;
      if (h === 0 && o === "__" && (i.type === "month" || i.type === "day")) {
        const m = Number.parseInt(t, 10);
        l = `0${t}`, f = m <= (i.type === "month" ? 1 : 2);
      }
      if (i.type === "year" && (l = (o.replace(/_/g, "") + t).padStart(i.len, "_")), !l.includes("_")) {
        const m = { ...this.#t, [i.type]: l }, g = this.#m(m, i);
        if (g) {
          this.inlineError = g;
          return;
        }
      }
      this.inlineError = "", this.#t[i.type] = l;
      const v = l.includes("_") ? undefined : F(this.#t);
      if (v) {
        const { year: m, month: g } = v, b = T(m, g);
        this.#t = { year: String(Math.max(0, Math.min(9999, m))).padStart(4, "0"), month: String(Math.max(1, Math.min(12, g))).padStart(2, "0"), day: String(Math.max(1, Math.min(b, v.day))).padStart(2, "0") };
      }
      this.#h();
      const U = l.indexOf("_");
      f ? (this.#i = true, this.#r = t) : U >= 0 ? this.#s.positionInSegment = U : a >= 0 && s.index < this.#e.length - 1 ? (this.#s.segmentIndex = s.index + 1, this.#s.positionInSegment = 0, this.#i = true) : this.#s.positionInSegment = Math.min(h + 1, i.len - 1);
    }
  }
  #m(t, e) {
    const { month: s, day: i } = I(t);
    if (e.type === "month" && (s < 0 || s > 12))
      return u.date.messages.invalidMonth;
    if (e.type === "day" && (i < 0 || i > 31))
      return u.date.messages.invalidDay(31, "any month");
  }
  #g(t) {
    const { year: e, month: s, day: i } = I(this.#t);
    if (e && s && i) {
      const n = T(e, s);
      this.#t = { ...this.#t, day: String(Math.min(i, n)).padStart(2, "0") };
    }
    this.value = N(this.#t) ?? t.defaultValue ?? undefined;
  }
}

class st extends p {
  options;
  cursor = 0;
  #e;
  getGroupItems(t) {
    return this.options.filter((e) => e.group === t);
  }
  isGroupSelected(t) {
    const e = this.getGroupItems(t), s = this.value;
    return s === undefined ? false : e.every((i) => s.includes(i.value));
  }
  toggleValue() {
    const t = this.options[this.cursor];
    if (this.value === undefined && (this.value = []), t.group === true) {
      const e = t.value, s = this.getGroupItems(e);
      this.isGroupSelected(e) ? this.value = this.value.filter((i) => s.findIndex((n) => n.value === i) === -1) : this.value = [...this.value, ...s.map((i) => i.value)], this.value = Array.from(new Set(this.value));
    } else {
      const e = this.value.includes(t.value);
      this.value = e ? this.value.filter((s) => s !== t.value) : [...this.value, t.value];
    }
  }
  constructor(t) {
    super(t, false);
    const { options: e } = t;
    this.#e = t.selectableGroups !== false, this.options = Object.entries(e).flatMap(([s, i]) => [{ value: s, group: true, label: s }, ...i.map((n) => ({ ...n, group: s }))]), this.value = [...t.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: s }) => s === t.cursorAt), this.#e ? 0 : 1), this.on("cursor", (s) => {
      switch (s) {
        case "left":
        case "up": {
          this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
          const i = this.options[this.cursor]?.group === true;
          !this.#e && i && (this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
          break;
        }
        case "down":
        case "right": {
          this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
          const i = this.options[this.cursor]?.group === true;
          !this.#e && i && (this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
          break;
        }
        case "space":
          this.toggleValue();
          break;
      }
    });
  }
}
class nt extends p {
  options;
  cursor = 0;
  get _selectedValue() {
    return this.options[this.cursor];
  }
  changeValue() {
    this.value = this._selectedValue.value;
  }
  constructor(t) {
    super(t, false), this.options = t.options;
    const e = this.options.findIndex(({ value: i }) => i === t.initialValue), s = e === -1 ? 0 : e;
    this.cursor = this.options[s].disabled ? d(s, 1, this.options) : s, this.changeValue(), this.on("cursor", (i) => {
      switch (i) {
        case "left":
        case "up":
          this.cursor = d(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = d(this.cursor, 1, this.options);
          break;
      }
      this.changeValue();
    });
  }
}
class at extends p {
  get userInputWithCursor() {
    if (this.state === "submit")
      return this.userInput;
    const t = this.userInput;
    if (this.cursor >= t.length)
      return `${this.userInput}█`;
    const e = t.slice(0, this.cursor), [s, ...i] = t.slice(this.cursor);
    return `${e}${y("inverse", s)}${i.join("")}`;
  }
  get cursor() {
    return this._cursor;
  }
  constructor(t) {
    super({ ...t, initialUserInput: t.initialUserInput ?? t.initialValue }), this.on("userInput", (e) => {
      this._setValue(e);
    }), this.on("finalize", () => {
      this.value || (this.value = t.defaultValue), this.value === undefined && (this.value = "");
    });
  }
}

// node_modules/@clack/prompts/dist/index.mjs
import { styleText as t, stripVTControlCharacters as ne } from "node:util";
import P2 from "node:process";
var import_sisteransi2 = __toESM(require_src(), 1);
function Ze() {
  return P2.platform !== "win32" ? P2.env.TERM !== "linux" : !!P2.env.CI || !!P2.env.WT_SESSION || !!P2.env.TERMINUS_SUBLIME || P2.env.ConEmuTask === "{cmd::Cmder}" || P2.env.TERM_PROGRAM === "Terminus-Sublime" || P2.env.TERM_PROGRAM === "vscode" || P2.env.TERM === "xterm-256color" || P2.env.TERM === "alacritty" || P2.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var ee = Ze();
var ae = () => process.env.CI === "true";
var w2 = (e, i) => ee ? e : i;
var _e = w2("◆", "*");
var oe = w2("■", "x");
var ue = w2("▲", "x");
var F2 = w2("◇", "o");
var le = w2("┌", "T");
var d2 = w2("│", "|");
var E2 = w2("└", "—");
var Ie = w2("┐", "T");
var Ee = w2("┘", "—");
var z2 = w2("●", ">");
var H2 = w2("○", " ");
var te = w2("◻", "[•]");
var U = w2("◼", "[+]");
var J2 = w2("◻", "[ ]");
var xe = w2("▪", "•");
var se = w2("─", "-");
var ce = w2("╮", "+");
var Ge = w2("├", "+");
var $e = w2("╯", "+");
var de = w2("╰", "+");
var Oe = w2("╭", "+");
var he = w2("●", "•");
var pe = w2("◆", "*");
var me = w2("▲", "!");
var ge = w2("■", "x");
var V2 = (e) => {
  switch (e) {
    case "initial":
    case "active":
      return t("cyan", _e);
    case "cancel":
      return t("red", oe);
    case "error":
      return t("yellow", ue);
    case "submit":
      return t("green", F2);
  }
};
var ye = (e) => {
  switch (e) {
    case "initial":
    case "active":
      return t("cyan", d2);
    case "cancel":
      return t("red", d2);
    case "error":
      return t("yellow", d2);
    case "submit":
      return t("green", d2);
  }
};
var et2 = (e, i, s, r, u2) => {
  let n = i, o = 0;
  for (let c2 = s;c2 < r; c2++) {
    const a = e[c2];
    if (n = n - a.length, o++, n <= u2)
      break;
  }
  return { lineCount: n, removals: o };
};
var Y2 = ({ cursor: e, options: i, style: s, output: r = process.stdout, maxItems: u2 = Number.POSITIVE_INFINITY, columnPadding: n = 0, rowPadding: o = 4 }) => {
  const c2 = O(r) - n, a = A(r), l = t("dim", "..."), $2 = Math.max(a - o, 0), y2 = Math.max(Math.min(u2, $2), 5);
  let p2 = 0;
  e >= y2 - 3 && (p2 = Math.max(Math.min(e - y2 + 3, i.length - y2), 0));
  let m = y2 < i.length && p2 > 0, g = y2 < i.length && p2 + y2 < i.length;
  const S2 = Math.min(p2 + y2, i.length), h = [];
  let f = 0;
  m && f++, g && f++;
  const v = p2 + (m ? 1 : 0), T2 = S2 - (g ? 1 : 0);
  for (let b = v;b < T2; b++) {
    const x = wrapAnsi(s(i[b], b === e), c2, { hard: true, trim: false }).split(`
`);
    h.push(x), f += x.length;
  }
  if (f > $2) {
    let b = 0, x = 0, G2 = f;
    const M2 = e - v, R2 = (j2, D2) => et2(h, G2, j2, D2, $2);
    m ? ({ lineCount: G2, removals: b } = R2(0, M2), G2 > $2 && ({ lineCount: G2, removals: x } = R2(M2 + 1, h.length))) : ({ lineCount: G2, removals: x } = R2(M2 + 1, h.length), G2 > $2 && ({ lineCount: G2, removals: b } = R2(0, M2))), b > 0 && (m = true, h.splice(0, b)), x > 0 && (g = true, h.splice(h.length - x, x));
  }
  const C2 = [];
  m && C2.push(l);
  for (const b of h)
    for (const x of b)
      C2.push(x);
  return g && C2.push(l), C2;
};
var O2 = { message: (e = [], { symbol: i = t("gray", d2), secondarySymbol: s = t("gray", d2), output: r = process.stdout, spacing: u2 = 1, withGuide: n } = {}) => {
  const o = [], c2 = n ?? u.withGuide, a = c2 ? s : "", l = c2 ? `${i}  ` : "", $2 = c2 ? `${s}  ` : "";
  for (let p2 = 0;p2 < u2; p2++)
    o.push(a);
  const y2 = Array.isArray(e) ? e : e.split(`
`);
  if (y2.length > 0) {
    const [p2, ...m] = y2;
    p2.length > 0 ? o.push(`${l}${p2}`) : o.push(c2 ? i : "");
    for (const g of m)
      g.length > 0 ? o.push(`${$2}${g}`) : o.push(c2 ? s : "");
  }
  r.write(`${o.join(`
`)}
`);
}, info: (e, i) => {
  O2.message(e, { ...i, symbol: t("blue", he) });
}, success: (e, i) => {
  O2.message(e, { ...i, symbol: t("green", pe) });
}, step: (e, i) => {
  O2.message(e, { ...i, symbol: t("green", F2) });
}, warn: (e, i) => {
  O2.message(e, { ...i, symbol: t("yellow", me) });
}, warning: (e, i) => {
  O2.warn(e, i);
}, error: (e, i) => {
  O2.message(e, { ...i, symbol: t("red", ge) });
} };
var pt = (e = "", i) => {
  const s = i?.output ?? process.stdout, r = i?.withGuide ?? u.withGuide ? `${t("gray", E2)}  ` : "";
  s.write(`${r}${t("red", e)}

`);
};
var mt = (e = "", i) => {
  const s = i?.output ?? process.stdout, r = i?.withGuide ?? u.withGuide ? `${t("gray", le)}  ` : "";
  s.write(`${r}${e}
`);
};
var gt = (e = "", i) => {
  const s = i?.output ?? process.stdout, r = i?.withGuide ?? u.withGuide ? `${t("gray", d2)}
${t("gray", E2)}  ` : "";
  s.write(`${r}${e}

`);
};
var ft = (e) => t("dim", e);
var vt = (e, i, s) => {
  const r = { hard: true, trim: false }, u2 = wrapAnsi(e, i, r).split(`
`), n = u2.reduce((a, l) => Math.max(dist_default2(l), a), 0), o = u2.map(s).reduce((a, l) => Math.max(dist_default2(l), a), 0), c2 = i - (o - n);
  return wrapAnsi(e, c2, r);
};
var wt = (e = "", i = "", s) => {
  const r = s?.output ?? P2.stdout, u2 = s?.withGuide ?? u.withGuide, n = s?.format ?? ft, o = ["", ...vt(e, O(r) - 6, n).split(`
`).map(n), ""], c2 = dist_default2(i), a = Math.max(o.reduce((p2, m) => {
    const g = dist_default2(m);
    return g > p2 ? g : p2;
  }, 0), c2) + 2, l = o.map((p2) => `${t("gray", d2)}  ${p2}${" ".repeat(a - dist_default2(p2))}${t("gray", d2)}`).join(`
`), $2 = u2 ? `${t("gray", d2)}
` : "", y2 = u2 ? Ge : de;
  r.write(`${$2}${t("green", F2)}  ${t("reset", i)} ${t("gray", se.repeat(Math.max(a - c2 - 1, 1)) + ce)}
${l}
${t("gray", y2 + se.repeat(a + 2) + $e)}
`);
};
var Ct = (e) => t("magenta", e);
var fe = ({ indicator: e = "dots", onCancel: i, output: s = process.stdout, cancelMessage: r, errorMessage: u2, frames: n = ee ? ["◒", "◐", "◓", "◑"] : ["•", "o", "O", "0"], delay: o = ee ? 80 : 120, signal: c2, ...a } = {}) => {
  const l = ae();
  let $2, y2, p2 = false, m = false, g = "", S2, h = performance.now();
  const f = O(s), v = a?.styleFrame ?? Ct, T2 = (_2) => {
    const A2 = _2 > 1 ? u2 ?? u.messages.error : r ?? u.messages.cancel;
    m = _2 === 1, p2 && (W2(A2, _2), m && typeof i == "function" && i());
  }, C2 = () => T2(2), b = () => T2(1), x = () => {
    process.on("uncaughtExceptionMonitor", C2), process.on("unhandledRejection", C2), process.on("SIGINT", b), process.on("SIGTERM", b), process.on("exit", T2), c2 && c2.addEventListener("abort", b);
  }, G2 = () => {
    process.removeListener("uncaughtExceptionMonitor", C2), process.removeListener("unhandledRejection", C2), process.removeListener("SIGINT", b), process.removeListener("SIGTERM", b), process.removeListener("exit", T2), c2 && c2.removeEventListener("abort", b);
  }, M2 = () => {
    if (S2 === undefined)
      return;
    l && s.write(`
`);
    const _2 = wrapAnsi(S2, f, { hard: true, trim: false }).split(`
`);
    _2.length > 1 && s.write(import_sisteransi2.cursor.up(_2.length - 1)), s.write(import_sisteransi2.cursor.to(0)), s.write(import_sisteransi2.erase.down());
  }, R2 = (_2) => _2.replace(/\.+$/, ""), j2 = (_2) => {
    const A2 = (performance.now() - _2) / 1000, k2 = Math.floor(A2 / 60), L2 = Math.floor(A2 % 60);
    return k2 > 0 ? `[${k2}m ${L2}s]` : `[${L2}s]`;
  }, D2 = a.withGuide ?? u.withGuide, ie = (_2 = "") => {
    p2 = true, $2 = z({ output: s }), g = R2(_2), h = performance.now(), D2 && s.write(`${t("gray", d2)}
`);
    let A2 = 0, k2 = 0;
    x(), y2 = setInterval(() => {
      if (l && g === S2)
        return;
      M2(), S2 = g;
      const L2 = v(n[A2]);
      let Z2;
      if (l)
        Z2 = `${L2}  ${g}...`;
      else if (e === "timer")
        Z2 = `${L2}  ${g} ${j2(h)}`;
      else {
        const Be = ".".repeat(Math.floor(k2)).slice(0, 3);
        Z2 = `${L2}  ${g}${Be}`;
      }
      const Ne = wrapAnsi(Z2, f, { hard: true, trim: false });
      s.write(Ne), A2 = A2 + 1 < n.length ? A2 + 1 : 0, k2 = k2 < 4 ? k2 + 0.125 : 0;
    }, o);
  }, W2 = (_2 = "", A2 = 0, k2 = false) => {
    if (!p2)
      return;
    p2 = false, clearInterval(y2), M2();
    const L2 = A2 === 0 ? t("green", F2) : A2 === 1 ? t("red", oe) : t("red", ue);
    g = _2 ?? g, k2 || (e === "timer" ? s.write(`${L2}  ${g} ${j2(h)}
`) : s.write(`${L2}  ${g}
`)), G2(), $2();
  };
  return { start: ie, stop: (_2 = "") => W2(_2, 0), message: (_2 = "") => {
    g = R2(_2 ?? g);
  }, cancel: (_2 = "") => W2(_2, 1), error: (_2 = "") => W2(_2, 2), clear: () => W2("", 0, true), get isCancelled() {
    return m;
  } };
};
var Ve = { light: w2("─", "-"), heavy: w2("━", "="), block: w2("█", "#") };
var re = (e, i) => e.includes(`
`) ? e.split(`
`).map((s) => i(s)).join(`
`) : i(e);
var _t = (e) => {
  const i = (s, r) => {
    const u2 = s.label ?? String(s.value);
    switch (r) {
      case "disabled":
        return `${t("gray", H2)} ${re(u2, (n) => t("gray", n))}${s.hint ? ` ${t("dim", `(${s.hint ?? "disabled"})`)}` : ""}`;
      case "selected":
        return `${re(u2, (n) => t("dim", n))}`;
      case "active":
        return `${t("green", z2)} ${u2}${s.hint ? ` ${t("dim", `(${s.hint})`)}` : ""}`;
      case "cancelled":
        return `${re(u2, (n) => t(["strikethrough", "dim"], n))}`;
      default:
        return `${t("dim", H2)} ${re(u2, (n) => t("dim", n))}`;
    }
  };
  return new nt({ options: e.options, signal: e.signal, input: e.input, output: e.output, initialValue: e.initialValue, render() {
    const s = e.withGuide ?? u.withGuide, r = `${V2(this.state)}  `, u2 = `${ye(this.state)}  `, n = R(e.output, e.message, u2, r), o = `${s ? `${t("gray", d2)}
` : ""}${n}
`;
    switch (this.state) {
      case "submit": {
        const c2 = s ? `${t("gray", d2)}  ` : "", a = R(e.output, i(this.options[this.cursor], "selected"), c2);
        return `${o}${a}`;
      }
      case "cancel": {
        const c2 = s ? `${t("gray", d2)}  ` : "", a = R(e.output, i(this.options[this.cursor], "cancelled"), c2);
        return `${o}${a}${s ? `
${t("gray", d2)}` : ""}`;
      }
      default: {
        const c2 = s ? `${t("cyan", d2)}  ` : "", a = s ? t("cyan", E2) : "", l = o.split(`
`).length, $2 = s ? 2 : 1;
        return `${o}${c2}${Y2({ output: e.output, cursor: this.cursor, options: this.options, maxItems: e.maxItems, columnPadding: c2.length, rowPadding: l + $2, style: (y2, p2) => i(y2, y2.disabled ? "disabled" : p2 ? "active" : "inactive") }).join(`
${c2}`)}
${a}
`;
      }
    }
  } }).prompt();
};
var je = `${t("gray", d2)}  `;
var Ot = (e) => new at({ validate: e.validate, placeholder: e.placeholder, defaultValue: e.defaultValue, initialValue: e.initialValue, output: e.output, signal: e.signal, input: e.input, render() {
  const i = e?.withGuide ?? u.withGuide, s = `${`${i ? `${t("gray", d2)}
` : ""}${V2(this.state)}  `}${e.message}
`, r = e.placeholder ? t("inverse", e.placeholder[0]) + t("dim", e.placeholder.slice(1)) : t(["inverse", "hidden"], "_"), u2 = this.userInput ? this.userInputWithCursor : r, n = this.value ?? "";
  switch (this.state) {
    case "error": {
      const o = this.error ? `  ${t("yellow", this.error)}` : "", c2 = i ? `${t("yellow", d2)}  ` : "", a = i ? t("yellow", E2) : "";
      return `${s.trim()}
${c2}${u2}
${a}${o}
`;
    }
    case "submit": {
      const o = n ? `  ${t("dim", n)}` : "", c2 = i ? t("gray", d2) : "";
      return `${s}${c2}${o}`;
    }
    case "cancel": {
      const o = n ? `  ${t(["strikethrough", "dim"], n)}` : "", c2 = i ? t("gray", d2) : "";
      return `${s}${c2}${o}${n.trim() ? `
${c2}` : ""}`;
    }
    default: {
      const o = i ? `${t("cyan", d2)}  ` : "", c2 = i ? t("cyan", E2) : "";
      return `${s}${o}${u2}
${c2}
`;
    }
  }
} }).prompt();

// bin/hub-init.ts
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
var CONFIG_DIR = process.argv[2] || path.join(process.env.HOME || ".", ".oh-my-team");
var CONFIG_PATH = path.join(CONFIG_DIR, "hub-config.json");
async function fetchJson(url, options) {
  const response = await fetch(url, options);
  return response.json();
}
function writeConfig(config) {
  mkdirSync(CONFIG_DIR, { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}
async function setupTelegram() {
  wt([
    "1. Open Telegram → search for @BotFather",
    "2. Send /newbot → pick a name and username",
    "3. Copy the bot token",
    "",
    "Important: also disable Group Privacy:",
    "  /mybots → your bot → Bot Settings → Group Privacy → Turn OFF"
  ].join(`
`), "Create a Telegram Bot");
  const token = await Ot({
    message: "Bot token",
    placeholder: "123456789:ABCdef...",
    validate: (v) => {
      if (!v.trim())
        return "Token is required";
      if (!v.includes(":"))
        return "Doesn't look like a bot token (missing colon)";
    }
  });
  if (q(token))
    return false;
  const s1 = fe();
  s1.start("Verifying bot token...");
  const me2 = await fetchJson(`https://api.telegram.org/bot${token}/getMe`);
  if (!me2.ok) {
    s1.stop("Invalid token", 2);
    O2.error(`Telegram said: ${me2.description || "unknown error"}`);
    return false;
  }
  const botUsername = me2.result.username;
  s1.stop(`Connected to @${botUsername}`);
  wt([
    `1. Create a new Telegram group (e.g., "Oh My Team Hub")`,
    `2. Add @${botUsername} to the group`,
    "3. Make the bot admin (Group Settings → Administrators → Add)",
    "4. Enable Topics (Group Settings → Topics → ON)",
    "5. Send any message in the group"
  ].join(`
`), "Set up the Telegram group");
  await Ot({
    message: "Press Enter when done...",
    placeholder: "(the bot will detect your group automatically)",
    defaultValue: ""
  });
  const s2 = fe();
  s2.start("Looking for your group...");
  const updates = await fetchJson(`https://api.telegram.org/bot${token}/getUpdates`);
  let chatId = "";
  let groupName = "";
  if (updates.ok && updates.result) {
    for (const update of [...updates.result].reverse()) {
      const chat = update.message?.chat;
      if (chat && (chat.type === "group" || chat.type === "supergroup")) {
        chatId = String(chat.id);
        groupName = chat.title || "Group";
        break;
      }
    }
  }
  if (!chatId) {
    s2.stop("Couldn't auto-detect", 2);
    const manual = await Ot({
      message: "Paste the Chat ID manually (starts with -100)",
      placeholder: "-100xxxxxxxxxx",
      validate: (v) => {
        if (!v.trim())
          return "Chat ID is required";
        if (!v.startsWith("-"))
          return "Group chat IDs start with a minus sign";
      }
    });
    if (q(manual))
      return false;
    chatId = manual;
  } else {
    s2.stop(`Found: "${groupName}" (${chatId})`);
  }
  const s3 = fe();
  s3.start("Verifying group access...");
  const chatInfo = await fetchJson(`https://api.telegram.org/bot${token}/getChat?chat_id=${chatId}`);
  if (!chatInfo.ok) {
    s3.stop("Cannot access group", 2);
    O2.error("Make sure the bot is added to the group and is admin.");
    return false;
  }
  groupName = chatInfo.result.title || groupName || "Group";
  s3.stop(`Connected to "${groupName}"`);
  writeConfig({
    platform: "telegram",
    credentials: { botToken: token, chatId }
  });
  wt([
    `Platform:  Telegram`,
    `Bot:       @${botUsername}`,
    `Group:     ${groupName} (${chatId})`,
    "",
    `Next: omt hub start`
  ].join(`
`), "Hub configured!");
  return true;
}
async function setupSlack() {
  const manifest = {
    display_information: {
      name: "Oh My Team",
      description: "Multi-agent orchestration hub for Claude Code"
    },
    features: {
      bot_user: { display_name: "Oh My Team", always_online: true }
    },
    oauth_config: {
      scopes: {
        bot: [
          "chat:write",
          "channels:history",
          "channels:read",
          "groups:history",
          "groups:read",
          "pins:write",
          "users:read"
        ]
      }
    },
    settings: {
      event_subscriptions: { bot_events: ["message.channels", "message.groups"] },
      socket_mode_enabled: true,
      org_deploy_enabled: false,
      token_rotation_enabled: false
    }
  };
  const manifestUrl = "https://api.slack.com/apps?new_app=1&manifest_json=" + encodeURIComponent(JSON.stringify(manifest));
  wt([
    "One-click setup — open this URL to create the app:",
    "",
    manifestUrl,
    "",
    "After creating the app:",
    "  a) Generate an App-Level Token:",
    "     Basic Information → App-Level Tokens → Generate",
    '     Name: "omt", Scope: connections:write',
    "  b) Install the app to your workspace:",
    "     OAuth & Permissions → Install to Workspace"
  ].join(`
`), "Create a Slack App");
  const appToken = await Ot({
    message: "App-Level Token",
    placeholder: "xapp-...",
    validate: (v) => {
      if (!v.trim())
        return "App Token is required";
      if (!v.startsWith("xapp-"))
        return "Must start with xapp-";
    }
  });
  if (q(appToken))
    return false;
  const s1 = fe();
  s1.start("Verifying App Token...");
  const appCheck = await fetchJson("https://slack.com/api/apps.connections.open", {
    method: "POST",
    headers: { Authorization: `Bearer ${appToken}` }
  });
  if (!appCheck.ok) {
    s1.stop("Invalid App Token", 2);
    O2.error(`${appCheck.error || "unknown error"}. Make sure Socket Mode is enabled and the token has connections:write scope.`);
    return false;
  }
  s1.stop("App Token valid");
  const botToken = await Ot({
    message: "Bot User OAuth Token",
    placeholder: "xoxb-...",
    validate: (v) => {
      if (!v.trim())
        return "Bot Token is required";
      if (!v.startsWith("xoxb-"))
        return "Must start with xoxb-";
    }
  });
  if (q(botToken))
    return false;
  const s2 = fe();
  s2.start("Verifying Bot Token...");
  const auth = await fetchJson("https://slack.com/api/auth.test", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${botToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  if (!auth.ok) {
    s2.stop("Invalid Bot Token", 2);
    O2.error(auth.error || "unknown error");
    return false;
  }
  const botName = auth.user || "bot";
  s2.stop(`Connected as @${botName}`);
  wt([
    `1. Create a channel (e.g., #omt) or use an existing one`,
    `2. Invite the bot: /invite @${botName}`,
    "3. Get the Channel ID:",
    "   Click channel name → scroll to bottom of About panel"
  ].join(`
`), "Channel setup");
  const channelId = await Ot({
    message: "Channel ID",
    placeholder: "C0123ABC456",
    validate: (v) => {
      if (!v.trim())
        return "Channel ID is required";
      if (!v.startsWith("C"))
        return "Channel IDs start with C";
    }
  });
  if (q(channelId))
    return false;
  const s3 = fe();
  s3.start("Verifying channel access...");
  const chanInfo = await fetchJson(`https://slack.com/api/conversations.info?channel=${channelId}`, {
    headers: { Authorization: `Bearer ${botToken}` }
  });
  if (!chanInfo.ok) {
    s3.stop("Cannot access channel", 2);
    O2.error(`${chanInfo.error}. Make sure the bot is invited (/invite @${botName}).`);
    return false;
  }
  const channelName = chanInfo.channel?.name || "channel";
  s3.stop(`Connected to #${channelName}`);
  writeConfig({
    platform: "slack",
    credentials: { botToken, appToken, channelId }
  });
  wt([
    `Platform:  Slack`,
    `Bot:       @${botName}`,
    `Channel:   #${channelName} (${channelId})`,
    "",
    `Next: omt hub start`
  ].join(`
`), "Hub configured!");
  return true;
}
async function main() {
  mt("Oh My Team Hub Setup");
  const platform = await _t({
    message: "Which platform?",
    options: [
      {
        value: "telegram",
        label: "Telegram",
        hint: "Forum topics for per-project threads"
      },
      {
        value: "slack",
        label: "Slack",
        hint: "Threads in a channel via Socket Mode"
      },
      {
        value: "discord",
        label: "Discord",
        hint: "coming soon"
      }
    ]
  });
  if (q(platform)) {
    pt("Setup cancelled.");
    process.exit(0);
  }
  if (platform === "discord") {
    O2.warn("Discord adapter is not yet implemented. Stay tuned!");
    process.exit(0);
  }
  let success = false;
  if (platform === "telegram") {
    success = await setupTelegram();
  } else if (platform === "slack") {
    success = await setupSlack();
  }
  if (success) {
    gt("Run: omt hub start");
  } else {
    gt("Setup incomplete. Run omt hub init to try again.");
    process.exit(1);
  }
}
main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
