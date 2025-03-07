"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={
            <div style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <CircularProgress />
            </div>
          }>
            {children}
          </Suspense>
        </QueryClientProvider>
      </body>
    </html>
  );
}
