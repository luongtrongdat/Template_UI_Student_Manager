import { configureStore } from "@reduxjs/toolkit";
import student_slice from "../store/slices/studentSlice";

export const store= configureStore({
    reducer: {
        students: student_slice
    }
})