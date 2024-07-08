import { BlogPostPage } from "apps/blog/types.ts";
import Image from "apps/website/components/Image.tsx";
import NotFound from "deco-sites/maconequiio/components/ui/NotFound.tsx";

interface Props {
  /**
   * @description The description of name.
   */
  page?: BlogPostPage | null;
}

const PARAGRAPH_STYLES =
  "[&_p]:leading-[150%] [&_p]:text-lg [&_*]:mb-4 [&_a]:text-blue-600";
const HEADING_STYLES =
  "[&>h1]:text-4xl [&>h1]:my-6 [&>h1]:font-bold [&>h2]:text-3xl [&>h2]:my-6 [&>h2]:font-bold [&>h3]:text-2xl [&>h3]:my-6 [&>h3]:font-bold [&>h4]:text-xl [&>h4]:my-6 [&>h4]:font-bold [&>h5]:text-lg [&>h5]:my-6 [&>h5]:font-bold [&>h6]:text-base [&>h6]:my-6 [&>h6]:font-bold";
const CODE_BLOCK_STYLES =
  "[&>pre]:bg-gray-100 [&>pre]:text-gray-800 [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:border [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>code]:block [&>code]:w-full";
const IMAGE_STYLES = "[&_img]:rounded-2xl [&_img]:w-full [&_img]:my-12";
const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-black [&>blockquote]:text-xl [&>blockquote]:italic [&>blockquote]:pl-6";

const CONTENT_STYLES =
  `max-w-3xl mx-auto ${PARAGRAPH_STYLES} ${HEADING_STYLES} ${CODE_BLOCK_STYLES} ${IMAGE_STYLES} ${BLOCKQUOTE_STYLES} [&>ul]:list-disc [&>ul]:pl-8 [&>ol]:list-decimal [&>ol]:pl-8 [&>strong]:text-bold`;

const DEFAULT_AVATAR =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e";

export default function Blog({ page }: Props) {
  if (!page || !page.post) return <NotFound />;

  const { title, authors, image, date, content, excerpt } = page.post;

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div class="w-full flex flex-col gap-20 container mx-auto px-4 md:px-0 py-12 lg:py-12">
      <div class="w-full flex flex-col gap-12 max-w-3xl lg:mx-auto">
        <h1 class="text-5xl font-bold" id="blog-post-title">{title}</h1>
        <span class="text-lg">{excerpt}</span>
        <div class="flex items-center gap-4">
          <Image
            class="object-cover w-14 h-14 rounded-full"
            alt={authors[0]?.name}
            src={authors[0]?.avatar || DEFAULT_AVATAR}
            width={56}
            height={56}
          />
          <div class="flex flex-col">
            <p class="font-semibold text-base">
              {authors.map((author) => author.name).join(", ")}
            </p>
            <p class="text-base">{formattedDate}</p>
          </div>
        </div>
      </div>
      <Image
        class="w-full object-cover aspect-video max-h-[600px] rounded-2xl max-w-3xl lg:mx-auto"
        src={image || ""}
        width={1024}
        height={576}
        id="blog-post-image"
      />
      <div
        class={CONTENT_STYLES}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      >
      </div>
    </div>
  );
}
