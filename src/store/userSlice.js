import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Store the updated user in the state
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Toggle loading state
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
