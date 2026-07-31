"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../theme-toggle";
import { Button } from "../ui/button";

function Header() {
  const { isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 sm:px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={"/logo.png"}
            alt="DentWise Logo"
            width={32}
            height={32}
            className="w-9 sm:w-11"
          />
          <span className="font-semibold text-base sm:text-lg">Dental App</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
        </div>

        {/* DESKTOP AUTH / USER */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user?.fullName}
              </span>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant={"ghost"} size={"sm"}>
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size={"sm"}>Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* MOBILE: Auth buttons + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignUpButton mode="modal">
              <Button size={"sm"} className="text-xs px-3">
                Sign Up
              </Button>
            </SignUpButton>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div className="fixed top-16  right-0 bottom-0 w-64 max-w-[80vw] bg-background border-l border-border shadow-xl md:hidden flex flex-col z-50 animate-in slide-in-from-right ">
            <div className="flex flex-col gap-1 p-6 pt-8 bg-black/40 rounded-2xl ">
              <a
                href="#"
                className="px-4 py-3 rounded-lg  text-foreground font-medium hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#"
                className="px-4 py-3 rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#"
                className="px-4 py-3 rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </div>

            <div className="mt-auto p-6 border-t border-border">
              {!isSignedIn && (
                <div className="flex flex-col gap-2">
                  <SignInButton mode="modal">
                    <Button
                      variant={"outline"}
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Header;
