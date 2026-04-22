"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/authApi";
import { setUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type Props = {
  onSaved: () => void;
};

function normalizeImageUrl(url: string | null | undefined) {
  if (!url) return null;
  // Backend may return http URL; force https in browser to avoid mixed-content blocking.
  return url.replace("http://", "https://");
}

export default function PersonalDetails({ onSaved }: Props) {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const { data: profileData, isFetching: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const resolvedUser = profileData?.user ?? loggedInUser;

  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setName(null);
    setPhone(null);
    setEmail(null);
    setAvatarUrl(null);
    setImageFile(null);
    setError("");
  };

  const handleSave = async () => {
    setError("");

    const finalName = (name ?? resolvedUser?.name ?? "").trim();
    const finalPhone = (phone ?? resolvedUser?.phone ?? "").trim();

    if (!finalName) {
      setError("Name is required.");
      return;
    }

    try {
      const response = await updateProfile({
        name: finalName,
        phone: finalPhone,
        image: imageFile ?? undefined,
      }).unwrap();

      dispatch(setUser(response.user));
      setName(null);
      setPhone(null);
      setEmail(response.user.email || null);
      setAvatarUrl(normalizeImageUrl(response.user.image) || null);
      setImageFile(null);
      onSaved();
    } catch (err: unknown) {
      const apiError = err as {
        data?: {
          message?: string;
          detail?: string;
          name?: string[];
          phone?: string[];
          image?: string[];
        };
      };

      setError(
        apiError?.data?.message ||
          apiError?.data?.detail ||
          apiError?.data?.name?.[0] ||
          apiError?.data?.phone?.[0] ||
          apiError?.data?.image?.[0] ||
          "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800">Personal Details</h2>
      {isProfileLoading ? <p className="mt-2 text-xs text-slate-500">Loading profile...</p> : null}
      {error ? <p className="mt-2 text-xs font-medium text-rose-600">{error}</p> : null}

      <div className="mt-4">
        <div
          className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100"
          onClick={() => fileRef.current?.click()}
        >
          <Image
            src={avatarUrl ?? normalizeImageUrl(resolvedUser?.image) ?? "/admin-avatar.svg"}
            alt="avatar"
            fill
            sizes="112px"
            className="object-cover"
            unoptimized
            onError={() => setAvatarUrl("/admin-avatar.svg")}
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-linear-to-t from-slate-900/55 to-transparent pb-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700">
              <Camera className="h-3.5 w-3.5" strokeWidth={2} />
              Change
            </span>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          <Camera className="h-3.5 w-3.5" strokeWidth={2} />
          Change Photo
        </button>
        <p className="mt-1 text-xs text-slate-500">Upload a new profile image (JPG, PNG, WebP).</p>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            value={name ?? resolvedUser?.name ?? ""}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>
 
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Contact Phone</label>
            <input
              value={phone ?? resolvedUser?.phone ?? ""}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Contact Email</label>
            <input
              value={email ?? resolvedUser?.email ?? ""}
              readOnly
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isUpdatingProfile}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SaveIcon />
          {isUpdatingProfile ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function SaveIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}