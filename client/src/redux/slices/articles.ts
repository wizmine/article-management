import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../configs/axios";
import { Article } from "../../types/types";

export const fetchArticle = createAsyncThunk("articles/fetchArticle", async () => {
  const { data } = await axios.get("/article");
  return data;
});

export const fetchCreateArticle = createAsyncThunk(
  "articles/fetchCreateArticle",
  async (params: { text: string }) => await axios.post("/article", params)
);

export const fetchRemoveArticle = createAsyncThunk(
  "articles/fetchRemoveArticle",
  async (id: string) => await axios.delete(`/article/${id}`)
);

export const fetchUpdateArticle = createAsyncThunk(
  "articles/fetchUpdateArticle",
  async (params: { id: string; text: string }) => await axios.patch("/article", params)
);

interface InitialState {
  articles: Article[];
  status: string;
}

const initialState: InitialState = {
  articles: [],
  status: "loading",
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get articles
    builder.addCase(fetchArticle.pending, (state, action) => {
      state.articles = [];
      state.status = "loading";
    });
    builder.addCase(fetchArticle.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.articles = [];
      state.status = "error";
    });
    // delete articles
    builder.addCase(fetchRemoveArticle.fulfilled, (state, action) => {
      state.articles = state.articles.filter((obj: Article) => obj._id !== action.meta.arg);
      state.status = "loaded";
    });
  },
});

export const articlesReducer = articleSlice.reducer;
