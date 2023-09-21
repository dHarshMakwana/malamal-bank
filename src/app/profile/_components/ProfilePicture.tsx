"use client";
import React, { useRef, useState } from "react";
import s from "../_styles/profile.module.scss";
import { useAuth } from "@/lib/AuthContext.context";

const ProfilePicture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    user?.profilePicture
  );

  const readURL = () => {
    const input = fileInputRef.current;
    if (input && input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target?.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleImageUploadChange = () => {
    readURL();
  };

  return (
    user && (
      <>
        <label htmlFor="imageUpload" className={s.avatarUpload}>
          <div className={s.avatarEdit}>
            <input
              type="file"
              id="imageUpload"
              ref={fileInputRef}
              onChange={handleImageUploadChange}
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <div className={s.avatarPreview}>
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </div>
        </label>
      </>
    )
  );
};

export default ProfilePicture;
