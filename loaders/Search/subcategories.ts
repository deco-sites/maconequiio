import type { Subcategory } from "$store/components/search/SearchSubcategories.tsx";

/**
 * @altBy matcher
 */
export interface Subcategories {
  items: Subcategory[];
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
}

export interface Props {
  subcategories: Subcategories[];
}

/**
 * @title Search Subcategories
 */
const loader = ({ subcategories = [] }: Props, req: Request) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const filteredSubcategories = subcategories.find(({ matcher }) => {
    const regex = new RegExp(matcher.replace(/\*/g, ".*"));
    return regex.test(pathname);
  });

  return filteredSubcategories;
};

export default loader;
