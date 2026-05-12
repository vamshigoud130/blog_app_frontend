import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'
import UserProfile from './components/UserProfile'
import AuthorProfile from './components/AuthorProfile'
import AdminProfile from './components/AdminProfile'
import ArticleDetail from './components/ArticleDetail'
import EditArticle from './components/EditArticle'
import { Toaster } from 'react-hot-toast'

function App() {
    const browserRouter = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "add-article",
                    element: <AddArticle />,
                },
                {
                    path: "user-dashboard",
                    element: <UserDashboard />,
                },
                {
                    path: "author-dashboard",
                    element: <AuthorDashboard />,
                },
                {
                    path: "admin-dashboard",
                    element: <AdminDashboard />,
                },
                {
                    path: "user-profile",
                    element: <UserProfile />,
                },
                {
                    path: "author-profile",
                    element: <AuthorProfile />,
                },
                {
                    path: "admin-profile",
                    element: <AdminProfile />,
                },
                {
                    path: "article/:id",
                    element: <ArticleDetail />,
                },
                {
                    path: "edit-article/:id",
                    element: <EditArticle />,
                },
            ],
        },
    ]);

    return (
        <>
            <Toaster position="top-center" />
            <div className="min-h-screen bg-transparent">
                <RouterProvider router={browserRouter} />
            </div>
        </>
    );
}

export default App;
