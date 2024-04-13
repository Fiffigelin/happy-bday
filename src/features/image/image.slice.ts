import { BdayImage } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImageById, fetchImages } from "../../api/image/image.api";

interface ImageState {
  selectedImage: BdayImage | null;
  images: BdayImage[] | null;
  status: string;
  error: string | undefined;
}

export const initialState: ImageState = {
  selectedImage: null,
  images: [],
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
  reducers: {
    setSelectedImage: (state, action) => {
      const savedImageId = action.payload;
      const image = state.images?.find((img) => img.id === savedImageId);
      if (image) {
        state.selectedImage = image;
      }
    },
    resetImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImagesAPI.fulfilled, (state, action) => {
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
export const { setSelectedImage, resetImage } = imageSlice.actions;
