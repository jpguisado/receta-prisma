import "~/styles/globals.css";

import Providers from "./providers";
import { Toaster } from "~/components/ui/toaster";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import Footer from "./components/footer";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata = {
  title: "Recetario",
  description: "Keep track of your weekly meals",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="es">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1" />
          <meta property="og:image" content="<generated>" />
          <meta property="og:image:type" content="<generated>" />
          <meta property="og:image:width" content="<generated>" />
          <meta property="og:image:height" content="<generated>" />
        </head>
        <body className={`h-dvh flex flex-col justify-between font-sans touch-none`}>
          <div className="overflow-x-scroll h-[90%] p-6">
            <Suspense fallback={
              <div className="flex flex-col gap-3">
                <Skeleton className="w-full h-[40px] rounded-md" />
                <Skeleton className="w-full h-[30px] rounded-md" />
                <Skeleton className="w-full h-[100px] rounded-md" />
                <Skeleton className="w-full h-[500px] rounded-md" />
              </div>
            }>
              {children}
            </Suspense>
          </div>
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
