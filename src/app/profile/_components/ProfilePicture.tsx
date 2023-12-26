"use client";
import React, { useRef, useState, useEffect } from "react";
import s from "../_styles/profile.module.scss";
import { useAuth } from "@/lib/AuthContext.context";
import { toast } from "react-hot-toast";

const ProfilePicture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(user?.profilePicture);
  }, [user]);

  useEffect(() => {
    toast.success('Click on Profile Picture to change it')
  }, []);

  const readURL = () => {
    const input = fileInputRef.current;
    if (input && input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) { 
        const imageData = e.target?.result as string;
        setImage(imageData);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleReset = () => {
    setImage(
      `https://api.multiavatar.com/${user?.account}.png?apikey=O8yIjl9JkQD60v`
    );
  };

  const handleImageUploadChange = () => {
    readURL();
  };

  return (
    user?.profilePicture && (
      <div className={s.imgContainer}>
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
        <div className={s.reset} onClick={handleReset}>
          reset to default 🔄
        </div>
      </div>
    )
  );
};

export default ProfilePicture;
