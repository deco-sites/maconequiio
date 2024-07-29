import Component from "$store/components/footer/Newsletter.tsx";
import type { Props } from "$store/components/footer/Newsletter.tsx";

function Island(props: Props & { variation?: "Variation 1" | "Variation 2" }) {
  return <Component {...props} />;
}

export default Island;
