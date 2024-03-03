import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"], weight: ['400', '700', '800'],
  preload: false
});

export const metadata = {
  title: "Age Generator App",
  description: "App to generate your age, Front End Mentor Challenge",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
