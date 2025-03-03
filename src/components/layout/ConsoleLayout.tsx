
import React from 'react';

interface ConsoleLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ConsoleLayout: React.FC<ConsoleLayoutProps> = ({
  children,
  title
}) => {
  return (
    <div className="min-h-screen bg-secondary/10">
      {title && (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>
          </div>
        </header>
      )}
      <main className="h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
};

export default ConsoleLayout;
