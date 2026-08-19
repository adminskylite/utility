"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Tag,
  User,
  Clock3,
  Globe2,
  Search,
  Eye,
  Save,
  Send,
  X,
  ExternalLink,
  CheckCircle2,
  Bold,
  Italic,
  Link2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
  Undo2,
  Redo2,
  ImagePlus,
  CodeSquare,
} from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

const AddBlog = ({ onBack, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    category: "Technology",
    tags: "",
    author: "QuerLabs",
    authorRole: "Technology & DevOps",

    featured: false,
    published: true,

    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  /*
   * ============================================================
   * TIPTAP EDITOR
   * ============================================================
   */

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 underline underline-offset-2",
        },
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class:
            "my-6 rounded-xl max-w-full h-auto",
        },
      }),

      Placeholder.configure({
        placeholder:
          "Start writing your article...\n\nWrite your introduction here. Use the toolbar above to add headings, lists, code blocks, images and links.",
      }),
    ],

    content: "",

    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[550px] px-7 py-7 focus:outline-none text-slate-800",
      },
    },
  });

  /*
   * ============================================================
   * WORD COUNT
   * ============================================================
   */

  const wordCount = useMemo(() => {
    if (!editor) return 0;

    const text = editor.getText().trim();

    if (!text) return 0;

    return text
      .split(/\s+/)
      .filter(Boolean).length;
  }, [editor?.getJSON()]);

  const readingTime = useMemo(() => {
    if (!wordCount) return "1 min read";

    return `${Math.max(
      1,
      Math.ceil(wordCount / 200)
    )} min read`;
  }, [wordCount]);

  /*
   * ============================================================
   * EDITOR ACTIONS
   * ============================================================
   */

  const addLink = () => {
    if (!editor) return;

    const previousUrl =
      editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Enter URL",
      previousUrl
    );

    if (url === null) return;

    if (url === "") {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

  const addImage = () => {
    if (!editor) return;

    const url = window.prompt(
      "Enter image URL"
    );

    if (!url) return;

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  /*
   * ============================================================
   * SAVE
   * ============================================================
   */

  const handleSave = async (
    e,
    status = "published"
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Blog title is required.");
      return;
    }

    if (!form.excerpt.trim()) {
      alert("Blog description is required.");
      return;
    }

    if (!editor) {
      alert("Editor is not ready.");
      return;
    }

    if (editor.isEmpty) {
      alert("Blog content is required.");
      return;
    }

    const blogData = {
      title: form.title.trim(),

      slug: form.slug.trim(),

      excerpt: form.excerpt.trim(),

      /*
       * IMPORTANT:
       * Tiptap JSON is saved here.
       */
      content: editor.getJSON(),

      coverImage: form.coverImage.trim(),

      category: form.category,

      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      author: {
        name: form.author.trim(),
        role: form.authorRole.trim(),
      },

      readingTime,

      wordCount,

      featured: form.featured,

      status,

      seo: {
        title:
          form.seoTitle.trim() ||
          form.title.trim(),

        description:
          form.seoDescription.trim() ||
          form.excerpt.trim(),

        keywords: form.seoKeywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),
      },

      platform: "QuerLabs",
    };

    console.log("BLOG JSON:", blogData);

    /*
     * If parent component provides onSave,
     * send complete blog object to parent.
     */
    if (onSave) {
      await onSave(blogData);
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /*
   * ============================================================
   * TOOLBAR BUTTON
   * ============================================================
   */

  const ToolbarButton = ({
    onClick,
    active = false,
    children,
    title,
  }) => {
    return (
      <button
        type="button"
        title={title}
        onClick={onClick}
        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 transition ${
          active
            ? "bg-blue-100 text-blue-700"
            : "text-slate-600 hover:bg-white hover:text-blue-600"
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-8">
      <div className="mx-auto max-w-[1450px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={onBack}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div>

              <div className="flex items-center gap-3">

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Write New Blog
                </h1>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-600">
                  Content Studio
                </span>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Create and publish a professional article
                for the QuerLabs website.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setPreview(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Eye size={18} />
              Preview
            </button>

            <button
              type="button"
              onClick={(e) =>
                handleSave(e, "draft")
              }
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Save size={18} />
              Save Draft
            </button>

          </div>

        </div>

        <form
          onSubmit={(e) =>
            handleSave(e, "published")
          }
        >

          <div className="grid grid-cols-1 gap-7 xl:grid-cols-[1fr_390px]">

            {/* =================================================
                LEFT
            ================================================== */}

            <div className="space-y-6">

              {/* BLOG INFORMATION */}

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-7 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText size={21} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Blog Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Basic information about your article.
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  {/* TITLE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Blog Title{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      value={form.title}
                      onChange={(e) =>
                        handleTitleChange(
                          e.target.value
                        )
                      }
                      placeholder="e.g. How to Deploy Next.js on a VPS"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                  {/* SLUG */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      URL Slug
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                      <div className="hidden items-center px-4 text-sm text-slate-400 sm:flex">
                        querlabs.com/blog/
                      </div>

                      <input
                        value={form.slug}
                        onChange={(e) =>
                          updateField(
                            "slug",
                            e.target.value
                          )
                        }
                        className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                      />

                    </div>

                  </div>

                  {/* EXCERPT */}

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <label className="text-sm font-semibold text-slate-700">
                        Short Description{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <span className="text-xs text-slate-400">
                        {form.excerpt.length}/180
                      </span>

                    </div>

                    <textarea
                      rows={3}
                      maxLength={180}
                      value={form.excerpt}
                      onChange={(e) =>
                        updateField(
                          "excerpt",
                          e.target.value
                        )
                      }
                      placeholder="A short description shown on blog cards and search results..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

              </div>

              {/* COVER IMAGE */}

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <ImageIcon size={20} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Cover Image
                    </h2>

                    <p className="text-sm text-slate-500">
                      Main image displayed with the article.
                    </p>

                  </div>

                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_280px]">

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Image URL
                    </label>

                    <input
                      value={form.coverImage}
                      onChange={(e) =>
                        updateField(
                          "coverImage",
                          e.target.value
                        )
                      }
                      placeholder="https://..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Recommended: 1600 × 900px.
                    </p>

                  </div>

                  <div className="aspect-video overflow-hidden rounded-xl bg-slate-100">

                    {form.coverImage ? (
                      <img
                        src={form.coverImage}
                        alt="Cover"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-slate-400">
                        <ImageIcon size={30} />
                        <span className="mt-2 text-xs">
                          Cover Preview
                        </span>
                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* =================================================
                  TIPTAP EDITOR
              ================================================== */}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 p-7">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <FileText size={21} />
                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        Article Content
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Write your complete article using the editor.
                      </p>

                    </div>

                  </div>

                  <div className="text-right text-xs text-slate-400">
                    <div>
                      {wordCount} words
                    </div>

                    <div>
                      {readingTime}
                    </div>
                  </div>

                </div>

                {/* TOOLBAR */}

                {editor && (
                  <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-5 py-3">

                    {/* UNDO */}

                    <ToolbarButton
                      title="Undo"
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .undo()
                          .run()
                      }
                    >
                      <Undo2 size={17} />
                    </ToolbarButton>

                    <ToolbarButton
                      title="Redo"
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .redo()
                          .run()
                      }
                    >
                      <Redo2 size={17} />
                    </ToolbarButton>

                    <div className="mx-2 h-6 w-px bg-slate-200" />

                    {/* H1 */}

                    <ToolbarButton
                      title="Heading 1"
                      active={editor.isActive(
                        "heading",
                        { level: 1 }
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({
                            level: 1,
                          })
                          .run()
                      }
                    >
                      <Heading1 size={18} />
                    </ToolbarButton>

                    {/* H2 */}

                    <ToolbarButton
                      title="Heading 2"
                      active={editor.isActive(
                        "heading",
                        { level: 2 }
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({
                            level: 2,
                          })
                          .run()
                      }
                    >
                      <Heading2 size={18} />
                    </ToolbarButton>

                    {/* H3 */}

                    <ToolbarButton
                      title="Heading 3"
                      active={editor.isActive(
                        "heading",
                        { level: 3 }
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({
                            level: 3,
                          })
                          .run()
                      }
                    >
                      <Heading3 size={18} />
                    </ToolbarButton>

                    <div className="mx-2 h-6 w-px bg-slate-200" />

                    {/* BOLD */}

                    <ToolbarButton
                      title="Bold"
                      active={editor.isActive(
                        "bold"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleBold()
                          .run()
                      }
                    >
                      <Bold size={17} />
                    </ToolbarButton>

                    {/* ITALIC */}

                    <ToolbarButton
                      title="Italic"
                      active={editor.isActive(
                        "italic"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleItalic()
                          .run()
                      }
                    >
                      <Italic size={17} />
                    </ToolbarButton>

                    {/* LINK */}

                    <ToolbarButton
                      title="Add Link"
                      active={editor.isActive(
                        "link"
                      )}
                      onClick={addLink}
                    >
                      <Link2 size={17} />
                    </ToolbarButton>

                    <div className="mx-2 h-6 w-px bg-slate-200" />

                    {/* BULLET LIST */}

                    <ToolbarButton
                      title="Bullet List"
                      active={editor.isActive(
                        "bulletList"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleBulletList()
                          .run()
                      }
                    >
                      <List size={18} />
                    </ToolbarButton>

                    {/* ORDERED LIST */}

                    <ToolbarButton
                      title="Ordered List"
                      active={editor.isActive(
                        "orderedList"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleOrderedList()
                          .run()
                      }
                    >
                      <ListOrdered size={18} />
                    </ToolbarButton>

                    {/* QUOTE */}

                    <ToolbarButton
                      title="Quote"
                      active={editor.isActive(
                        "blockquote"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleBlockquote()
                          .run()
                      }
                    >
                      <Quote size={18} />
                    </ToolbarButton>

                    {/* CODE */}

                    <ToolbarButton
                      title="Inline Code"
                      active={editor.isActive(
                        "code"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleCode()
                          .run()
                      }
                    >
                      <Code2 size={18} />
                    </ToolbarButton>

                    {/* CODE BLOCK */}

                    <ToolbarButton
                      title="Code Block"
                      active={editor.isActive(
                        "codeBlock"
                      )}
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .toggleCodeBlock()
                          .run()
                      }
                    >
                      <CodeSquare size={18} />
                    </ToolbarButton>

                    {/* IMAGE */}

                    <ToolbarButton
                      title="Add Image"
                      onClick={addImage}
                    >
                      <ImagePlus size={18} />
                    </ToolbarButton>

                    {/* HR */}

                    <ToolbarButton
                      title="Horizontal Rule"
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .setHorizontalRule()
                          .run()
                      }
                    >
                      <Minus size={18} />
                    </ToolbarButton>

                  </div>
                )}

                {/* EDITOR */}

                <div className="bg-white">

                  <EditorContent
                    editor={editor}
                  />

                </div>

              </div>

              {/* CATEGORY & TAGS */}

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Tag size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Category & Tags
                    </h2>

                    <p className="text-sm text-slate-500">
                      Help users discover your article.
                    </p>

                  </div>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <select
                      value={form.category}
                      onChange={(e) =>
                        updateField(
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    >
                      <option>
                        Technology
                      </option>

                      <option>
                        Web Development
                      </option>

                      <option>
                        DevOps
                      </option>

                      <option>
                        VPS & Hosting
                      </option>

                      <option>
                        Cloud
                      </option>

                      <option>
                        Cyber Security
                      </option>

                      <option>
                        Programming
                      </option>

                      <option>
                        Career
                      </option>

                      <option>
                        Artificial Intelligence
                      </option>
                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Tags
                    </label>

                    <input
                      value={form.tags}
                      onChange={(e) =>
                        updateField(
                          "tags",
                          e.target.value
                        )
                      }
                      placeholder="Next.js, VPS, Nginx, DevOps"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT
            ================================================== */}

            <div className="space-y-6">

              {/* AUTHOR */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <User size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Author
                    </h2>

                    <p className="text-xs text-slate-500">
                      Article author information
                    </p>

                  </div>

                </div>

                <div className="space-y-4">

                  <input
                    value={form.author}
                    onChange={(e) =>
                      updateField(
                        "author",
                        e.target.value
                      )
                    }
                    placeholder="Author name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <input
                    value={form.authorRole}
                    onChange={(e) =>
                      updateField(
                        "authorRole",
                        e.target.value
                      )
                    }
                    placeholder="Author role"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                </div>

              </div>

              {/* ARTICLE STATS */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Clock3 size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Article Stats
                    </h2>

                    <p className="text-xs text-slate-500">
                      Automatically calculated.
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-xs text-slate-400">
                      Words
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {wordCount}
                    </p>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-xs text-slate-400">
                      Reading
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {readingTime.replace(
                        " min read",
                        "m"
                      )}
                    </p>

                  </div>

                </div>

              </div>

              {/* SEO */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Search size={19} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      SEO Settings
                    </h2>

                    <p className="text-xs text-slate-500">
                      Optimize your article for search engines.
                    </p>

                  </div>

                </div>

                <div className="space-y-4">

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      SEO Title
                    </label>

                    <input
                      value={form.seoTitle}
                      onChange={(e) =>
                        updateField(
                          "seoTitle",
                          e.target.value
                        )
                      }
                      placeholder={
                        form.title ||
                        "SEO optimized title"
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      SEO Description
                    </label>

                    <textarea
                      rows={4}
                      value={
                        form.seoDescription
                      }
                      onChange={(e) =>
                        updateField(
                          "seoDescription",
                          e.target.value
                        )
                      }
                      placeholder="Search engine friendly description..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      SEO Keywords
                    </label>

                    <input
                      value={
                        form.seoKeywords
                      }
                      onChange={(e) =>
                        updateField(
                          "seoKeywords",
                          e.target.value
                        )
                      }
                      placeholder="nextjs, vps, nginx, deployment"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50"
                    />

                  </div>

                </div>

              </div>

              {/* PUBLISH */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 font-bold text-slate-900">
                  Publishing
                </h2>

                <div className="space-y-4">

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 p-4">

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        Publish Article
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Make article publicly visible.
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={
                        form.published
                      }
                      onChange={(e) =>
                        updateField(
                          "published",
                          e.target.checked
                        )
                      }
                      className="h-5 w-5 accent-blue-600"
                    />

                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 p-4">

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        Featured Article
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Show this article in featured blogs.
                      </p>

                    </div>

                    <input
                      type="checkbox"
                      checked={
                        form.featured
                      }
                      onChange={(e) =>
                        updateField(
                          "featured",
                          e.target.checked
                        )
                      }
                      className="h-5 w-5 accent-blue-600"
                    />

                  </label>

                </div>

              </div>

              {/* FINAL BUTTON */}

              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">

                  <div className="flex items-center gap-2">

                    <Globe2
                      size={18}
                      className="text-blue-600"
                    />

                    <p className="text-sm font-bold text-slate-900">
                      QuerLabs Blog
                    </p>

                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Publish your article directly to the
                    QuerLabs content platform.
                  </p>

                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
                >

                  {saved ? (
                    <>
                      <CheckCircle2
                        size={19}
                      />
                      Blog Published
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Publish Blog
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </form>

      </div>

      {/* =====================================================
          PREVIEW
      ====================================================== */}

      {preview && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">

          <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

              <div>

                <div className="flex items-center gap-2">

                  <Eye
                    size={18}
                    className="text-blue-600"
                  />

                  <h2 className="font-bold text-slate-900">
                    Blog Preview
                  </h2>

                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Preview of the public QuerLabs article.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setPreview(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* ARTICLE */}

            <div className="overflow-y-auto">

              <article className="mx-auto max-w-4xl px-6 py-10 md:px-10">

                {/* CATEGORY */}

                <div className="mb-5 flex items-center gap-3">

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                    {form.category}
                  </span>

                  <span className="text-sm text-slate-400">
                    {readingTime}
                  </span>

                </div>

                {/* TITLE */}

                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                  {form.title ||
                    "Your Blog Title"}
                </h1>

                {/* DESCRIPTION */}

                <p className="mt-5 text-lg leading-8 text-slate-500">
                  {form.excerpt ||
                    "Your article description will appear here."}
                </p>

                {/* AUTHOR */}

                <div className="mt-7 flex items-center gap-3 border-b border-slate-100 pb-7">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                    {form.author
                      ?.charAt(0)
                      ?.toUpperCase() ||
                      "Q"}
                  </div>

                  <div>

                    <p className="text-sm font-bold text-slate-900">
                      {form.author ||
                        "QuerLabs"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {form.authorRole ||
                        "Technology & DevOps"}
                    </p>

                  </div>

                </div>

                {/* COVER */}

                {form.coverImage && (

                  <div className="mt-8 overflow-hidden rounded-2xl">

                    <img
                      src={form.coverImage}
                      alt={
                        form.title ||
                        "Blog cover"
                      }
                      className="w-full object-cover"
                    />

                  </div>

                )}

                {/* TIPTAP PREVIEW */}

                <div className="mt-10">

                  {editor ? (
                    <EditorContent
                      editor={editor}
                    />
                  ) : (
                    <p className="text-slate-400">
                      Editor loading...
                    </p>
                  )}

                </div>

                {/* TAGS */}

                {form.tags && (

                  <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-100 pt-7">

                    {form.tags
                      .split(",")
                      .filter(Boolean)
                      .map(
                        (tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                          >
                            #
                            {tag.trim()}
                          </span>
                        )
                      )}

                  </div>

                )}

                {/* CTA */}

                <div className="mt-10 rounded-2xl bg-slate-900 p-7 text-white">

                  <p className="text-lg font-bold">
                    Explore more from QuerLabs
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Discover practical courses, VPS
                    guides and technology resources
                    built for developers.
                  </p>

                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900"
                  >
                    Visit QuerLabs
                    <ExternalLink
                      size={16}
                    />
                  </button>

                </div>

              </article>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AddBlog;