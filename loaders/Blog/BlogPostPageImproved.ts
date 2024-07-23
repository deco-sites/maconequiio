import { AppContext } from "apps/blog/mod.ts";
import { BlogPost, BlogPostPage } from "apps/blog/types.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";
import type { RequestURLParam } from "apps/website/functions/requestToParam.ts";

const COLLECTION_PATH = "Blog Posts";
const ACCESSOR = "posts";

export interface Props {
  slug: RequestURLParam;
}

/**
 * @title BlogPostPageImproved
 * @description Fetches a specific blog post page by its slug.
 *
 * @param props - Contains the slug of the blog post.
 * @param _req - The request object (unused).
 * @param ctx - The application context.
 * @returns A promise that resolves to the blog post or undefined if not found.
 */
export default async function BlogPostPageLoader(
  { slug }: Props,
  req: Request,
  ctx: AppContext,
): Promise<BlogPostPage | null> {
  try {
    if (!slug) {
      console.error("Slug is undefined or null");
      return null;
    }

    // Get records from the path
    const records = await getRecordsByPath<BlogPost[]>(
      ctx,
      COLLECTION_PATH,
      ACCESSOR,
    );

    console.log("Records:", records);

    if (!records || records.length === 0) {
      console.error("No records found");
      return null;
    }

    const { url: baseUrl } = req;
    const url = new URL(baseUrl);

    // Flatten the array of arrays
    const flattenedRecords = records.flat();

    // Since each item in flattenedRecords is already a blog post, no need to map further
    const blogPosts = flattenedRecords;

    if (!blogPosts || blogPosts.length === 0) {
      console.error("No blog posts found");
      return null;
    }

    // Find the post with the matching slug
    const post = blogPosts.find((post) => post.slug === slug);

    if (!post) {
      console.error("Post not found with slug:", slug);
      return null;
    }

    return {
      "@type": "BlogPostPage",
      post,
      seo: {
        title: post.title,
        description: post.excerpt,
        canonical: url.href,
      },
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    return null;
  }
}
