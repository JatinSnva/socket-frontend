'use client';

import Image from "next/image";
import { useSocket } from "@/socket/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const { socket } = useSocket();

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (!socket) return;
    // Declare the connection handlers outside to ensure only one handler
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      // Emit 'open_booking' after successful connection (only once)
      socket.emit('open_booking', 'Hello World');
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    // // Only add the event listeners once when component is mounted
    // if (!socket.hasListeners("connect")) {
    //   socket.on("connect", onConnect);
    // }
    // if (!socket.hasListeners("disconnect")) {
    //   socket.on("disconnect", onDisconnect);
    // }

    // Listen for transport upgrade events
    const upgradeListener = (transport) => {
      setTransport(transport.name);
    };

    // socket.io.engine.on("upgrade", upgradeListener);

    // Cleanup socket event listeners when component unmounts
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.io.engine.off("upgrade", upgradeListener);
    };
  }, [socket]); // Empty dependency array ensures this useEffect runs once on mount

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
    </div>
  );
}
