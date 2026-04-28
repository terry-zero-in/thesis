"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { signOut } from "@/lib/auth/actions";

import { NAV_SECTIONS } from "./nav-config";

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null,
);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error(
      "useCommandPalette must be used inside CommandPaletteProvider",
    );
  }
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const handleSignOut = useCallback(() => {
    setOpen(false);
    startTransition(async () => {
      await signOut();
    });
  }, []);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {NAV_SECTIONS.map((section) => (
            <CommandGroup key={section.label} heading={section.label}>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={`${section.label} ${item.label}`}
                    onSelect={() => navigate(item.href)}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem value="sign out" onSelect={handleSignOut}>
              <span>Sign out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}
