# TanStack Start Route Architecture & Routing System

This directory houses the application's page structure and routing hierarchy. LuxeHaven is built on **TanStack Start**, which leverages **TanStack Router** to deliver a fully type-safe, performance-optimized, and file-based routing system.

---

## 📌 Architecture & Design Principles

Unlike other React frameworks (e.g., Next.js or Remix), TanStack Start utilizes a unique file-system routing model. To maintain repository sanity and prevent compilation issues, strictly adhere to the following rules:

1. **No Next.js/Remix Conventions:** Do not create `src/pages/`, `src/routes/_app/index.tsx`, or `app/layout.tsx` structure.
2. **Single App Shell:** The root component that wraps every page is [\_\_root.tsx](file:///p:/stellar-website-build-main/stellar-website-build-main/src/routes/__root.tsx). All global layouts, providers, and HTML body wrappers reside here.
3. **Type-Safe Routing:** All link targets and navigation destinations are type-safe. Avoid hardcoding relative URL strings where type-safe pathways can be resolved.

---

## 🗺️ Routing & File Naming Conventions

The file structure within this directory directly maps to the public URL paths of the LuxeHaven platform.

| File Pattern             | Resolved URL Path       | Routing Type & Description                                                                                                  |
| :----------------------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `index.tsx`              | `/`                     | **Index Route:** Represents the homepage / root view.                                                                       |
| `about.tsx`              | `/about`                | **Static Route:** Maps directly to a single segment URL.                                                                    |
| `users/index.tsx`        | `/users`                | **Nested Index Route:** Represents the index of a subdirectory.                                                             |
| `users/$id.tsx`          | `/users/:id`            | **Dynamic Segment:** Matches variable paths (e.g., `/users/123`). Access via `useParams()`.                                 |
| `posts/{-$category}.tsx` | `/posts/:category?`     | **Optional Segment:** Matches paths with optional URL variables.                                                            |
| `files/$.tsx`            | `/files/*`              | **Splat / Catch-all:** Matches all trailing paths. Access via `_splat` parameter.                                           |
| `_layout.tsx`            | _N/A (Layout boundary)_ | **Pathless Layout:** Defines a shared visual wrapper without altering the URL path. Renders nested routes via `<Outlet />`. |
| `__root.tsx`             | _N/A (Root shell)_      | **Global Layout:** Handles the top-level HTML, metadata, CSS imports, and global React context wrappers.                    |

---

## 🛠️ Code Structure for a Standard Route

When creating a new route file (e.g., `src/routes/new-page.tsx`), use the standard TanStack structure.

### 1. Static Route Example

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new-page")({
  component: NewPageContent,
  // Optional: define loaders, search parameter validation, meta tags, etc.
  head: () => ({
    meta: [
      { title: "New Page | LuxeHaven" },
      { name: "description", content: "Explore premium details." },
    ],
  }),
});

function NewPageContent() {
  return (
    <main className="container-edge py-20">
      <h1 className="text-3xl font-semibold">New View</h1>
    </main>
  );
}
```

### 2. Dynamic Route Example (`src/routes/properties.$id.tsx`)

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/properties/$id")({
  component: PropertyDetail,
});

function PropertyDetail() {
  const { id } = Route.useParams();
  return <div>Viewing property ID: {id}</div>;
}
```

---

## ⚡ Route Generation (`routeTree.gen.ts`)

The compiler uses a routing plug-in that monitors this directory and updates the type trees automatically.

> [!WARNING]
> Do **not** manually edit `src/routeTree.gen.ts`. This file is completely managed by the TanStack Router dev compiler.

- **During Development:** The dev server (`npm run dev`) runs the watcher in the background. Simply create/delete files in `src/routes/`, and the type declarations will update dynamically.
- **Troubleshooting Compilation:** If you experience type mismatches or missing routes, restart the dev server or run `npm run build` to force-regenerate the route tree.
