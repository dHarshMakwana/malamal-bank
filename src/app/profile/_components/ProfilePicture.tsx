"use client";
import React, { useRef, useState, useEffect } from "react";
import s from "../_styles/profile.module.scss";
import { useAuth } from "@/lib/AuthContext.context";

const ProfilePicture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
      setImage(savedImage);
    } else {
      setImage(user?.profilePicture || null);
    }
  }, [user]);

  const readURL = () => {
    const input = fileInputRef.current;
    if (input && input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target?.result as string;
        setImage(imageData);
        localStorage.setItem("profilePicture", imageData); // Save to local storage
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleImageUploadChange = () => {
    readURL();
  };

  return (
    user?.profilePicture && (
      <>
        <label
          title="click to change avatar"
          htmlFor="imageUpload"
          className={s.avatarUpload}
        >
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
