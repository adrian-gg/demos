const LETTER_GRID = {
  en: [
    [
      { letter: "i", inUse: false, type: "desc" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "l", inUse: false, type: "none" },
      { letter: "i", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "a", inUse: false, type: "none" },
      { letter: "s", inUse: false, type: "none" },
      { letter: "a", inUse: false, type: "desc" },
      { letter: "m", inUse: false, type: "desc" },
      { letter: "p", inUse: false, type: "desc" },
      { letter: "m", inUse: false, type: "desc" },
    ],
    [
      { letter: "a", inUse: false, type: "none" },
      { letter: "c", inUse: false, type: "none" },
      { letter: "q", inUse: false, type: "minutes" },
      { letter: "u", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "d", inUse: false, type: "none" },
      { letter: "c", inUse: false, type: "none" },
    ],
    [
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "w", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "y", inUse: false, type: "minutes" },
      { letter: "f", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "v", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "x", inUse: false, type: "none" },
    ],
    [
      { letter: "h", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "l", inUse: false, type: "minutes" },
      { letter: "f", inUse: false, type: "minutes" },
      { letter: "s", inUse: false, type: "none" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "f", inUse: false, type: "none" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
    ],
    [
      { letter: "p", inUse: false, type: "desc" },
      { letter: "a", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "none" },
      { letter: "r", inUse: false, type: "none" },
      { letter: "u", inUse: false, type: "none" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "o", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "x", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "h", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "f", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "f", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "w", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
    ],
    [
      { letter: "e", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "g", inUse: false, type: "hours" },
      { letter: "h", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "l", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
    ],
    [
      { letter: "s", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "w", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "l", inUse: false, type: "hours" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "t", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "none" },
      { letter: "e", inUse: false, type: "none" },
      {
        letter: "o",
        inUse: false,
        type: "desc",
        specialCharacter: `\u00A0\u00A0'`,
      },
      { letter: "c", inUse: false, type: "desc" },
      { letter: "l", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "c", inUse: false, type: "desc" },
      { letter: "k", inUse: false, type: "desc" },
    ],
  ],
  de: [
    [
      { letter: "e", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "k", inUse: false, type: "none" },
      { letter: "i", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "a", inUse: false, type: "none" },
      { letter: "f", inUse: false, type: "minutes" },
      { letter: "ü", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "f", inUse: false, type: "minutes" },
    ],
    [
      { letter: "z", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "h", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "z", inUse: false, type: "minutes" },
      { letter: "w", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "z", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "g", inUse: false, type: "minutes" },
    ],
    [
      { letter: "d", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "v", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "l", inUse: false, type: "minutes" },
    ],
    [
      { letter: "v", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "r", inUse: false, type: "desc" },
      { letter: "F", inUse: false, type: "none" },
      { letter: "U", inUse: false, type: "none" },
      { letter: "n", inUse: false, type: "none" },
      { letter: "k", inUse: false, type: "none" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "a", inUse: false, type: "desc" },
      { letter: "c", inUse: false, type: "desc" },
      { letter: "h", inUse: false, type: "desc" },
    ],
    [
      { letter: "h", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "l", inUse: false, type: "minutes" },
      { letter: "b", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "none" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "l", inUse: false, type: "hours" },
      { letter: "f", inUse: false, type: "hours" },
      { letter: "ü", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "f", inUse: false, type: "hours" },
    ],
    [
      { letter: "e", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "x", inUse: false, type: "none" },
      { letter: "a", inUse: false, type: "desc" },
      { letter: "m", inUse: false, type: "desc" },
      { letter: "z", inUse: false, type: "hours" },
      { letter: "w", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
    ],
    [
      { letter: "d", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "p", inUse: false, type: "desc" },
      { letter: "m", inUse: false, type: "desc" },
      { letter: "j", inUse: false, type: "none" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
    ],
    [
      { letter: "s", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "h", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "none" },
      { letter: "l", inUse: false, type: "none" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "h", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
    ],
    [
      { letter: "s", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "b", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "z", inUse: false, type: "hours" },
      { letter: "w", inUse: false, type: "hours" },
      { letter: "ö", inUse: false, type: "hours" },
      { letter: "l", inUse: false, type: "hours" },
      { letter: "f", inUse: false, type: "hours" },
    ],
    [
      { letter: "z", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "h", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "k", inUse: false, type: "none" },
      { letter: "u", inUse: false, type: "desc" },
      { letter: "h", inUse: false, type: "desc" },
      { letter: "r", inUse: false, type: "desc" },
    ],
  ],
  fr: [
    [
      { letter: "i", inUse: false, type: "desc" },
      { letter: "l", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "none" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "none" },
      { letter: "d", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "x", inUse: false, type: "hours" },
    ],
    [
      { letter: "q", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
    ],
    [
      { letter: "n", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "f", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "p", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
    ],
    [
      { letter: "h", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "x", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "q", inUse: false, type: "hours" },
    ],
    [
      { letter: "m", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "d", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "x", inUse: false, type: "hours" },
      { letter: "m", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
    ],
    [
      { letter: "o", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "z", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "none" },
      { letter: "h", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "u", inUse: false, type: "desc" },
      { letter: "r", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
    ],
    [
      { letter: "m", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "i", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "none" },
      { letter: "l", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "d", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "x", inUse: false, type: "minutes" },
    ],
    [
      { letter: "e", inUse: false, type: "desc" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "r", inUse: false, type: "none" },
      { letter: "q", inUse: false, type: "minutes" },
      { letter: "u", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "p", inUse: false, type: "none" },
      { letter: "m", inUse: false, type: "none" },
      { letter: "d", inUse: false, type: "none" },
    ],
    [
      { letter: "v", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "g", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "-", inUse: false, type: "minutes" },
      { letter: "c", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "q", inUse: false, type: "minutes" },
      { letter: "u", inUse: false, type: "hours" },
    ],
    [
      { letter: "e", inUse: false, type: "desc" },
      { letter: "t", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "none" },
      { letter: "d", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "m", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "p", inUse: false, type: "none" },
      { letter: "a", inUse: false, type: "none" },
      { letter: "m", inUse: false, type: "none" },
    ],
  ],
  it: [
    [
      { letter: "s", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "r", inUse: false, type: "none" },
      { letter: "l", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "b", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "e", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "l", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "d", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "z", inUse: false, type: "hours" },
    ],
    [
      { letter: "t", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "d", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "d", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
    ],
    [
      { letter: "d", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "d", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "q", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "none" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
    ],
    [
      { letter: "c", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "q", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "desc" },
      { letter: "m", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
    ],
    [
      { letter: "e", inUse: false, type: "desc" },
      { letter: "c", inUse: false, type: "none" },
      { letter: "u", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "none" },
      { letter: "q", inUse: false, type: "minutes" },
      { letter: "u", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "o", inUse: false, type: "minutes" },
    ],
    [
      { letter: "v", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "c", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "q", inUse: false, type: "minutes" },
      { letter: "u", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
    ],
    [
      { letter: "d", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "c", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "p", inUse: false, type: "minutes" },
      { letter: "m", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "z", inUse: false, type: "minutes" },
      { letter: "z", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
    ],
  ],
  es: [
    [
      { letter: "e", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "none" },
      { letter: "l", inUse: false, type: "desc" },
      { letter: "a", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
    ],
    [
      { letter: "d", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "m", inUse: false, type: "hours" },
    ],
    [
      { letter: "c", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "r", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
    ],
    [
      { letter: "s", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "t", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
    ],
    [
      { letter: "o", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "h", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "u", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "v", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "p", inUse: false, type: "hours" },
      { letter: "m", inUse: false, type: "hours" },
    ],
    [
      { letter: "l", inUse: false, type: "hours" },
      { letter: "a", inUse: false, type: "hours" },
      { letter: "d", inUse: false, type: "hours" },
      { letter: "i", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "z", inUse: false, type: "hours" },
      { letter: "s", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "n", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
    ],
    [
      { letter: "d", inUse: false, type: "hours" },
      { letter: "o", inUse: false, type: "hours" },
      { letter: "c", inUse: false, type: "hours" },
      { letter: "e", inUse: false, type: "hours" },
      { letter: "l", inUse: false, type: "hours" },
      { letter: "y", inUse: false, type: "desc" },
      { letter: "m", inUse: false, type: "desc" },
      { letter: "e", inUse: false, type: "desc" },
      { letter: "n", inUse: false, type: "desc" },
      { letter: "o", inUse: false, type: "desc" },
      { letter: "s", inUse: false, type: "desc" },
    ],
    [
      { letter: "o", inUse: false, type: "desc" },
      { letter: "v", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "d", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "z", inUse: false, type: "minutes" },
    ],
    [
      { letter: "v", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "c", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "n", inUse: false, type: "minutes" },
      { letter: "c", inUse: false, type: "minutes" },
      { letter: "o", inUse: false, type: "minutes" },
    ],
    [
      { letter: "m", inUse: false, type: "minutes" },
      { letter: "e", inUse: false, type: "minutes" },
      { letter: "d", inUse: false, type: "minutes" },
      { letter: "i", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "c", inUse: false, type: "minutes" },
      { letter: "u", inUse: false, type: "minutes" },
      { letter: "a", inUse: false, type: "minutes" },
      { letter: "r", inUse: false, type: "minutes" },
      { letter: "t", inUse: false, type: "minutes" },
      { letter: "o", inUse: false, type: "minutes" },
    ],
  ],
}
const WORDS_HOURS = {
  en: [
    { word: "one", type: "hours" },
    { word: "two", type: "hours" },
    { word: "three", type: "hours" },
    { word: "four", type: "hours" },
    { word: "five", type: "hours" },
    { word: "six", type: "hours" },
    { word: "seven", type: "hours" },
    { word: "eight", type: "hours" },
    { word: "nine", type: "hours" },
    { word: "ten", type: "hours" },
    { word: "eleven", type: "hours" },
    { word: "twelve", type: "hours" },
  ],
  de: [
    { word: "eins", type: "hours" },
    { word: "zwei", type: "hours" },
    { word: "drei", type: "hours" },
    { word: "vier", type: "hours" },
    { word: "fünf", type: "hours" },
    { word: "sechs", type: "hours" },
    { word: "sieben", type: "hours" },
    { word: "acht", type: "hours" },
    { word: "neun", type: "hours" },
    { word: "zehn", type: "hours" },
    { word: "elf", type: "hours" },
    { word: "zwölf", type: "hours" },
  ],
  fr: [
    { word: "une", type: "hours" }, // ein
    { word: "deux", type: "hours" }, // zwei
    { word: "trois", type: "hours" }, // drei
    { word: "quatre", type: "hours" }, // vier
    { word: "cinq", type: "hours" }, // fünf
    { word: "six", type: "hours" }, // sechs
    { word: "sept", type: "hours" }, // sieben
    { word: "huit", type: "hours" }, // acht
    { word: "neuf", type: "hours" }, // neun
    { word: "dix", type: "hours" }, // zehn
    { word: "onze", type: "hours" }, // elf
    { word: "midi", type: "hours" }, // zwölf
  ],
  it: [
    { word: "una", type: "hours" }, // eins
    { word: "due", type: "hours" }, // zwei
    { word: "tre", type: "hours" }, // drei
    { word: "quattro", type: "hours" }, // vier
    { word: "cinque", type: "hours" }, // fünf
    { word: "sei", type: "hours" }, // sechs
    { word: "sette", type: "hours" }, // sieben
    { word: "otto", type: "hours" }, // acht
    { word: "nove", type: "hours" }, // neun
    { word: "dieci", type: "hours" }, // zehn
    { word: "undici", type: "hours" }, // elf
    { word: "dodici", type: "hours" }, // zwölf
  ],
  es: [
    { word: "una", type: "hours" }, // eins
    { word: "dos", type: "hours" }, // zwei
    { word: "tres", type: "hours" }, // drei
    { word: "cuatro", type: "hours" }, // vier
    { word: "cinco", type: "hours" }, // fünf
    { word: "seis", type: "hours" }, // sechs
    { word: "siete", type: "hours" }, // sieben
    { word: "ocho", type: "hours" }, // acht
    { word: "nueve", type: "hours" }, // neun
    { word: "diez", type: "hours" }, // zehn
    { word: "once", type: "hours" }, // elf
    { word: "doce", type: "hours" }, // zwölf
  ],
}
const WORDS_MINUTES = {
  en: [
    { word: "five", type: "minutes" },
    { word: "ten", type: "minutes" },
    { word: "quarter", type: "minutes" },
    { word: "twenty", type: "minutes" },
    { word: "twentyfive", type: "minutes" },
    { word: "half", type: "minutes" },
  ],
  de: [
    { word: "fünf", type: "minutes" },
    { word: "zehn", type: "minutes" },
    { word: "viertel", type: "minutes" },
    { word: "zwanzig", type: "minutes" },
    { word: "halb", type: "minutes" },
  ],
  fr: [
    { word: "cinq", type: "minutes" }, // fünf
    { word: "dix", type: "minutes" }, // zehn
    { word: "quart", type: "minutes" }, // viertel
    { word: "vingt", type: "minutes" }, // zwanzig
    { word: "vingt-cinq", type: "minutes" }, //fünfundzwanzig
    { word: "demie", type: "minutes" }, // halb
  ],
  it: [
    { word: "cinque", type: "minutes" }, // fünf
    { word: "dieci", type: "minutes" }, // zehn
    { word: "quarto", type: "minutes" }, // viertel
    { word: "venti", type: "minutes" }, // zwanzig
    { word: "venticinque", type: "minutes" }, // fünfundzwanzig
    { word: "mezza", type: "minutes" }, // halb
  ],
  es: [
    { word: "cinco", type: "minutes" }, // fünf
    { word: "diez", type: "minutes" }, // zehn
    { word: "cuarto", type: "minutes" }, // viertel
    { word: "veinte", type: "minutes" }, // zwanzig
    { word: "veinticinco", type: "minutes" }, // fünfundzwanzig
    { word: "media", type: "minutes" }, // halb
  ],
}
const WORDS_STATIC = {
  en: [
    { word: "it", type: "desc" },
    { word: "is", type: "desc" },
    { word: "oclock", type: "desc" },
    { word: "past", type: "desc" },
    { word: "to", type: "desc" },
    { word: "am", type: "desc" },
    { word: "pm", type: "desc" },
  ],
  de: [
    { word: "es", type: "desc" },
    { word: "ist", type: "desc" },
    { word: "uhr", type: "desc" },
    { word: "nach", type: "desc" },
    { word: "vor", type: "desc" },
    { word: "am", type: "desc" },
    { word: "pm", type: "desc" },
  ],
  fr: [
    { word: "il", type: "desc" }, // es
    { word: "est", type: "desc" }, // ist
    { word: "heures", type: "desc" }, // uhr
    { word: "et", type: "desc" }, // nach
    { word: "moins", type: "desc" }, // vor
    { word: "le", type: "desc" }, //
  ],
  it: [
    { word: "sono", type: "desc" }, // es
    { word: "le", type: "desc" }, // ist
    { word: "ore", type: "desc" }, // uhr
    { word: "e", type: "desc" }, // nach
    { word: "meno", type: "desc" }, // vor
    { word: "l", type: "desc" }, //
    { word: "un", type: "desc" }, //
  ],
  es: [
    { word: "son", type: "desc" }, // es sind
    { word: "las", type: "desc" }, // die (Stunden)
    { word: "hora", type: "desc" }, // Uhr
    { word: "y", type: "desc" }, // nach
    { word: "menos", type: "desc" }, // vor
    { word: "es", type: "desc" }, // ist
    { word: "la", type: "desc" }, // die (Singular, Stunde)
  ],
}
const LANGUAGES_MAP = {
  en: "en",
  de: "de",
  fr: "fr",
  it: "it",
  es: "es",
}
const LANGUAGE_DEFAULT = "en"

let timeinwordsLanguage = null
let timeinwordsLetterGrid = null
let timeinwordsElement = null
let timeinwordsInterval = null

const getCurrentTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  return {
    hours,
    minutes,
    seconds,
  }
}

function buildSeconds() {
  const secondsWrapperElement = document.createElement("div")
  secondsWrapperElement.classList.add("timeinwords-seconds-wrapper")

  for (let i = 0; i < 60; i++) {
    const secondElement = document.createElement("div")
    secondElement.classList.add("timeinwords-second")
    secondElement.dataset.index = i
    secondsWrapperElement.appendChild(secondElement)
  }

  timeinwordsElement.appendChild(secondsWrapperElement)
}

function removeGrid() {
  const letterElements = document.querySelectorAll(".timeinwords-letter")
  letterElements.forEach((letterElement) => {
    timeinwordsElement.removeChild(letterElement)
  })
}

function buildGrid() {
  for (let y = 0; y < timeinwordsLetterGrid.length; y++) {
    const row = timeinwordsLetterGrid[y]

    for (let x = 0; x < row.length; x++) {
      const letterObject = row[x]
      const letterChar = letterObject.letter
      const letterType = letterObject.type
      const letterElement = document.createElement("div")

      letterElement.innerHTML = letterChar
      letterElement.classList.add("timeinwords-letter")
      letterElement.dataset.letter = letterChar
      letterElement.dataset.type = letterType
      letterElement.dataset.row = y
      letterElement.dataset.col = x

      if (letterObject.specialCharacter !== undefined) {
        console.log(letterObject.specialCharacter)
        letterElement.dataset.specialCharacter = letterObject.specialCharacter
        letterElement.classList.add("special-character")
      }

      timeinwordsElement.appendChild(letterElement)
    }
  }
}

function resetClock() {
  timeinwordsLetterGrid = LETTER_GRID[timeinwordsLanguage]
  removeGrid()
  buildGrid()
}

function setSeconds(time) {
  const secondElements = document.querySelectorAll(".timeinwords-second")
  secondElements.forEach((secondElement) => {
    secondElement.classList.remove("active")
  })

  for (let i = 0; i < time.seconds; i++) {
    const element = document.querySelector(
      `.timeinwords-second[data-index="${i}"]`
    )

    if (element !== null) {
      element.classList.add("active")
    }
  }
}

function getTimeInWords(timeinwordsLanguage, hours, minutes) {
  const wordsHours = WORDS_HOURS[timeinwordsLanguage]
  const wordsMinutes = WORDS_MINUTES[timeinwordsLanguage]
  const wordsStatic = WORDS_STATIC[timeinwordsLanguage]
  const points = minutes % 5
  const minutesRemainder = minutes % 5
  const m = minutes - minutesRemainder
  const h = hours > 0 ? hours : 12

  const addWord = (word, type, wordOutputArray, wordInputArray = null) => {
    if (wordInputArray === null) {
      timeWordsArray.push({ word, type })
      return
    }

    timeWordsArray.push(
      wordInputArray.find((obj) => obj.word === word && obj.type === type)
    )
  }

  const timeWordsArray = []

  if (timeinwordsLanguage === LANGUAGES_MAP.en) {
    addWord("it", "desc", timeWordsArray, wordsStatic)
    addWord("is", "desc", timeWordsArray, wordsStatic)

    if (m === 0) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("oclock", "desc", timeWordsArray, wordsStatic)
    } else if (m === 5) {
      addWord("five", "minutes", timeWordsArray, wordsMinutes)
      addWord("past", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 10) {
      addWord("ten", "minutes", timeWordsArray, wordsMinutes)
      addWord("past", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 15) {
      addWord("quarter", "minutes", timeWordsArray, wordsMinutes)
      addWord("past", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 20) {
      addWord("twenty", "minutes", timeWordsArray, wordsMinutes)
      addWord("past", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 25) {
      addWord("twentyfive", "minutes", timeWordsArray, wordsMinutes)
      addWord("past", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 30) {
      addWord("half", "minutes", timeWordsArray, wordsMinutes)
      addWord("past", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 35) {
      addWord("twentyfive", "minutes", timeWordsArray, wordsMinutes)
      addWord("to", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 40) {
      addWord("twenty", "minutes", timeWordsArray, wordsMinutes)
      addWord("to", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 45) {
      addWord("quarter", "minutes", timeWordsArray, wordsMinutes)
      addWord("to", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 50) {
      addWord("ten", "minutes", timeWordsArray, wordsMinutes)
      addWord("to", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 55) {
      addWord("five", "minutes", timeWordsArray, wordsMinutes)
      addWord("to", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    }
  } else if (timeinwordsLanguage === LANGUAGES_MAP.de) {
    addWord("es", "desc", timeWordsArray, wordsStatic)
    addWord("ist", "desc", timeWordsArray, wordsStatic)

    if (m === 0 && h % 12 === 1) {
      addWord("ein", "hours", timeWordsArray)
      addWord("uhr", "desc", timeWordsArray, wordsStatic)
    } else if (m === 0) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("uhr", "desc", timeWordsArray, wordsStatic)
    } else if (m === 5) {
      addWord("fünf", "minutes", timeWordsArray, wordsMinutes)
      addWord("nach", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 10) {
      addWord("zehn", "minutes", timeWordsArray, wordsMinutes)
      addWord("nach", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 15) {
      addWord("viertel", "minutes", timeWordsArray, wordsMinutes)
      addWord("nach", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 20) {
      addWord("zwanzig", "minutes", timeWordsArray, wordsMinutes)
      addWord("nach", "desc", timeWordsArray, wordsStatic)
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
    } else if (m === 25) {
      addWord("fünf", "minutes", timeWordsArray, wordsMinutes)
      addWord("vor", "desc", timeWordsArray, wordsStatic)
      addWord("halb", "minutes", timeWordsArray, wordsMinutes)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 30) {
      addWord("halb", "minutes", timeWordsArray, wordsMinutes)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 35) {
      addWord("fünf", "minutes", timeWordsArray, wordsMinutes)
      addWord("nach", "desc", timeWordsArray, wordsStatic)
      addWord("halb", "minutes", timeWordsArray, wordsMinutes)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 40) {
      addWord("zwanzig", "minutes", timeWordsArray, wordsMinutes)
      addWord("vor", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 45) {
      addWord("viertel", "minutes", timeWordsArray, wordsMinutes)
      addWord("vor", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 50) {
      addWord("zehn", "minutes", timeWordsArray, wordsMinutes)
      addWord("vor", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    } else if (m === 55) {
      addWord("fünf", "minutes", timeWordsArray, wordsMinutes)
      addWord("vor", "desc", timeWordsArray, wordsStatic)
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
    }
  } else if (timeinwordsLanguage === LANGUAGES_MAP.fr) {
    addWord("il", "desc", timeWordsArray, wordsStatic)
    addWord("est", "desc", timeWordsArray, wordsStatic)

    if (m === 0) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
    } else if (m === 5) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("cinq", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 10) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("dix", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 15) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("et", "desc", timeWordsArray, wordsStatic)
      addWord("quart", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 20) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("vingt", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 25) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("vingt-cinq", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 30) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("et", "desc", timeWordsArray, wordsStatic)
      addWord("demie", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 35) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("moins", "desc", timeWordsArray, wordsStatic)
      addWord("vingt-cinq", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 40) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("moins", "desc", timeWordsArray, wordsStatic)
      addWord("vingt", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 45) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("moins", "desc", timeWordsArray, wordsStatic)
      addWord("le", "desc", timeWordsArray, wordsStatic)
      addWord("quart", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 50) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("moins", "desc", timeWordsArray, wordsStatic)
      addWord("dix", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 55) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("heures", "desc", timeWordsArray, wordsStatic)
      addWord("moins", "desc", timeWordsArray, wordsStatic)
      addWord("cinq", "minutes", timeWordsArray, wordsMinutes)
    }
  } else if (timeinwordsLanguage === LANGUAGES_MAP.it) {
    addWord("sono", "desc", timeWordsArray, wordsStatic)
    addWord("le", "desc", timeWordsArray, wordsStatic)

    if (m === 0) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
    } else if (m === 5) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("e", "desc", timeWordsArray, wordsStatic)
      addWord("cinque", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 10) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("e", "desc", timeWordsArray, wordsStatic)
      addWord("dieci", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 15) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("e", "desc", timeWordsArray, wordsStatic)
      addWord("un", "desc", timeWordsArray, wordsStatic)
      addWord("quarto", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 20) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("e", "desc", timeWordsArray, wordsStatic)
      addWord("venti", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 25) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("e", "desc", timeWordsArray, wordsStatic)
      addWord("venticinque", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 30) {
      addWord(
        wordsHours[(h - 1) % 12].word,
        "hours",
        timeWordsArray,
        wordsHours
      )
      addWord("e", "desc", timeWordsArray, wordsStatic)
      addWord("mezza", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 35) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("meno", "desc", timeWordsArray, wordsStatic)
      addWord("venticinque", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 40) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("meno", "desc", timeWordsArray, wordsStatic)
      addWord("venti", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 45) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("meno", "desc", timeWordsArray, wordsStatic)
      addWord("un", "desc", timeWordsArray, wordsStatic)
      addWord("quarto", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 50) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("meno", "desc", timeWordsArray, wordsStatic)
      addWord("dieci", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 55) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("meno", "desc", timeWordsArray, wordsStatic)
      addWord("cinque", "minutes", timeWordsArray, wordsMinutes)
    }
  } else if (timeinwordsLanguage === LANGUAGES_MAP.es) {
    if (
      (m > 30 && h % 12 === 0 && hours === 12) ||
      (m < 35 && h % 12 === 1 && hours === 1)
    ) {
      addWord("es", "desc", timeWordsArray, wordsStatic)
      addWord("la", "desc", timeWordsArray, wordsStatic)
    } else {
      addWord("son", "desc", timeWordsArray, wordsStatic)
      addWord("las", "desc", timeWordsArray, wordsStatic)
    }

    if (m === 0) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
    } else if (m === 5) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("y", "desc", timeWordsArray, wordsStatic)
      addWord("cinco", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 10) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("y", "desc", timeWordsArray, wordsStatic)
      addWord("diez", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 15) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("y", "desc", timeWordsArray, wordsStatic)
      addWord("cuarto", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 20) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("y", "desc", timeWordsArray, wordsStatic)
      addWord("veinte", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 25) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("y", "desc", timeWordsArray, wordsStatic)
      addWord("veinticinco", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 30) {
      addWord(wordsHours[(h - 1) % 12].word, "hours", timeWordsArray)
      addWord("y", "desc", timeWordsArray, wordsStatic)
      addWord("media", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 35) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("menos", "desc", timeWordsArray, wordsStatic)
      addWord("veinticinco", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 40) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("menos", "desc", timeWordsArray, wordsStatic)
      addWord("veinte", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 45) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("menos", "desc", timeWordsArray, wordsStatic)
      addWord("cuarto", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 50) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("menos", "desc", timeWordsArray, wordsStatic)
      addWord("diez", "minutes", timeWordsArray, wordsMinutes)
    } else if (m === 55) {
      addWord(wordsHours[h % 12].word, "hours", timeWordsArray, wordsHours)
      addWord("menos", "desc", timeWordsArray, wordsStatic)
      addWord("cinco", "minutes", timeWordsArray, wordsMinutes)
    }
  }

  return { timeWordsArray, points }
}

function resetWordsInGrid() {
  for (let row = 0; row < timeinwordsLetterGrid.length; row++) {
    const rowData = timeinwordsLetterGrid[row]

    for (let col = 0; col < rowData.length; col++) {
      rowData[col].inUse = false
    }
  }
}

function findWordInGrid(word, type) {
  const wordLetters = word.split("")

  for (let row = 0; row < timeinwordsLetterGrid.length; row++) {
    const rowData = timeinwordsLetterGrid[row]

    for (let col = 0; col <= rowData.length - wordLetters.length; col++) {
      const subArray = rowData.slice(col, col + wordLetters.length)
      const matches = subArray.every(
        (cell, index) =>
          cell.letter === wordLetters[index] &&
          cell.type === type &&
          cell.inUse === false
      )

      if (matches) {
        subArray.forEach((cell) => (cell.inUse = true))
        return { start: [row, col], end: [row, col + wordLetters.length - 1] }
      }
    }
  }

  return null
}

function setGrid(timeObject) {
  const letterElements = document.querySelectorAll(".timeinwords-letter")

  letterElements.forEach((letterElement) => {
    letterElement.classList.remove("active")
  })

  resetWordsInGrid()

  timeObject.timeWordsArray.forEach((timeWordObject) => {
    const result = findWordInGrid(timeWordObject.word, timeWordObject.type)
    const [startRow, startCol] = result.start
    const [endRow, endCol] = result.end

    for (let col = startCol; col <= endCol; col++) {
      const element = document.querySelector(
        `.timeinwords-letter[data-row="${startRow}"][data-col="${col}"]`
      )

      if (element !== null) {
        element.classList.add("active")
      }
    }
  })
}

function updateClock(elapsed, init = false) {
  const time = getCurrentTime()
  setSeconds(time)

  if (elapsed % 60 === 0 || init === true) {
    const timeObject = getTimeInWords(
      timeinwordsLanguage,
      time.hours,
      time.minutes
    )
    setGrid(timeObject)
  }
}

function init() {
  const detectedLanguage = Object.keys(LANGUAGES_MAP).find((lang) =>
    navigator.language.includes(lang)
  )

  timeinwordsLanguage = detectedLanguage
    ? LANGUAGES_MAP[detectedLanguage]
    : LANGUAGE_DEFAULT

  timeinwordsElement = document.querySelector(".timeinwords")

  buildSeconds()
  resetClock()

  let secondsElapsed = getCurrentTime().seconds

  timeinwordsInterval = setInterval(() => {
    updateClock(secondsElapsed)
    secondsElapsed++
  }, 1000)

  updateClock(secondsElapsed, true)
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})
