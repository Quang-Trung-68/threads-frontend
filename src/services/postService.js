import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery(),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Get feed
    
    getFeed: builder.query({
      query: ({ refreshKey, ...params }) => ({
        url: `/api/posts/feed`,
        method: "GET",
        params,
      }),

      // tất cả page dùng chung cache
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.refreshKey) {
          delete newQueryArgs.refreshKey;
        }
        return `getFeed_${newQueryArgs.type}_${queryArgs.refreshKey ?? "default"}`;
      },

      // merge data giữa các page
      merge: (currentCache, response) => {
        // Deduplicate posts based on ID
        const currentIds = new Set(currentCache.data.map((post) => post.id));
        const newPosts = response.data.filter(
          (post) => !currentIds.has(post.id),
        );

        if (response.pagination.current_page === 1) {
          // If page 1, strictly replace the data to support "fresh start" logic
          currentCache.data = newPosts;
        } else {
          currentCache.data.push(...newPosts);
        }

        currentCache.pagination = response.pagination;
      },

      // chỉ refetch khi page thay đổi
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/posts/${id}/like`,
        method: "POST",
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetFeedQuery, useLikePostMutation } = postApi;
