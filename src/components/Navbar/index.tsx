'use client';

import { Spinner,Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { ToggleTheme } from "../ToggleTheme";
import { RiNeteaseCloudMusicFill } from "react-icons/ri";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
export function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const menuItems = [
        {label: "Home", href: "/"},
        {label: "Álbuns", href: "/albuns"},
        {label: "Sobre nós", href: "/sobre"},
        {label: "Contato", href: "/contato"}
    ];

    return (
        <Navbar shouldHideOnScroll isBlurred onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" color="foreground">
                        <RiNeteaseCloudMusicFill size={30} />
                        <p className="font-bold text-inherit ml-1">Player do samuca</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link
                            color="foreground"
                            href={item.href}
                            aria-current={index === 1 ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden sm:flex">
                    <ToggleTheme />
                </NavbarItem>

                <NavbarItem>
                    {status == "loading" ? (
                        <Spinner color="secondary"/>
                    ) : session && status == "authenticated"? (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name={session.user?.name as string}
                                    size="sm"
                                    src={session.user?.image as string}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <div>
                                        <p className="font-semibold">conectado como</p>
                                        <p className="font-semibold">{session?.user?.email}</p>
                                    </div>
                                </DropdownItem>
                                <DropdownItem key="settings"><Link href="/dashboard" color="foreground" className="text-sm w-full h-full">Meu Perfil</Link></DropdownItem>
                                <DropdownItem onClick={() => signOut()} key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Link href="/login">
                            <Button variant="flat" color="secondary">Login</Button>
                        </Link>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color="foreground"
                            className="w-full"
                            href={item.href}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <NavbarMenuItem>
                    <ToggleTheme />
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}