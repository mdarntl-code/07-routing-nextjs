import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface TaggedNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function TaggedNotesPage({ params }: TaggedNotesPageProps) {
  const { slug } = await params;
  
  const currentTag = slug[0]; 
  const tagForApi = currentTag === 'all' ? "" : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 6, search: "", tag: tagForApi }],
    queryFn: () => fetchNotes({ page: 1, perPage: 6, search: "", tag: tagForApi }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>
          {currentTag === 'all' ? 'All Notes' : `Tag: ${currentTag}`}
        </h1>

        <NotesClient key={currentTag} activeTag={tagForApi} />
      </div>
    </HydrationBoundary>
  );
}