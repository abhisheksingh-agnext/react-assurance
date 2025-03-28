import { configureStore } from "@reduxjs/toolkit";
import postReducer  from "./slices/post";
export default configureStore({
  reducer: {
    post: postReducer
  },
});