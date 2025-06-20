import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export interface SetPasswordPageState {
    password: string;
    confirmPassword: string;
    errors: {
        passwordError: string;
        confirmPasswordError: string;
    };
    isLoading: boolean;
    showConfirmPassword: boolean;
}

const initialState = {
    password: '',
    confirmPassword: '',
    errors: {
        passwordError: '',
        confirmPasswordError: ''
    },
    isLoading: false,
    showConfirmPassword: false
} as SetPasswordPageState;

export const changePassword = createAsyncThunk(
    'newPassword/setPassword',
    async ({ contact ,password , confirmPassword }: { contact : string , password: string, confirmPassword: string }, { rejectWithValue, dispatch }) => {
    const isPasswordValid = PASSWORD_REGEX.test(password);
    if(!isPasswordValid || password !== confirmPassword){
      dispatch(setErrors({
        passwordError: (!isPasswordValid) ? !password ? 'Password is required!' : 'Password must be at least 8 characters and include uppercase, lowercase, digit, and special character' : '',
        confirmPasswordError: !confirmPassword ? 'Confirm password is Required!' : (password !== confirmPassword) ? 'Passwords do not match' : ''
      }));
      return rejectWithValue('Validation errors');
    } else if(isPasswordValid && password === confirmPassword){
      dispatch(setErrors({
        passwordError: '',
        confirmPasswordError: ''
      }));
    }
    // Api logic
    dispatch(setIsLoading(true));
    toast.loading('Setting Password...');
    try {
      const response = await axios.put('/', {
        contact,
        newPassword : password,
        confirmPassword
      });
        toast.dismiss();
        toast.success('Password changed successfully');
        return response.data;
    } catch (error) {
        toast.dismiss();
        toast.error('Please try again some error occured!');
        return rejectWithValue('backend error');
        console.log(error);
    } finally {
        dispatch(setIsLoading(false));
    }
    }
);

const SetPasswordPageSlice = createSlice({
    name: 'setPasswordPage',
    initialState,
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setShowConfirmPassword: (state, action) => {
            state.showConfirmPassword = action.payload;
        },
    }
});

export const { setPassword, setConfirmPassword, setErrors, setIsLoading , setShowConfirmPassword } = SetPasswordPageSlice.actions;

export default SetPasswordPageSlice.reducer;
