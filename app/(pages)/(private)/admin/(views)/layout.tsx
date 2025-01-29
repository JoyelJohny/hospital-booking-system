import type { Metadata } from "next";
import "@/app/(pages)/globals.css";
import NavbarAdmin from "@/app/(components)/NavbarAdmin";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen overflow-x-hidden">
            <NavbarAdmin />
            <main className="flex-1">{children}</main>
        </div>





    );
}

