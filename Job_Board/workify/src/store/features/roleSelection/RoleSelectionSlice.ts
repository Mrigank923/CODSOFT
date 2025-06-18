import { createSlice } from '@reduxjs/toolkit';

export interface RoleSelectionState {
    isOpen : boolean;
    role: string | null;
    skip : boolean;
    recruiter : {
        jobTitle : string;
        companyName : string;
        location : string;
        jobType : string;
        companyEmail : string;
        companyWebsite : string;
        jobDescription: string;
        jobRequirements: string;
    };
    candidate : {
        email : string;
        location : string;
        experience : string;
        education : string;
        course : string;
        careerInterests : string;
        companyName : string;
        currentJobTitle : string;
        skills : string[];
        isResumeUploaded : boolean;
        resumeFile: File | null;
    };
}

const initialState:RoleSelectionState = {
    isOpen : false,
    role: null,
    skip : false,
    recruiter : {
        jobTitle : '',
        companyName : '',
        location : '',
        jobType : '',
        companyEmail : '',
        companyWebsite : '',
        jobDescription: '',
        jobRequirements: '',
    },
    candidate : {
        email : '',
        location : '',
        experience : '',
        education : '',
        course : '',
        careerInterests : '',
        companyName : '',
        currentJobTitle : '',
        skills : [],
        isResumeUploaded : false,
        resumeFile: null,
    }
};

const roleSelectionSlice = createSlice({
  name: 'roleSelection',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    setSkip(state, action) {
      state.skip = action.payload;
    },
    setRecruiter(state, action) {
      state.recruiter = {
        ...state.recruiter,
        ...action.payload
      };
    },
    setCandidate(state, action) {
      state.candidate = {
        ...state.candidate,
        ...action.payload
      };
    },
    setResumeUploaded(state, action) {
      state.candidate.isResumeUploaded = action.payload;
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
  }
});

export default roleSelectionSlice.reducer;
export const { setRole, setIsOpen, setRecruiter, setCandidate } = roleSelectionSlice.actions;