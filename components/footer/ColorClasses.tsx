export interface Layout {
  backgroundColor?:
    | "Ice"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2";
  hide?: {
    newsletter?: boolean;
    about_us?: boolean;
    extraLinks?: boolean;
    socialLinks?: boolean;
    sectionLinks?: boolean;
    paymentMethods?: boolean;
    security?: boolean;
    logos?: boolean;
    backToTheTop?: boolean;
  };
}

export default function colorClasses(layout: Layout) {
  switch (layout?.backgroundColor) {
    case "Ice":
      return "bg-white-ice text-black-neutral";
    case "Base 100":
      return "bg-base-100 text-base-content";
    case "Base 100 inverted":
      return "bg-base-content text-base-100";
    default:
      return "bg-primary text-primary-content";
  }
}
