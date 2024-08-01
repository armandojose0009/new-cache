import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const host = `http://localhost:3001`;

export const fetchRecords = createAsyncThunk('records/fetchRecords', async () => {
  const response = await axios.get(`${host}/api/records`);
  return response.data;
});

export const addRecord = createAsyncThunk('records/addRecord', async (body) => {
  const response = await axios.post(`${host}/api/records`, body);
  return response.data;
});

export const updateRecord = createAsyncThunk('records/updateRecord', async ({ id, updatedRecord }) => {
  const response = await axios.put(`${host}/api/records/${id}`, updatedRecord);
  return response.data;
});

export const deleteRecord = createAsyncThunk('records/deleteRecord', async (id) => {
  await axios.delete(`${host}/api/records/${id}`);
  return id;
});

const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    records: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(record => record._id === action.payload._id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(record => record._id === action.payload);
        if (index !== -1) {
          state.records.splice(index, 1);
        }
      });
  },
});

export default recordsSlice.reducer;
