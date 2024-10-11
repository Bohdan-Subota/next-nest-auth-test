import AppBar from "@/components/AppBar";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Next-Nest Test",
  description: "This is a test app",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    
    <html lang="en">
      <body>
      
        <Providers>
          <div className="bg-background text-copy-primary">
          <AppBar />
            {props.children}
            </div>
        </Providers>
       
      </body>
      </html>
  
  );
}
