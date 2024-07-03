export interface Detail {
  /**
   * @format rich-text
   */
  html: string;
}

/**
 * @altBy matcher
 */
export interface Details {
  item: Detail;
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
}

export interface Props {
  details: Details[];
}

/**
 * @title Search Details
 */
export default function loader(
  { details = [] }: Props,
  req: Request,
): Details | undefined {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const filteredDetail = details.find(({ matcher }) => {
    const regex = new RegExp(matcher.replace(/\*/g, ".*"));
    return regex.test(pathname);
  });

  return filteredDetail;
}
