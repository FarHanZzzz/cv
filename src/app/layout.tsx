import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://farhansadeque.com"),
  title: "Farhan Sadeque | Portfolio & Resume Website",
  description: "Computer Science & Engineering Student at Independent University, Bangladesh. Co-founder of Reverie Inc. Software engineer focusing on intelligent solutions, computer vision, and full-stack systems.",
  keywords: ["Farhan Sadeque", "Portfolio", "Resume", "Software Engineer", "Independent University Bangladesh", "IUB", "Reverie Inc", "FastAPI", "Next.js", "MediaPipe", "OpenCV"],
  authors: [{ name: "Farhan Sadeque" }],
  openGraph: {
    title: "Farhan Sadeque | Portfolio & Resume",
    description: "Computer Science & Engineering Student at Independent University, Bangladesh. Co-founder of Reverie Inc. Software engineer focusing on intelligent solutions, computer vision, and full-stack systems.",
    url: "https://farhansadeque.com",
    siteName: "Farhan Sadeque Portfolio",
    images: [
      {
        url: "/pedi_growth.png", // fallback preview
        width: 1200,
        height: 630,
        alt: "Farhan Sadeque Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan Sadeque | Portfolio & Resume",
    description: "Computer Science & Engineering Student at Independent University, Bangladesh. Co-founder of Reverie Inc. Software engineer focusing on intelligent solutions, computer vision, and full-stack systems.",
    images: ["/pedi_growth.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans theme-transition">
        <ThemeProvider>
          <CustomCursor />
          <ParticleBackground />
          <Navbar />
          <main className="flex-grow z-10 relative">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
