"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store/store";
import { loadAuthFromStorage } from "@/store/authSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    /**
     * Create the store once, pre-loading auth state directly from localStorage.
     * This runs synchronously during the first render on the client, so the
     * access token is already in the store before any RTK Query call fires.
     * On the server (SSR) loadAuthFromStorage() returns {} safely.
     */
    storeRef.current = makeStore(loadAuthFromStorage());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
