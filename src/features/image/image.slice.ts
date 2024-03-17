import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImageById, fetchImages } from "../../api/image/image.api";
import { BdayImage } from "@/types";

interface ImageState {
  selectedImage: BdayImage | null;
  images: BdayImage[] | null;
  imagesCategory0: BdayImage[] | null;
  imagesCategory1: BdayImage[] | null;
  imagesCategory2: BdayImage[] | null;
  status: string;
  error: string | undefined;
}

export const initialState: ImageState = {
  selectedImage: null,
  images: [],
  imagesCategory0: [],
  imagesCategory1: [],
  imagesCategory2: [],
  status: "idle",
  error: undefined,
};

export const fetchImagesAPI = createAsyncThunk<BdayImage[], void>(
  "image/fetchImages",
  async (_, { rejectWithValue }) => {
    try {
      const images = await fetchImages();
      return images;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchImageByIdAPI = createAsyncThunk<BdayImage, string>(
  "image/fetchImageById",
  async (imageId: string, { rejectWithValue }) => {
    try {
      const image: BdayImage = await fetchImageById(imageId);
      return image;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImagesAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.images = action.payload || [];
      })
      .addCase(fetchImagesAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(fetchImageByIdAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImageByIdAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.selectedImage = action.payload || null;
      })
      .addCase(fetchImageByIdAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const imageReducer = imageSlice.reducer;
