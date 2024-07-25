export interface Props {
  title: string;
  /**
   * @format textarea
   */
  description: string;
}

export default function AboutUs({ title, description }: Props) {
  return (
    <div class="flex flex-col gap-3 max-w-lg">
      <h3 class="font-bold text-base">{title}</h3>
      <p class="text-sm font-normal">{description}</p>
    </div>
  );
}
