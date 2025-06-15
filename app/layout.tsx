"use client"

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  
  return (
    <html lang="en">
      <head><link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link></head>
      <body className={`font-family-roboto`}>
        {children}
      </body>
    </html>
  );
}