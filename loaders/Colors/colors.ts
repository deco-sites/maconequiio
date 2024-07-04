/**
 * @altBy key
 */
export interface Color {
  /**
   * @title Ex: Vermelho
   * @description Write an available color here
   */
  key: string;
  /**
   * @format color-input
   */
  value: string;
}

export interface Props {
  colors: Color[];
}

/**
 * @title Available Colors
 */
export default function loader(
  { colors = [] }: Props,
): Color[] {
  return colors;
}
