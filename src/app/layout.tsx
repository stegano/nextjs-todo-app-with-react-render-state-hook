"use client";

import "reset-css";
import "./globals.css";
import { Inter } from "next/font/google";
import { RenderStateProvider, Store } from "react-render-state-hook";

const inter = Inter({ subsets: ["latin"] });

const store = Store.createStore({
  debug: true,
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <RenderStateProvider store={store}>
        <body className={inter.className}>{children}</body>
      </RenderStateProvider>
    </html>
  );
}
