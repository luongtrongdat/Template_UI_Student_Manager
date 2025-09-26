// Nơi cấu hình api

import axios from "axios";
import type { Student } from "../utils/type";
// API LẤY TẤT CẢ DANH SÁCH SINH VIÊN
export const API_GETALL_STUDENT ="http://localhost:8080/students";

// API THÊM SINH VIÊN
export const API_ADD_STUDENT= async (new_student:Student)=>{
    const response = await axios.post("http://localhost:8080/students",new_student);
    return response.data;
}

// API XÓA TỪNG SINH VIÊN

// API CẬP NHẬT SINH VIÊN

// API SẮP XẾP SINH VIÊN

// API TÌM KIẾM SINH VIÊN

// API PHÂN TRANG SINH VIÊN