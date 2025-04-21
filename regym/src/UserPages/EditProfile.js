import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";
import API_BASE_URL from "../config";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const userId = sessionStorage.getItem("userId");

  // 🔄 Load profile data
  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE_URL}/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
            location: data.location || "",
            profileImage: data.profileImage || null,
          });

          if (data.profileImage) {
            setPreview(data.profileImage);
          }
        })
        .catch((err) => console.error("Error loading profile:", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, profileImage: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let base64Image = preview;

      if (form.profileImage && typeof form.profileImage !== "string") {
        const reader = new FileReader();
        reader.onloadend = async () => {
          base64Image = reader.result;
          await updateProfile(base64Image);
        };
        reader.readAsDataURL(form.profileImage);
      } else {
        await updateProfile(base64Image);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Something went wrong while updating.");
    }
  };

  const updateProfile = async (imageData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        profileImage: imageData,
      }),
    });

    if (response.ok) {
      alert("Profile updated!");
    } else {
      alert("Failed to update profile.");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="profile-wrapper">
        <h2>Edit Your Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-image-container">
            {preview ? (
              <img src={preview} alt="Preview" className="profile-preview" />
            ) : (
              <div className="profile-placeholder">Upload Image</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <button type="submit">Save Changes</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
