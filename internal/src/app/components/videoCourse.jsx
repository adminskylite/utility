"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Upload,
  Link2,
  BookOpen,
  Clock3,
  User,
  BarChart3,
  Tag,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  Save,
  X,
} from "lucide-react";

const AddUdemyCourse = ({ onBack, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    udemyUrl: "",
    description: "",
    thumbnail: "",
    instructor: "Tarsem Singh",
    duration: "",
    lectures: "",
    level: "Beginner",
    language: "English",
    category: "",
    price: "",
    originalPrice: "",
    tags: "",
    featured: false,
    published: true,
  });

  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.udemyUrl) {
      alert("Course title and Udemy URL are required.");
      return;
    }

    const courseData = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      platform: "Udemy",
      createdAt: new Date().toISOString(),
    };

    console.log("Udemy Course:", courseData);

    if (onSave) {
      onSave(courseData);
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Add Udemy Course
                </h1>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  UDEMY
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Add your Udemy course to the QuerLabs platform.
              </p>
            </div>
          </div>

          <button
            onClick={() => setPreview(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Eye size={18} />
            Preview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-7 xl:grid-cols-[1fr_400px]">

            {/* LEFT */}
            <div className="space-y-6">

              {/* Basic Information */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Course Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Basic information about your Udemy course
                    </p>
                  </div>
                </div>

                <div className="space-y-5">

                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Course Title <span className="text-red-500">*</span>
                    </label>

                    <input
                      value={form.title}
                      onChange={(e) =>
                        updateField("title", e.target.value)
                      }
                      placeholder="e.g. Complete Node.js & Express Masterclass"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    />
                  </div>

                  {/* Udemy URL */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Udemy Course URL{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Link2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="url"
                        value={form.udemyUrl}
                        onChange={(e) =>
                          updateField("udemyUrl", e.target.value)
                        }
                        placeholder="https://www.udemy.com/course/your-course/"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Students will be redirected to this Udemy course.
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Course Description
                    </label>

                    <textarea
                      rows={5}
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      placeholder="Write a short description of your course..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    />
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-6">
                  <h2 className="font-bold text-slate-900">
                    Course Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Information displayed on the QuerLabs course page.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Instructor */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Instructor
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={form.instructor}
                        onChange={(e) =>
                          updateField("instructor", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <input
                      value={form.category}
                      onChange={(e) =>
                        updateField("category", e.target.value)
                      }
                      placeholder="Web Development"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Course Duration
                    </label>

                    <div className="relative">
                      <Clock3
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={form.duration}
                        onChange={(e) =>
                          updateField("duration", e.target.value)
                        }
                        placeholder="12h 30m"
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                      />
                    </div>
                  </div>

                  {/* Lectures */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Total Lectures
                    </label>

                    <input
                      type="number"
                      value={form.lectures}
                      onChange={(e) =>
                        updateField("lectures", e.target.value)
                      }
                      placeholder="85"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Level
                    </label>

                    <select
                      value={form.level}
                      onChange={(e) =>
                        updateField("level", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>All Levels</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Language
                    </label>

                    <select
                      value={form.language}
                      onChange={(e) =>
                        updateField("language", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Hinglish</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-6">
                  <h2 className="font-bold text-slate-900">
                    Course Pricing
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Display the Udemy course pricing on QuerLabs.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Current Price
                    </label>

                    <input
                      value={form.price}
                      onChange={(e) =>
                        updateField("price", e.target.value)
                      }
                      placeholder="₹499"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Original Price
                    </label>

                    <input
                      value={form.originalPrice}
                      onChange={(e) =>
                        updateField("originalPrice", e.target.value)
                      }
                      placeholder="₹3,499"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                  <Tag size={20} className="text-purple-600" />

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Course Tags
                    </h2>

                    <p className="text-sm text-slate-500">
                      Add tags separated by commas.
                    </p>
                  </div>
                </div>

                <input
                  value={form.tags}
                  onChange={(e) =>
                    updateField("tags", e.target.value)
                  }
                  placeholder="React, Node.js, MongoDB, MERN"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                />
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Thumbnail */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                  <h2 className="font-bold text-slate-900">
                    Course Thumbnail
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Use the same thumbnail as your Udemy course.
                  </p>
                </div>

                <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
                  {form.thumbnail ? (
                    <img
                      src={form.thumbnail}
                      alt="Course thumbnail"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-slate-400">
                      <ImageIcon size={35} />
                      <span className="mt-2 text-sm">
                        Thumbnail Preview
                      </span>
                    </div>
                  )}
                </div>

                <input
                  value={form.thumbnail}
                  onChange={(e) =>
                    updateField("thumbnail", e.target.value)
                  }
                  placeholder="Paste thumbnail image URL"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              {/* Platform */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Course Platform
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      External course provider
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <ExternalLink size={22} />
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
                    U
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Udemy
                    </p>

                    <p className="text-xs text-slate-500">
                      External course
                    </p>
                  </div>
                </div>
              </div>

              {/* Publishing */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 font-bold text-slate-900">
                  Publishing
                </h2>

                <label className="mb-4 flex cursor-pointer items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Publish Course
                    </p>

                    <p className="text-xs text-slate-500">
                      Make this course visible on QuerLabs.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      updateField("published", e.target.checked)
                    }
                    className="h-5 w-5 accent-purple-600"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Featured Course
                    </p>

                    <p className="text-xs text-slate-500">
                      Show in featured courses.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      updateField("featured", e.target.checked)
                    }
                    className="h-5 w-5 accent-purple-600"
                  />
                </label>
              </div>

              {/* Save */}
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Ready to publish?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your Udemy course will appear on the QuerLabs
                    course listing.
                  </p>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 size={19} />
                      Course Added
                    </>
                  ) : (
                    <>
                      <Save size={19} />
                      Add Udemy Course
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-5 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  Course Preview
                </h2>

                <p className="text-xs text-slate-500">
                  This is how the course can appear on QuerLabs.
                </p>
              </div>

              <button
                onClick={() => setPreview(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">

              {form.thumbnail && (
                <img
                  src={form.thumbnail}
                  alt=""
                  className="mb-6 aspect-video w-full rounded-xl object-cover"
                />
              )}

              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                  UDEMY
                </span>

                <span className="text-sm text-slate-400">
                  {form.level}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                {form.title || "Your Course Title"}
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                {form.description ||
                  "Your course description will appear here."}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

                <div className="rounded-xl bg-slate-50 p-4">
                  <Clock3 size={17} className="mb-2 text-purple-600" />
                  <p className="text-xs text-slate-400">
                    Duration
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {form.duration || "--"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <BookOpen size={17} className="mb-2 text-purple-600" />
                  <p className="text-xs text-slate-400">
                    Lectures
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {form.lectures || "--"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <User size={17} className="mb-2 text-purple-600" />
                  <p className="text-xs text-slate-400">
                    Instructor
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {form.instructor || "--"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <BarChart3 size={17} className="mb-2 text-purple-600" />
                  <p className="text-xs text-slate-400">
                    Level
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {form.level}
                  </p>
                </div>

              </div>

              <div className="mt-7 flex items-center justify-between rounded-xl bg-purple-50 p-5">

                <div>
                  <p className="text-xs text-slate-500">
                    Course Price
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      {form.price || "₹---"}
                    </span>

                    {form.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        {form.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={form.udemyUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                >
                  View on Udemy
                  <ExternalLink size={17} />
                </a>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUdemyCourse;