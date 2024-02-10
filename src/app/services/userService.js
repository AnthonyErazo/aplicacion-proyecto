import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../../firebase/db'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    tagTypes: ["image", "dataProfile"],
    endpoints: (builder) => ({
        GetUserById: builder.query({
            query: (localId) => `users/${localId}.json`,
        }),
        postProfileImage: builder.mutation({
            query: ({ localId, image }) => ({
                url: `users/${localId}/image.json`,
                method: "PUT",
                body: {image}
            }),
            invalidatesTags: ["image"]
        }),
        getProfileImage: builder.query({
            query: (localId) => `users/${localId}/image.json`,
            providesTags: ["image"]
        }),
        postProfileData: builder.mutation({
            query: ({ localId, dataProfile }) => ({
                url: `users/${localId}/dataProfile.json`,
                method: "PUT",
                body: dataProfile
            }),
            invalidatesTags: ["dataProfile"]
        }),
        getProfileData: builder.query({
            query: (localId) => `users/${localId}/dataProfile.json`,
            providesTags: ["dataProfile"]
        }),
        postUserLocation: builder.mutation({
            query: ({ localId, locationFormatted }) => ({
                url: `users/${localId}/location.json`,
                method: "PUT",
                body: {location:locationFormatted}
            }),
            invalidatesTags: ["location"]
        }),
        getUserLocation: builder.query({
            query: (localId) => `users/${localId}/location.json`,
            providesTags: ["location"]
        }),
    }),
})

export const {
    useGetUserByIdQuery,
    useGetProfileDataQuery,
    usePostProfileDataMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    usePostUserLocationMutation,
    useGetUserLocationQuery
} = userApi