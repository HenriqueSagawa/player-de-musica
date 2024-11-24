"use client";

import { createEdgeStoreProvider } from "@edgestore/react";
import { type EdgeStoreRouter } from "../app/api/edgestore/[...edgestore]/route";

const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider<EdgeStoreRouter>({
  maxConcurrentUploads: 1,
});

export { EdgeStoreProvider, useEdgeStore };
