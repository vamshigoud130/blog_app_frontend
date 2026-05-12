import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    navbarClass,
    navContainerClass,
    navBrandClass,
    navLinksClass,
    navLinkClass,
    navLinkActiveClass,
    pageBackground
} from '../styles/common';
import { toast } from 'react-hot-toast';
import { authStore } from '../store/authStore';
import { useEffect } from 'react';

function RootLayout() {
    const { isAuthenticated, currentUser, logout, verifyAuth } = authStore();
    const navigate = useNavigate();
    useEffect(()=>{
        verifyAuth();
    },[])

    const handleLogout = async () => {
        await logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const getProfilePath = () => {
        if (!currentUser) return '/';
        if (currentUser.role === 'AUTHOR') return '/author-profile';
        if (currentUser.role === 'ADMIN') return '/admin-profile';
        return '/user-profile';
    };

    return (
        <div className={pageBackground}>
            {/* Navbar */}
            <nav className={navbarClass}>
                <div className={navContainerClass}>
                    <NavLink to="/" className={navBrandClass}>
                        BlogApp
                    </NavLink>

                    <div className={navLinksClass}>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                        >
                            Home
                        </NavLink>

                        {!isAuthenticated ? (
                            <>
                                <NavLink 
                                    to="/register" 
                                    className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                                >
                                    Register
                                </NavLink>
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                                >
                                    Login
                                </NavLink>
                            </>
                        ) : (
                            <>
                                {currentUser.role === 'AUTHOR' && (
                                    <NavLink 
                                        to="/add-article" 
                                        className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                                    >
                                        Add Article
                                    </NavLink>
                                )}
                                <NavLink 
                                    to={getProfilePath()} 
                                    title="Profile"
                                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                                >
                                    {currentUser?.profileImageURL ? (
                                        <img
                                            src={currentUser.profileImageURL}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 hover:shadow-[0_0_0_3px_rgba(25,28,29,0.05)] transition-all"
                                        />
                                    ) : (
                                        <div 
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-on-primary font-inter font-bold text-sm border-2 border-primary/20 bg-linear-to-br from-primary to-primary-container hover:shadow-[0_0_0_3px_rgba(25,28,29,0.05)] transition-all shrink-0"
                                        >
                                            {currentUser?.firstName?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                    )}
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className={`${navLinkClass} border-none bg-transparent cursor-pointer`}
                                >
                                    Logout
                                </button >
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="grow">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;


