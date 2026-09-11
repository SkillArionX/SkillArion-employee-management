import React from "react";
import ReactDOM from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import App from "./App.jsx";
import "./index.css";

/**
 * window.storage — Supabase-backed, with a localStorage fallback
 * -------------------------------------------------------------------------
 * The app (src/App.jsx) talks to a single `window.storage` API with
 * get/set/delete/list, exactly like the Claude.ai artifact runtime's
 * built-in storage. It only ever touches one key: "app-db".
 *
 * Here, outside that runtime, we back that same API with a Supabase table
 * (see supabase/schema.sql) so data is shared across every device/browser
 * instead of being stuck in one machine's localStorage.
 *
 * window.uploadFile — Supabase Storage, with a base64 fallback
 * -------------------------------------------------------------------------
 * Photos and documents (Business Development files, Daily Work Log photos,
 * Project documents) are uploaded through window.uploadFile(file, folder),
 * which returns a URL. When Supabase is configured that URL is a real,
 * public Supabase Storage URL (see supabase/schema.sql for the bucket) — the
 * file itself lives in the bucket, not in the database record. When
 * Supabase isn't configured, App.jsx falls back to embedding the file as a
 * base64 data URL instead, so uploads still work for local testing.
 *
 * If VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY aren't set (e.g. you haven't
 * created a Supabase project yet), everything above falls back automatically
 * so the app still runs locally without any setup.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || "portal-files";

const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (typeof window !== "undefined" && !window.storage) {
  if (hasSupabase) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    window.storage = {
      async get(key) {
        const { data, error } = await supabase
          .from("kv_store")
          .select("key,value,shared")
          .eq("key", key)
          .maybeSingle();
        if (error) throw error;
        if (!data) throw new Error(`key not found: ${key}`);
        return { key: data.key, value: data.value, shared: data.shared };
      },
      async set(key, value, shared = true) {
        const { error } = await supabase
          .from("kv_store")
          .upsert({ key, value, shared }, { onConflict: "key" });
        if (error) throw error;
        return { key, value, shared };
      },
      async delete(key) {
        const { data: existing } = await supabase
          .from("kv_store")
          .select("key")
          .eq("key", key)
          .maybeSingle();
        const { error } = await supabase.from("kv_store").delete().eq("key", key);
        if (error) throw error;
        return { key, deleted: Boolean(existing), shared: true };
      },
      async list(prefix) {
        let query = supabase.from("kv_store").select("key");
        if (prefix) query = query.like("key", `${prefix}%`);
        const { data, error } = await query;
        if (error) throw error;
        return { keys: (data || []).map((r) => r.key), prefix, shared: true };
      },
    };

    window.uploadFile = async (file, folder = "uploads") => {
      const safeExt = (file.name.split(".").pop() || "bin").replace(/[^a-zA-Z0-9]/g, "");
      const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
      const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
      return data.publicUrl;
    };

    console.info("[storage] using Supabase (" + SUPABASE_URL + "), bucket \"" + SUPABASE_BUCKET + "\"");
  } else {
    window.storage = {
      async get(key) {
        const raw = localStorage.getItem(key);
        if (raw === null) throw new Error(`key not found: ${key}`);
        return { key, value: raw, shared: false };
      },
      async set(key, value) {
        localStorage.setItem(key, value);
        return { key, value, shared: false };
      },
      async delete(key) {
        const existed = localStorage.getItem(key) !== null;
        localStorage.removeItem(key);
        return { key, deleted: existed, shared: false };
      },
      async list(prefix) {
        const keys = Object.keys(localStorage).filter((k) => !prefix || k.startsWith(prefix));
        return { keys, prefix, shared: false };
      },
    };
    // window.uploadFile is intentionally left undefined here — App.jsx falls
    // back to embedding files as base64 data URLs when it's not present.

    console.info("[storage] no Supabase env vars found — using localStorage (single browser only), files embedded as base64");
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
