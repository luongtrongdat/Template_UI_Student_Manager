import type { Book, BookPagination, PageAble } from "../components/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState : BookPagination = {
    books : [] ,
    totalPage : 0 
};

export const addBook = createAsyncThunk("book/addBook" ,async(book : Book) => {
    const response = await axios.post("http://localhost:8080/books",book);
    return response.data;
});

export const getAllBook = createAsyncThunk("book/getAllBook", async ({page ,size , search} : PageAble) => {
    const response = await axios.get(`http://localhost:8080/books?_page=${page}&_limit=${size}&title_like=${search}`);
    return {
        books: response.data,
        totalPage: Math.ceil(+response.headers["x-total-count"] / size) // Tính tổng số trang
    };
});

export const updateBook = createAsyncThunk("book/updateBook" ,async(book : Book ) => {
    const response = await axios.put(`http://localhost:8080/books/${book.id}`,book);
    return response.data;
});

export const deleteBook = createAsyncThunk("book/deleteBook" ,async(id : number) => {
     await axios.delete(`http://localhost:8080/books/${id}`);
    return id ;
});



const bookSlice = createSlice({
    name : "book",
    initialState,
    reducers : {} ,
    extraReducers : (builder) => {
        builder
        .addCase(getAllBook.fulfilled, (state,action) => {
            return state = {
                books : action.payload.books ,
                totalPage : action.payload.totalPage
            };

        })
        .addCase(addBook.fulfilled , (state , action) => {
            state.books.push(action.payload);
        })

        .addCase(updateBook.fulfilled,(state , action) => {
             state.books.map((book) => book.id === action.payload.id ? action.payload : book);
        })
        .addCase(deleteBook.fulfilled , (state , action) => {

               state.books = state.books.filter((book) => book.id !== action.payload)

        });

    }
});
export default bookSlice.reducer ;