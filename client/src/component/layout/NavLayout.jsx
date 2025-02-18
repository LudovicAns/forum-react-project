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
    ChatBubbleBottomCenterTextIcon, ChevronDoubleDownIcon, ChevronDownIcon,
    HomeIcon,
    MoonIcon, PowerIcon,
    SunIcon, UserCircleIcon,
    UserPlusIcon
} from "@heroicons/react/20/solid/index.js";
import {useTheme} from "../../context/ThemeContextProvider.jsx";
import logo from "../../assets/logo.svg";
import {Avatar} from "../catalyst-ui/avatar.jsx";
import {UserContext} from "../../context/UserContextProvider.jsx";
import avatarImg from "../../assets/avatar.png";
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu
} from "../catalyst-ui/dropdown.jsx";

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

    return (
        <StackedLayout navbar={
            <Navbar>
                <NavbarItem className={`max-lg:hidden`} href="/">
                    <Avatar src={logo} alt="logo" square={true}/>
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
                            <Dropdown>
                                <DropdownButton as={NavbarItem}>
                                    <Avatar src={avatarImg}/>
                                    <NavbarLabel>{userContext.user.username}</NavbarLabel>
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu>
                                    <DropdownItem href="/profile" className={"cursor-pointer"}>
                                        <UserCircleIcon/>
                                        <DropdownLabel>Votre Profil</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider/>
                                    <DropdownItem className={"cursor-pointer"} onClick={() => userContext.logout()}>
                                        <PowerIcon className={"fill-red-500"}/>
                                        <DropdownLabel className={"text-red-500"}>Déconnexion</DropdownLabel>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            :
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
                        <Avatar src={logo} alt={"logo"} square={true}/>
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
                    {
                        userContext.user ?
                            <Dropdown>
                                <DropdownButton as={NavbarItem}>
                                    <Avatar src={avatarImg}/>
                                    <NavbarLabel>{userContext.user.username}</NavbarLabel>
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu>
                                    <DropdownItem href="/profile" className={"cursor-pointer"}>
                                        <UserCircleIcon/>
                                        <DropdownLabel>Votre Profil</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider/>
                                    <DropdownItem className={"cursor-pointer"} onClick={() => userContext.logout()}>
                                        <PowerIcon className={"fill-red-500"}/>
                                        <DropdownLabel className={"text-red-500"}>Déconnexion</DropdownLabel>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            :
                            <>
                                <SidebarItem href="/login" current={location.pathname === '/login'}>
                                    <ArrowRightEndOnRectangleIcon/>
                                    <NavbarLabel>Connexion</NavbarLabel>
                                </SidebarItem>
                                <SidebarItem href="/register" current={location.pathname === '/register'}>
                                    <UserPlusIcon/>
                                    <SidebarLabel>Inscription</SidebarLabel>
                                </SidebarItem>
                            </>
                    }
                </SidebarFooter>
            </Sidebar>
        }>
            <Outlet/>
        </StackedLayout>
    );
}

export default NavLayout;