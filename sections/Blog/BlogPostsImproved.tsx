import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "@deco/deco/hooks";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost } from "apps/blog/types.ts";
import { useId } from "site/sdk/useId.ts";

export interface CTA {
  text?: string;
}

/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export interface Props {
  title?: RichText;
  cta?: CTA;
  posts?: BlogPost[];
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}

function Container(
  { children, title }: { children: ComponentChildren; title?: RichText },
) {
  return (
    <div class="w-full container py-8 flex flex-col gap-2 lg:py-10 max-w-[95%] lg:max-w-[1350px] px-4">
      {title && (
        <div
          class="leading-[18px] lg:text-[26px] lg:leading-[30px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {children}
    </div>
  );
}

export default function BlogPosts({
  title,
  cta = { text: "Show more" },
  posts = [],
  pagination: {
    page = 0,
    perPage = 6,
  } = {},
}: Props) {
  const from = perPage * page;
  const to = perPage * (page + 1);

  // It's boring to generate ids. Let's autogen them
  const postList = useId();

  // Get the HTMX link for this section
  const fetchMoreLink = usePartialSection({
    mode: "append",
    // Renders this section with the next page
    props: {
      pagination: { perPage, page: page + 1 },
    },
  })["f-partial"];

  function calculateReadingTime(words: number): string {
    const wordsPerMinute = 250;
    const estimatedTimeMinutes = words / wordsPerMinute;

    const roundedReadingTime = Math.round(estimatedTimeMinutes);
    return `${roundedReadingTime || 1} min`;
  }

  const ContainerComponent = page === 0 ? Container : Fragment;

  return (
    <ContainerComponent title={title}>
      <>
        <div class="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-4">
          {posts?.slice(from, to).map((post) => (
            <a
              href={`/blog/${post.slug}`}
              class="border border-base-200 overflow-hidden rounded-lg flex flex-col"
            >
              <Image
                width={380}
                height={274}
                class="object-cover w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={post.image || ""}
                alt={post.image}
                decoding="async"
                loading="lazy"
                id={post.slug}
              />
              <div class="p-6 space-y-4 flex flex-col flex-1">
                <div class="font-semibold">
                  {calculateReadingTime(post.content.split(" ").length)}
                </div>
                <div class="space-y-2 flex-1">
                  <h3
                    class="text-2xl h-16 line-clamp-2"
                    id={`title-${post.slug}`}
                  >
                    {post.title}
                  </h3>
                  <p class="text-base">{post.excerpt}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  {post.categories?.map((category) => (
                    <div class="badge badge-lg badge-primary text-xs">
                      {category.name}
                    </div>
                  ))}
                </div>
                <div class="flex flex-wrap gap-2">
                  <span>
                    {post.date
                      ? new Date(post.date).toLocaleDateString("pt-BR", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      : ""}
                  </span>
                  <span>•</span>
                  <span>{post.authors[0]?.name || "Maconequi"}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        {to < (posts?.length || 1000) && (
          <div class="flex justify-center w-full mt-2" id={postList}>
            <button
              hx-get={fetchMoreLink}
              hx-swap="outerHTML"
              hx-target={`#${postList}`}
              aria-label={cta.text}
              class="btn btn-primary"
            >
              <span class="inline [.htmx-request_&]:hidden">
                {cta.text}
              </span>
              <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
            </button>
          </div>
        )}
      </>
    </ContainerComponent>
  );
}
