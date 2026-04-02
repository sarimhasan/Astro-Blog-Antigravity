export interface PostEntry {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  readTime?: string;
  featured?: boolean;
  authorName?: string;
  coverImage?: string;
  date?: string;
}

export const mapPostEntry = (entry: any): PostEntry => ({
  slug: entry.slug,
  ...entry.data,
});

export const sortPostsByDateDesc = <T extends { date?: string }>(
  entries: T[],
) =>
  [...entries].sort((left, right) => {
    const leftDate = left.date ? new Date(left.date).getTime() : 0;
    const rightDate = right.date ? new Date(right.date).getTime() : 0;

    return rightDate - leftDate;
  });

export const formatPostDate = (date?: string) => {
  if (!date) return "Unpublished";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

export const getFeaturedPost = <
  T extends { featured?: boolean; date?: string },
>(
  entries: T[],
) => {
  const sorted = sortPostsByDateDesc(entries);

  return sorted.find((entry) => entry.featured) ?? sorted[0];
};
