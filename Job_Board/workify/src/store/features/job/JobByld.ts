import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobById = createAsyncThunk(
    "job/fetchJobById",
    async (id: string) => {
        const response = await fetch(`/${id}`);
        const data = await response.json();
        return data;
    }
);