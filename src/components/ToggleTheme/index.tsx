"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import menuItens from "./menuItens";
import { useTheme } from "next-themes";
import { Icon } from "./icon"
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [ hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (hasMounted == false) {
    return <></>;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="rounded-full !p-2 !min-w-0 !w-fit !h-fit">
          <Icon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu  items={menuItens} onAction={(key: any) => setTheme(key)}>
        {(item) => (
          <DropdownItem key={item.key}>
            <Link href="#">{item.label}</Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}