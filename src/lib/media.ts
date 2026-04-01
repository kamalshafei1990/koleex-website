import { supabaseAdmin as supabase } from "./supabase-admin";
import type { MediaRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Media Library — Upload, list, delete images via Supabase Storage + media table.

   Flow:
   1. Upload file to Supabase Storage bucket "media"
   2. Get public URL
   3. Insert record into media table (name, file_path, url, type, size)
   4. Sections reference images via image_url (public URL from Storage)

   Future: sections can reference media_id for more structured linking.
   --------------------------------------------------------------------------- */

const BUCKET = "media";

/* ── Get public URL for a file in storage ── */
function getPublicUrl(filePath: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

/* ── Upload image to Storage + insert into media table ── */
export async function uploadMedia(file: File): Promise<MediaRow | null> {
  // Generate unique filename
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `${timestamp}_${safeName}`;

  // Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("[Media] Upload error:", uploadError.message);
    return null;
  }

  // Get public URL
  const url = getPublicUrl(filePath);

  // Insert into media table
  const { data, error: dbError } = await supabase
    .from("media")
    .insert({
      name: file.name,
      file_path: filePath,
      url: url,
      type: file.type.startsWith("image/") ? "image" : "file",
      size: file.size,
    })
    .select()
    .single();

  if (dbError) {
    console.error("[Media] DB insert error:", dbError.message);
    // Clean up uploaded file
    await supabase.storage.from(BUCKET).remove([filePath]);
    return null;
  }

  return data;
}

/* ── Get all media items ── */
export async function getAllMedia(): Promise<MediaRow[]> {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Media] Fetch error:", error.message);
    return [];
  }

  return data || [];
}

/* ── Get single media item by ID ── */
export async function getMediaById(id: string): Promise<MediaRow | null> {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[Media] Fetch by ID error:", error.message);
    return null;
  }

  return data;
}

/* ── Delete media item (Storage + DB) ── */
export async function deleteMedia(id: string): Promise<boolean> {
  // Get the record first
  const media = await getMediaById(id);
  if (!media) return false;

  // Delete from Storage
  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([media.file_path]);

  if (storageError) {
    console.error("[Media] Storage delete error:", storageError.message);
  }

  // Delete from DB
  const { error: dbError } = await supabase
    .from("media")
    .delete()
    .eq("id", id);

  if (dbError) {
    console.error("[Media] DB delete error:", dbError.message);
    return false;
  }

  return true;
}
