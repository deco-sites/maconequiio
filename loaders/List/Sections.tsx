import { Section } from "@deco/deco/blocks";
import type { VNode } from "../../constants.tsx";

interface Props {
  sections: Section[] | null;
}

function Sections({ sections }: Props): VNode[] | null {
  if (sections === null) {
    return null;
  }

  return sections.map(({ Component, props }, index) => (
    <Component key={index} {...props} />
  ));
}

export default Sections;
