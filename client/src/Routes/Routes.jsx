import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Main from "../Layouts/Main";
import Classes from "../pages/Classes/Classes/Classes";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors/Instructors";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "login",
            element: <Login></Login>
        },
        {
            path: "register",
            element: <Register></Register>
        },
        {
            path:'*',
            element: <Navigate to="/error"></Navigate>
        },
        {
            path: "error",
            element: <Error></Error>
        },
        {
            path: "instructors",
            element: <Instructors></Instructors>
        },
        {
            path: "classes",
            element: <Classes></Classes>
        }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
        {
            path: 'home',
            element: <DashboardHome></DashboardHome>
        },
        {
            path: 'allusers',
            element: <AllUsers></AllUsers>
        },
        {
            path: 'manageclasses',
            element: <ManageClasses></ManageClasses>
        },
        {
            path: 'myclass',
            element: <MyClass></MyClass>
        },
    ]
  }
]);
