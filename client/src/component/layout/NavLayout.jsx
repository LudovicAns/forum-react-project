import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router";
import {StackedLayout} from "../catalyst-ui/stacked-layout.jsx";
import {Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer} from "../catalyst-ui/navbar.jsx";
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
} from "../catalyst-ui/sidebar.jsx";
import {
    ArrowRightEndOnRectangleIcon,
    ChatBubbleBottomCenterTextIcon,
    HomeIcon,
    MoonIcon,
    SunIcon,
    UserPlusIcon
} from "@heroicons/react/20/solid/index.js";
import {useTheme} from "../../context/ThemeContextProvider.jsx";
import logo from "../../assets/logo.svg";
import {Avatar} from "../catalyst-ui/avatar.jsx";
import {UserContext} from "../../context/UserContextProvider.jsx";
import avatarImg from "../../assets/avatar.png";

const navItems = [
    {
        label: 'Accueil',
        to: '/',
        icon: <HomeIcon/>
    },
    {
        label: 'Forum',
        to: '/forum',
        icon: <ChatBubbleBottomCenterTextIcon/>
    },
]

function NavLayout() {
    const userContext = React.useContext(UserContext);

    const {theme, toggleTheme} = useTheme();
    const location = useLocation();

    useEffect(() => {
        console.log("UserContext has been updated:", userContext.user);
    }, [userContext.user]); // Dépendance sur 'user'

    return (
        <StackedLayout navbar={
            <Navbar>
                <NavbarItem className={`max-lg:hidden`} href="/">
                    <Avatar src={logo} alt="logo"/>
                </NavbarItem>
                <NavbarDivider className={`max-lg:hidden`}/>
                <NavbarSection className={`max-lg:hidden`}>
                    {navItems.map(({label, to, icon}) => (
                        <NavbarItem key={label} href={to} current={location.pathname === to}>
                            {icon}
                            <NavbarLabel>{label}</NavbarLabel>
                        </NavbarItem>
                    ))}
                </NavbarSection>
                <NavbarSpacer/>
                <NavbarDivider className={`max-lg:hidden`}/>
                <NavbarSection className={`max-lg:hidden`}>
                    {
                        userContext.user ?
                            <NavbarItem href="/profile">
                                <Avatar src={avatarImg}/>
                                <NavbarLabel>{userContext.user.username}</NavbarLabel>
                            </NavbarItem> :
                            <>
                                <NavbarItem href="/login" current={location.pathname === '/login'}>
                                    <ArrowRightEndOnRectangleIcon/>
                                    <NavbarLabel>Connexion</NavbarLabel>
                                </NavbarItem>
                                <NavbarItem href="/register" current={location.pathname === '/register'}>
                                    <UserPlusIcon/>
                                    <NavbarLabel>Inscription</NavbarLabel>
                                </NavbarItem>
                            </>
                    }
                </NavbarSection>
                <NavbarDivider/>
                <NavbarItem onClick={toggleTheme}>
                    {theme === 'light' ? <MoonIcon className={"cursor-pointer"}/> : <SunIcon className={"cursor-pointer"}/>}
                </NavbarItem>
            </Navbar>
        } sidebar={
            <Sidebar>
                <SidebarHeader>
                    <SidebarItem>
                        <Avatar src={logo}/>
                        <SidebarLabel>Forum</SidebarLabel>
                    </SidebarItem>
                </SidebarHeader>
                <SidebarBody>
                    <SidebarSection>
                        {navItems.map(({label, to, icon}) => (
                            <SidebarItem key={label} href={to} current={location.pathname === to}>
                                {icon}
                                <SidebarLabel>{label}</SidebarLabel>
                            </SidebarItem>
                        ))}
                    </SidebarSection>
                </SidebarBody>
                <SidebarFooter>
                    <SidebarItem href="/login" current={location.pathname === '/login'}>
                        <ArrowRightEndOnRectangleIcon/>
                        <SidebarLabel>Connexion</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/register" current={location.pathname === '/register'}>
                        <UserPlusIcon/>
                        <SidebarLabel>Inscription</SidebarLabel>
                    </SidebarItem>
                </SidebarFooter>
            </Sidebar>
        }>
            <Outlet/>
        </StackedLayout>
    );
}

export default NavLayout;