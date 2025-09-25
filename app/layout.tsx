import "@/styles/globals.css";

import { ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { createSupabaseServerClient } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "CarGuard",
  description: "Finde typische Schwachstellen, Rückrufe und Community-Erfahrungen für dein nächstes Auto."
};

async function signOut() {
  "use server";
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}

function getInitials(email?: string | null) {
  if (!email) return "CG";
  return email.slice(0, 2).toUpperCase();
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const userEmail = session?.user?.email;

  return (
    <html lang="de">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-border/70 bg-white/80 backdrop-blur-sm">
            <div className="container flex items-center justify-between py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                CarGuard
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium">
                <Link href="/browse" className="text-muted-foreground transition hover:text-foreground">
                  Browse
                </Link>
                <Link href="/report" className="text-muted-foreground transition hover:text-foreground">
                  Report
                </Link>
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm" className="rounded-full px-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 bg-primary/10">
                            <AvatarFallback>{getInitials(userEmail)}</AvatarFallback>
                          </Avatar>
                          <span className="hidden md:inline">Profil</span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[180px]">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="w-full">
                          Profil & Einstellungen
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <form action={signOut} className="w-full">
                          <button type="submit" className="w-full text-left">
                            Logout
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant="secondary" size="sm" className="rounded-full">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <div className="container py-10 lg:py-12">{children}</div>
          </main>
          <footer className="border-t border-border/70 bg-muted/30">
            <div className="container flex flex-col gap-3 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <p>CarGuard – dein Überblick über typische Schwachstellen & Rückrufe.</p>
              <div className="flex items-center gap-4">
                <Link href="/legal/privacy" className="hover:text-foreground">
                  Datenschutz
                </Link>
                <Link href="/legal/imprint" className="hover:text-foreground">
                  Impressum
                </Link>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
