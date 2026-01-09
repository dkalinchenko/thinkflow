import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="41" viewBox="0 0 40 41" className="fill-current">
        <path
          opacity="0.5"
          d="M37.7778 40.2223H24C22.8954 40.2223 22 39.3268 22 38.2223V20.0001C22 18.8955 22.8954 18.0001 24 18.0001H37.7778C38.8823 18.0001 39.7778 18.8955 39.7778 20.0001V38.2223C39.7778 39.3268 38.8823 40.2223 37.7778 40.2223Z"
        />
        <path d="M23.2222 0C22.6699 0 22.2222 0.447715 22.2222 1V12.3333C22.2222 12.8856 22.6699 13.3333 23.2222 13.3333H39C39.5523 13.3333 40 12.8856 40 12.3333V0.999999C40 0.447714 39.5523 0 39 0H23.2222ZM0 39C0 39.5523 0.447715 40 1 40H16.7778C17.3301 40 17.7778 39.5523 17.7778 39V27.6667C17.7778 27.1144 17.3301 26.6667 16.7778 26.6667H1C0.447716 26.6667 0 27.1144 0 27.6667V39ZM0 21.2222C0 21.7745 0.447715 22.2222 1 22.2222H16.7778C17.3301 22.2222 17.7778 21.7745 17.7778 21.2222V0.999999C17.7778 0.447714 17.3301 0 16.7778 0H1C0.447716 0 0 0.447715 0 1V21.2222Z" />
      </svg>
    ),
    title: "Compare Side-by-Side",
    paragraph:
      "Evaluate multiple products at once – electronics, appliances, fitness gear, and more. Line up all your options and see them in one clear view.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path opacity="0.5" d="M8 4H32C33.1 4 34 4.9 34 6V10C34 11.1 33.1 12 32 12H8C6.9 12 6 11.1 6 10V6C6 4.9 6.9 4 8 4Z" />
        <path d="M32 4H8C6.9 4 6 4.9 6 6V10C6 11.1 6.9 12 8 12H32C33.1 12 34 11.1 34 10V6C34 4.9 33.1 4 32 4ZM32 6V10H8V6H32Z" />
        <path opacity="0.5" d="M8 16H32C33.1 16 34 16.9 34 18V22C34 23.1 33.1 24 32 24H8C6.9 24 6 23.1 6 22V18C6 16.9 6.9 16 8 16Z" />
        <path d="M32 16H8C6.9 16 6 16.9 6 18V22C6 23.1 6.9 24 8 24H32C33.1 24 34 23.1 34 22V18C34 16.9 33.1 16 32 16ZM32 18V22H8V18H32Z" />
        <path opacity="0.5" d="M8 28H32C33.1 28 34 28.9 34 30V34C34 35.1 33.1 36 32 36H8C6.9 36 6 35.1 6 34V30C6 28.9 6.9 28 8 28Z" />
        <path d="M32 28H8C6.9 28 6 28.9 6 30V34C6 35.1 6.9 36 8 36H32C33.1 36 34 35.1 34 34V30C34 28.9 33.1 28 32 28ZM32 30V34H8V30H32Z" />
        <path d="M4 8C4 7.45 3.55 7 3 7H1C0.45 7 0 7.45 0 8C0 8.55 0.45 9 1 9H3C3.55 9 4 8.55 4 8Z" />
        <path d="M4 20C4 19.45 3.55 19 3 19H1C0.45 19 0 19.45 0 20C0 20.55 0.45 21 1 21H3C3.55 21 4 20.55 4 20Z" />
        <path d="M4 32C4 31.45 3.55 31 3 31H1C0.45 31 0 31.45 0 32C0 32.55 0.45 33 1 33H3C3.55 33 4 32.55 4 32Z" />
      </svg>
    ),
    title: "Custom Criteria",
    paragraph:
      "Define what matters to you – price, performance, features, reviews, or anything else. Your decision, your rules. No one-size-fits-all comparisons.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path opacity="0.5" d="M20 8L14 20H26L20 8Z" />
        <path d="M32 28C32 30.21 30.21 32 28 32C25.79 32 24 30.21 24 28C24 25.79 25.79 24 28 24C30.21 24 32 25.79 32 28Z" />
        <path d="M16 28C16 30.21 14.21 32 12 32C9.79 32 8 30.21 8 28C8 25.79 9.79 24 12 24C14.21 24 16 25.79 16 28Z" />
        <path d="M38 20H26L20 8L14 20H2C0.9 20 0 20.9 0 22C0 23.1 0.9 24 2 24H6C6 27.31 8.69 30 12 30C15.31 30 18 27.31 18 24H22C22 27.31 24.69 30 28 30C31.31 30 34 27.31 34 24H38C39.1 24 40 23.1 40 22C40 20.9 39.1 20 38 20ZM12 28C10.9 28 10 27.1 10 26C10 24.9 10.9 24 12 24C13.1 24 14 24.9 14 26C14 27.1 13.1 28 12 28ZM28 28C26.9 28 26 27.1 26 26C26 24.9 26.9 24 28 24C29.1 24 30 24.9 30 26C30 27.1 29.1 28 28 28Z" />
      </svg>
    ),
    title: "Weighted Scoring",
    paragraph:
      "Not all factors are equal. Assign importance levels to each criterion so the comparison reflects your true priorities. Price vs. features – you decide what wins.",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path opacity="0.5" d="M20 8C15.58 8 12 11.58 12 16C12 18.03 12.78 19.87 14.07 21.24L20 27L25.93 21.24C27.22 19.87 28 18.03 28 16C28 11.58 24.42 8 20 8Z" />
        <path d="M20 2C11.16 2 4 9.16 4 18C4 28.5 20 38 20 38C20 38 36 28.5 36 18C36 9.16 28.84 2 20 2ZM20 24C15.58 24 12 20.42 12 16C12 11.58 15.58 8 20 8C24.42 8 28 11.58 28 16C28 20.42 24.42 24 20 24Z" />
        <path d="M20 12C17.79 12 16 13.79 16 16C16 18.21 17.79 20 20 20C22.21 20 24 18.21 24 16C24 13.79 22.21 12 20 12Z" />
        <circle cx="32" cy="8" r="4" />
        <circle cx="8" cy="8" r="4" />
        <circle cx="32" cy="32" r="4" />
      </svg>
    ),
    title: "AI Suggestions",
    paragraph:
      "Not sure what to consider? ThinkFlow's AI suggests relevant criteria and product options. It's like having a personal shopping assistant who knows all the specs.",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path opacity="0.5" d="M4 36H36V8H4V36Z" />
        <path d="M36 4H4C1.79 4 0 5.79 0 8V36C0 38.21 1.79 40 4 40H36C38.21 40 40 38.21 40 36V8C40 5.79 38.21 4 36 4ZM36 36H4V8H36V36Z" />
        <path d="M8 32L12 24L16 28L22 18L28 26L32 20V32H8Z" />
        <path d="M10 14C11.1046 14 12 13.1046 12 12C12 10.8954 11.1046 10 10 10C8.89543 10 8 10.8954 8 12C8 13.1046 8.89543 14 10 14Z" />
      </svg>
    ),
    title: "Visual Results",
    paragraph:
      "See winners at a glance with charts and score summaries. ThinkFlow calculates total scores instantly and highlights the best choice for you.",
  },
  {
    id: 6,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path opacity="0.5" d="M30 18H10V36C10 37.1 10.9 38 12 38H28C29.1 38 30 37.1 30 36V18Z" />
        <path d="M28 14H26V10C26 6.69 23.31 4 20 4C16.69 4 14 6.69 14 10V14H12C10.9 14 10 14.9 10 16V36C10 37.1 10.9 38 12 38H28C29.1 38 30 37.1 30 36V16C30 14.9 29.1 14 28 14ZM16 10C16 7.79 17.79 6 20 6C22.21 6 24 7.79 24 10V14H16V10ZM28 36H12V16H28V36Z" />
        <circle cx="20" cy="26" r="3" />
      </svg>
    ),
    title: "Privacy First",
    paragraph:
      "No account needed, ever. Everything runs in your browser with no cloud storage. Your data stays on your device – complete privacy guaranteed.",
  },
  {
    id: 7,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path opacity="0.5" d="M32 24V32C32 33.1 31.1 34 30 34H6C4.9 34 4 33.1 4 32V8C4 6.9 4.9 6 6 6H14" />
        <path d="M30 2H14C12.9 2 12 2.9 12 4V28C12 29.1 12.9 30 14 30H30C31.1 30 32 29.1 32 28V4C32 2.9 31.1 2 30 2ZM30 28H14V4H30V28Z" />
        <path d="M22 18C24.21 18 26 16.21 26 14C26 11.79 24.21 10 22 10C19.79 10 18 11.79 18 14C18 16.21 19.79 18 22 18Z" />
        <path d="M16 24C16 21.79 18.69 20 22 20C25.31 20 28 21.79 28 24V26H16V24Z" />
        <path d="M36 18L34 16L28 22L26 20L24 22L28 26L36 18Z" />
      </svg>
    ),
    title: "Save & Share",
    paragraph:
      "Download your comparison results or share them with friends, family, or shopping buddies. Make collaborative decisions with everyone on the same page.",
  },
];
export default featuresData;
