import { configureStore } from "@reduxjs/toolkit"
import { activeSocialStoriesReducer } from "./slices/activeSocialStoriesSlice"

export const store = configureStore({
    reducer: {
        activeSocialStories: activeSocialStoriesReducer
    }
})