"use client";

import type { MotionValue } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";

const SCROLL_THRESHOLD = 200;
const ANIMATION_DURATION = 80;
const ANIMATION_OVERLAP = 65;
const STAGGER = ANIMATION_DURATION - ANIMATION_OVERLAP;

type LetterAnimations = {
  translateY: MotionValue<number>;
  rotateX: MotionValue<number>;
  opacity: MotionValue<number>;
};

type LetterData = {
  id: string;
  name: string;
  path: string;
};

const LETTERS: LetterData[] = [
  {
    id: "l",
    name: "l",
    path: "M71.0109 33.1998H68.8109C68.4509 33.1998 68.2109 32.9598 68.2109 32.5998V4.3998C68.2109 4.0398 68.4509 3.7998 68.8109 3.7998H71.0109C71.3709 3.7998 71.6109 4.0398 71.6109 4.3998V32.5998C71.6109 32.9598 71.3709 33.1998 71.0109 33.1998Z",
  },
  {
    id: "a",
    name: "a",
    path: "M66.7725 33.1996H64.6125C64.2125 33.1996 64.0125 32.9996 64.0125 32.5996V10.6796C64.0125 10.3196 64.2125 10.0796 64.6125 10.0796H64.6525C66.2525 10.0796 67.4125 10.9996 67.4125 13.1596V32.5996C67.4125 32.9596 67.1725 33.1996 66.7725 33.1996ZM62.6125 17.7196H60.4125C60.0525 17.7196 59.8125 17.4796 59.8125 17.1196V13.1596C59.8125 10.9996 60.9725 10.0796 62.5725 10.0796H62.6125C62.9725 10.0796 63.2125 10.3196 63.2125 10.6796V17.1196C63.2125 17.5196 62.9725 17.7196 62.6125 17.7196ZM62.6125 33.1996H62.5725C60.9725 33.1996 59.8125 32.2796 59.8125 30.1196V21.5996C59.8125 19.4396 60.9725 18.5196 62.5725 18.5196H62.6125C62.9725 18.5196 63.2125 18.7196 63.2125 19.1196V32.5996C63.2125 32.9996 62.9725 33.1996 62.6125 33.1996Z",
  },
  {
    id: "i",
    name: "i",
    path: "M58.3937 9.3599H56.1937C55.8337 9.3599 55.5938 9.1199 55.5938 8.7199V6.9999C55.5938 6.6399 55.8337 6.3999 56.1937 6.3999H58.3937C58.7537 6.3999 58.9937 6.6399 58.9937 6.9999V8.7199C58.9937 9.1199 58.7537 9.3599 58.3937 9.3599ZM58.3937 33.1999H56.1937C55.8337 33.1999 55.5938 32.9599 55.5938 32.5999V10.6799C55.5938 10.3199 55.8337 10.0799 56.1937 10.0799H58.3937C58.7537 10.0799 58.9937 10.3199 58.9937 10.6799V32.5999C58.9937 32.9599 58.7537 33.1999 58.3937 33.1999Z",
  },
  {
    id: "c",
    name: "c",
    path: "M49.9953 33.1996H49.9553C48.3553 33.1996 47.1953 32.2396 47.1953 30.0396V13.2396C47.1953 11.0396 48.3553 10.0796 49.9553 10.0796H49.9953C50.3553 10.0796 50.5953 10.3196 50.5953 10.6796V32.5996C50.5953 32.9596 50.3553 33.1996 49.9953 33.1996ZM54.1553 20.9196H51.9953C51.5953 20.9196 51.3953 20.6796 51.3953 20.3196V10.6796C51.3953 10.3196 51.5953 10.0796 51.9953 10.0796H52.0353C53.6353 10.0796 54.7953 11.0396 54.7953 13.2396V20.3196C54.7953 20.6796 54.5553 20.9196 54.1553 20.9196ZM52.0353 33.1996H51.9953C51.5953 33.1996 51.3953 32.9596 51.3953 32.5996V22.2396C51.3953 21.8796 51.5953 21.6396 51.9953 21.6396H54.1553C54.5553 21.6396 54.7953 21.8796 54.7953 22.2396V30.0396C54.7953 32.2396 53.6353 33.1996 52.0353 33.1996Z",
  },
  {
    id: "u",
    name: "u",
    path: "M45.7569 33.1996H43.5969C43.1969 33.1996 42.9969 32.9596 42.9969 32.5996V10.6796C42.9969 10.3196 43.1969 10.0796 43.5969 10.0796H45.7569C46.1569 10.0796 46.3969 10.2796 46.3969 10.6796V32.5996C46.3969 32.9996 46.1569 33.1996 45.7569 33.1996ZM41.5969 33.1996H41.5569C39.9569 33.1996 38.7969 32.2396 38.7969 30.0396V10.6796C38.7969 10.3196 39.0369 10.0796 39.3969 10.0796H41.5969C41.9569 10.0796 42.1969 10.2796 42.1969 10.6796V32.5996C42.1969 32.9596 41.9569 33.1996 41.5969 33.1996Z",
  },
  {
    id: "r",
    name: "r",
    path: "M37.3584 17.7596H35.1984C34.7984 17.7596 34.5984 17.5596 34.5984 17.1596V10.6796C34.5984 10.3196 34.7984 10.0796 35.1984 10.0796H35.2384C36.8384 10.0796 37.9984 10.9996 37.9984 13.1596V17.1596C37.9984 17.5596 37.7584 17.7596 37.3584 17.7596ZM33.1984 33.1996H30.9984C30.6384 33.1996 30.3984 32.9996 30.3984 32.5996V10.6796C30.3984 10.2796 30.6384 10.0796 30.9984 10.0796H33.1984C33.5584 10.0796 33.7984 10.3196 33.7984 10.6796V32.5996C33.7984 32.9596 33.5584 33.1996 33.1984 33.1996Z",
  },
  {
    id: "d",
    name: "d",
    path: "M28.96 33.1998H26.8C26.4 33.1998 26.2 32.9598 26.2 32.5998V4.3998C26.2 4.0398 26.4 3.7998 26.8 3.7998H28.96C29.36 3.7998 29.6 3.9998 29.6 4.3998V32.5998C29.6 32.9998 29.36 33.1998 28.96 33.1998ZM24.8 33.1998H24.76C23.16 33.1998 22 32.2398 22 30.0398V13.2398C22 11.0398 23.16 10.0798 24.76 10.0798H24.8C25.16 10.0798 25.4 10.3198 25.4 10.6798V32.5998C25.4 32.9598 25.16 33.1998 24.8 33.1998Z",
  },
];

// Create letter animations for a given index (0 = rightmost "l", 6 = leftmost "d")
function useLetterAnimation(
  scrollY: MotionValue<number>,
  index: number
): LetterAnimations {
  const start = index * STAGGER;
  const end = start + ANIMATION_DURATION;

  return {
    translateY: useTransform(scrollY, [start, end], [0, -20]),
    rotateX: useTransform(scrollY, [start, end], [0, 90]),
    opacity: useTransform(scrollY, [start, end], [1, 0]),
  };
}

type AnimatedLetterProps = {
  letter: LetterData;
  animations: LetterAnimations;
  wordmarkX: MotionValue<number>;
};

function AnimatedLetter({
  letter,
  animations,
  wordmarkX,
}: AnimatedLetterProps) {
  return (
    <motion.g
      style={{
        translateX: wordmarkX,
        translateY: animations.translateY,
        rotateX: animations.rotateX,
        opacity: animations.opacity,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      <path className="fill-foreground" d={letter.path} />
    </motion.g>
  );
}

export function Logo() {
  const { scrollY } = useScroll();

  // Scale logo height from 96px (h-24) down to 48px (h-12)
  const logoHeight = useTransform(scrollY, [0, SCROLL_THRESHOLD], [96, 48]);

  // Morph the background rectangle from chip (narrow) to mark (square)
  const markRectWidth = useTransform(scrollY, [0, SCROLL_THRESHOLD], [18, 34]);
  const markRectHeight = useTransform(scrollY, [0, SCROLL_THRESHOLD], [33, 34]);

  // Shift the @ character to stay centered as the mark morphs
  const atCharX = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 8]);
  const atCharY = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, -1.5]);

  // Shift the wordmark letters to maintain gap as mark expands
  const wordmarkX = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 16]);

  // Create animations for each letter (right to left: l, a, i, c, u, r, d)
  const letterAnimations = [
    useLetterAnimation(scrollY, 0), // l
    useLetterAnimation(scrollY, 1), // a
    useLetterAnimation(scrollY, 2), // i
    useLetterAnimation(scrollY, 3), // c
    useLetterAnimation(scrollY, 4), // u
    useLetterAnimation(scrollY, 5), // r
    useLetterAnimation(scrollY, 6), // d
  ];

  return (
    <motion.svg
      className="overflow-visible"
      fill="none"
      style={{ height: logoHeight, perspective: "800px" }}
      viewBox="0 0 72 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mark portion - morphs from chip to mark as letters disappear */}
      <g filter="url(#filter0_dd_6709_24422)">
        <motion.rect
          className="fill-foreground"
          height={markRectHeight}
          rx="1"
          style={{ width: markRectWidth, height: markRectHeight }}
          width={markRectWidth}
          x="3"
          y="2"
        />
        <motion.g style={{ translateX: atCharX, translateY: atCharY }}>
          <path
            className="fill-muted"
            d="M17.1601 32.9428H10.9601C8.2801 32.9428 6.6001 31.1428 6.6001 28.2628V13.5828C6.6001 10.7028 8.2801 8.90283 10.9601 8.90283H13.0401C15.7201 8.90283 17.4001 10.7028 17.4001 13.5828V30.7428C17.4001 31.1028 17.1601 31.3428 16.7601 31.3428H13.0001C12.6001 31.3428 12.4001 31.1028 12.4001 30.7428V11.1028C12.4001 10.7028 12.6001 10.5028 13.0001 10.5028H13.0401C14.6401 10.5028 15.8001 11.3828 15.8001 13.5828V30.2628C15.8001 30.4228 15.8801 30.5428 16.0401 30.5428H16.3201C16.4801 30.5428 16.6001 30.4628 16.6001 30.2628V13.5828C16.6001 11.1428 15.2801 9.70283 13.0401 9.70283H10.9601C8.7201 9.70283 7.4001 11.1428 7.4001 13.5828V28.2628C7.4001 30.7028 8.7201 32.1428 10.9601 32.1428H17.1601C17.3201 32.1428 17.4001 32.2228 17.4001 32.3828V32.7028C17.4001 32.8628 17.3201 32.9428 17.1601 32.9428ZM11.0001 18.1428H8.8001C8.4401 18.1428 8.2001 17.9028 8.2001 17.5428V13.5828C8.2001 11.3828 9.3601 10.5028 10.9601 10.5028H11.0001C11.3601 10.5028 11.6001 10.7028 11.6001 11.1028V17.5428C11.6001 17.9428 11.3601 18.1428 11.0001 18.1428ZM11.0001 31.3428H10.9601C9.3601 31.3428 8.2001 30.4228 8.2001 28.2628V22.0228C8.2001 19.8228 9.3601 18.9428 10.9601 18.9428H11.0001C11.3601 18.9428 11.6001 19.1428 11.6001 19.5428V30.7428C11.6001 31.1428 11.3601 31.3428 11.0001 31.3428Z"
          />
        </motion.g>
      </g>

      {/* Wordmark letters - each animates sequentially from right to left */}
      {LETTERS.map((letter, index) => (
        <AnimatedLetter
          key={letter.id}
          animations={letterAnimations[index]}
          letter={letter}
          wordmarkX={wordmarkX}
        />
      ))}

      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          id="filter0_dd_6709_24422"
          x="0"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            in="SourceAlpha"
            operator="erode"
            radius="1"
            result="effect1_dropShadow_6709_24422"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_6709_24422"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            in2="effect1_dropShadow_6709_24422"
            mode="normal"
            result="effect2_dropShadow_6709_24422"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_6709_24422"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </motion.svg>
  );
}
