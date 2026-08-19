"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Code2,
  Eye,
  FileText,
  GripVertical,
  Image as ImageIcon,
  Layers3,
  Link2,
  List,
  MoreHorizontal,
  Plus,
  Quote,
  Save,
  Search,
  Send,
  Settings2,
  Trash2,
  Type,
  Video,
  X,
} from "lucide-react";

/* =========================================================
   CONSTANTS
========================================================= */

const COLORS = {
  page: "#f7f9fc",
  card: "#ffffff",
  navy: "#07111f",
  text: "#152238",
  muted: "#7890ad",
  border: "#e3e9f1",
  green: "#00d39b",
  greenDark: "#00b987",
  greenSoft: "#e9fbf5",
  yellowSoft: "#fff7df",
  yellow: "#c18a00",
  blueSoft: "#f4f7fb",
};

const INITIAL_COURSES = [
  // {
  //   id: "course-1",
  //   title: "JavaScript Mastery",
  //   description:
  //     "Learn JavaScript from fundamentals to advanced concepts with practical examples.",
  //   status: "Published",
  //   category: "Programming",
  //   level: "Beginner",
  //   modules: [
  //     {
  //       id: "module-1",
  //       title: "JavaScript Fundamentals",
  //       chapters: [
  //         {
  //           id: "chapter-1",
  //           title: "Introduction to JavaScript",
  //           status: "Published",
  //           content: [
  //             {
  //               id: "block-1",
  //               type: "heading",
  //               value: "What is JavaScript?",
  //             },
  //             {
  //               id: "block-2",
  //               type: "paragraph",
  //               value:
  //                 "JavaScript is a high-level programming language used to create interactive and dynamic web applications.",
  //             },
  //             {
  //               id: "block-3",
  //               type: "paragraph",
  //               value:
  //                 "It can run inside web browsers as well as on servers using environments such as Node.js.",
  //             },
  //             {
  //               id: "block-4",
  //               type: "code",
  //               value:
  //                 'console.log("Hello, JavaScript!");',
  //             },
  //           ],
  //         },
  //         {
  //           id: "chapter-2",
  //           title: "Variables & Data Types",
  //           status: "Draft",
  //           content: [],
  //         },
  //         {
  //           id: "chapter-3",
  //           title: "Operators",
  //           status: "Draft",
  //           content: [],
  //         },
  //       ],
  //     },
  //     {
  //       id: "module-2",
  //       title: "Functions",
  //       chapters: [
  //         {
  //           id: "chapter-4",
  //           title: "Functions in JavaScript",
  //           status: "Draft",
  //           content: [],
  //         },
  //         {
  //           id: "chapter-5",
  //           title: "Arrow Functions",
  //           status: "Draft",
  //           content: [],
  //         },
  //       ],
  //     },
  //     {
  //       id: "module-3",
  //       title: "Objects & Arrays",
  //       chapters: [
  //         {
  //           id: "chapter-6",
  //           title: "Working With Objects",
  //           status: "Draft",
  //           content: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TextCourseBuilder() {
  const [courses, setCourses] = useState(INITIAL_COURSES);

  const [selectedCourseId, setSelectedCourseId] = useState(
    INITIAL_COURSES[0]?.id
  );

  const [selectedModuleId, setSelectedModuleId] = useState(
    INITIAL_COURSES[0]?.modules?.[0]?.id
  );

  const [selectedChapterId, setSelectedChapterId] = useState(
    INITIAL_COURSES[0]?.modules?.[0]?.chapters?.[0]?.id
  );

  const [expandedModules, setExpandedModules] = useState({
    "module-1": true,
    "module-2": true,
    "module-3": false,
  });

  const [search, setSearch] = useState("");

  const [activeMode, setActiveMode] = useState("editor");

  const [modal, setModal] = useState(null);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "Programming",
    level: "Beginner",
  });

  const [moduleName, setModuleName] = useState("");

  const [chapterName, setChapterName] = useState("");

  const [showBlockMenu, setShowBlockMenu] = useState(false);

  /* =========================================================
     SELECTED DATA
  ========================================================= */

  const selectedCourse = useMemo(() => {
    return courses.find(
      (course) => course.id === selectedCourseId
    );
  }, [courses, selectedCourseId]);

  const selectedModule = useMemo(() => {
    return selectedCourse?.modules?.find(
      (module) => module.id === selectedModuleId
    );
  }, [selectedCourse, selectedModuleId]);

  const selectedChapter = useMemo(() => {
    return selectedModule?.chapters?.find(
      (chapter) => chapter.id === selectedChapterId
    );
  }, [selectedModule, selectedChapterId]);

  /* =========================================================
     CONTENT HELPERS
  ========================================================= */

  const updateCourses = (updater) => {
    setCourses((previous) => updater(previous));
  };

  const updateCurrentChapter = (chapterUpdater) => {
    if (!selectedCourse || !selectedModule || !selectedChapter) {
      return;
    }

    updateCourses((previous) =>
      previous.map((course) => {
        if (course.id !== selectedCourse.id) {
          return course;
        }

        return {
          ...course,

          modules: course.modules.map((module) => {
            if (module.id !== selectedModule.id) {
              return module;
            }

            return {
              ...module,

              chapters: module.chapters.map((chapter) => {
                if (chapter.id !== selectedChapter.id) {
                  return chapter;
                }

                return chapterUpdater(chapter);
              }),
            };
          }),
        };
      })
    );
  };

  /* =========================================================
     COURSE ACTIONS
  ========================================================= */

  const createCourse = () => {
    if (!courseForm.title.trim()) return;

    const course = {
      id: `course-${Date.now()}`,
      title: courseForm.title.trim(),
      description: courseForm.description.trim(),
      category: courseForm.category,
      level: courseForm.level,
      status: "Draft",
      modules: [],
    };

    setCourses((previous) => [...previous, course]);

    setSelectedCourseId(course.id);
    setSelectedModuleId(null);
    setSelectedChapterId(null);

    setCourseForm({
      title: "",
      description: "",
      category: "Programming",
      level: "Beginner",
    });

    setModal(null);
  };

  /* =========================================================
     MODULE ACTIONS
  ========================================================= */

  const createModule = () => {
    if (!moduleName.trim() || !selectedCourse) {
      return;
    }

    const module = {
      id: `module-${Date.now()}`,
      title: moduleName.trim(),
      chapters: [],
    };

    const updatedCourse = {
      ...selectedCourse,
      modules: [...selectedCourse.modules, module],
    };

    updateCourses((previous) =>
      previous.map((course) =>
        course.id === selectedCourse.id
          ? updatedCourse
          : course
      )
    );

    setSelectedModuleId(module.id);
    setSelectedChapterId(null);

    setExpandedModules((previous) => ({
      ...previous,
      [module.id]: true,
    }));

    setModuleName("");
    setModal(null);
  };

  /* =========================================================
     CHAPTER ACTIONS
  ========================================================= */

  const createChapter = () => {
    if (!chapterName.trim() || !selectedCourse || !selectedModule) {
      return;
    }

    const chapter = {
      id: `chapter-${Date.now()}`,
      title: chapterName.trim(),
      status: "Draft",
      content: [],
    };

    updateCourses((previous) =>
      previous.map((course) => {
        if (course.id !== selectedCourse.id) {
          return course;
        }

        return {
          ...course,

          modules: course.modules.map((module) => {
            if (module.id !== selectedModule.id) {
              return module;
            }

            return {
              ...module,
              chapters: [...module.chapters, chapter],
            };
          }),
        };
      })
    );

    setSelectedChapterId(chapter.id);

    setChapterName("");
    setModal(null);
  };

  /* =========================================================
     CHAPTER TITLE
  ========================================================= */

  const updateChapterTitle = (title) => {
    updateCurrentChapter((chapter) => ({
      ...chapter,
      title,
    }));
  };

  /* =========================================================
     CHAPTER STATUS
  ========================================================= */

  const updateChapterStatus = (status) => {
    updateCurrentChapter((chapter) => ({
      ...chapter,
      status,
    }));
  };

  /* =========================================================
     CONTENT BLOCKS
  ========================================================= */

  const addContentBlock = (type) => {
    if (!selectedChapter) return;

    const defaults = {
      heading: {
        value: "New Heading",
      },

      paragraph: {
        value:
          "Write your lesson content here. Explain the concept clearly and provide useful information for students.",
      },

      list: {
        value:
          "First important point\nSecond important point\nThird important point",
      },

      code: {
        value:
          '// Write your code here\nconsole.log("Hello World");',
      },

      quote: {
        value:
          "Important concept or note that students should remember.",
      },

      image: {
        value: "",
      },

      video: {
        value: "",
      },

      link: {
        value: "",
      },
    };

    const block = {
      id: `block-${Date.now()}-${Math.random()}`,
      type,
      value: defaults[type]?.value || "",
    };

    updateCurrentChapter((chapter) => ({
      ...chapter,

      content: [...(chapter.content || []), block],
    }));

    setShowBlockMenu(false);
  };

  const updateBlock = (blockId, value) => {
    updateCurrentChapter((chapter) => ({
      ...chapter,

      content: (chapter.content || []).map((block) =>
        block.id === blockId
          ? {
              ...block,
              value,
            }
          : block
      ),
    }));
  };

  const deleteBlock = (blockId) => {
    updateCurrentChapter((chapter) => ({
      ...chapter,

      content: (chapter.content || []).filter(
        (block) => block.id !== blockId
      ),
    }));
  };

  /* =========================================================
     DELETE MODULE
  ========================================================= */

  const deleteModule = (moduleId) => {
    if (!selectedCourse) return;

    const updatedModules = selectedCourse.modules.filter(
      (module) => module.id !== moduleId
    );

    updateCourses((previous) =>
      previous.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              modules: updatedModules,
            }
          : course
      )
    );

    if (selectedModuleId === moduleId) {
      const nextModule = updatedModules[0];

      setSelectedModuleId(nextModule?.id || null);
      setSelectedChapterId(
        nextModule?.chapters?.[0]?.id || null
      );
    }
  };

  /* =========================================================
     DELETE CHAPTER
  ========================================================= */

  const deleteChapter = (moduleId, chapterId) => {
    if (!selectedCourse) return;

    updateCourses((previous) =>
      previous.map((course) => {
        if (course.id !== selectedCourse.id) {
          return course;
        }

        return {
          ...course,

          modules: course.modules.map((module) => {
            if (module.id !== moduleId) {
              return module;
            }

            return {
              ...module,

              chapters: module.chapters.filter(
                (chapter) => chapter.id !== chapterId
              ),
            };
          }),
        };
      })
    );

    if (selectedChapterId === chapterId) {
      const module = selectedCourse.modules.find(
        (item) => item.id === moduleId
      );

      const nextChapter = module?.chapters?.find(
        (chapter) => chapter.id !== chapterId
      );

      setSelectedChapterId(nextChapter?.id || null);
    }
  };

  /* =========================================================
     PUBLISH
  ========================================================= */

  const publishCourse = () => {
    if (!selectedCourse) return;

    updateCourses((previous) =>
      previous.map((course) =>
        course.id === selectedCourse.id
          ? {
              ...course,
              status: "Published",
            }
          : course
      )
    );
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =========================================================
     STATS
  ========================================================= */

  const moduleCount = selectedCourse?.modules?.length || 0;

  const chapterCount =
    selectedCourse?.modules?.reduce(
      (total, module) =>
        total + (module.chapters?.length || 0),
      0
    ) || 0;

  const blockCount = selectedChapter?.content?.length || 0;

  const wordCount =
    selectedChapter?.content
      ?.map((block) => block.value || "")
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length || 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#152238]">

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 h-[72px] border-b border-[#e3e9f1] bg-white">

        <div className="flex h-full items-center justify-between px-7">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <button
              onClick={() => window.history.back()}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e3e9f1] bg-white text-[#526984] transition hover:bg-[#f7f9fc] hover:text-[#07111f]"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="h-8 w-px bg-[#e7edf3]" />

            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8aa0b7]">
                Content Studio
              </p>

              <h1 className="mt-0.5 text-[16px] font-black text-[#07111f]">
                Text Course Builder
              </h1>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setActiveMode(
                  activeMode === "editor"
                    ? "preview"
                    : "editor"
                )
              }
              className="flex items-center gap-2 rounded-xl border border-[#e3e9f1] bg-white px-4 py-2.5 text-sm font-bold text-[#526984] transition hover:bg-[#f7f9fc]"
            >
              <Eye size={16} />

              {activeMode === "editor"
                ? "Preview"
                : "Back to Editor"}
            </button>


            <button
              onClick={() => {}}
              className="flex items-center gap-2 rounded-xl border border-[#e3e9f1] bg-white px-4 py-2.5 text-sm font-bold text-[#526984] transition hover:bg-[#f7f9fc]"
            >
              <Save size={16} />

              Save Draft
            </button>


            <button
              onClick={publishCourse}
              className="flex items-center gap-2 rounded-xl bg-[#00d39b] px-5 py-2.5 text-sm font-black text-[#06151b] shadow-lg shadow-[#00d39b]/20 transition hover:bg-[#00c991] cursor-pointer"
            >
              <Send size={15} />

              Publish Course
            </button>

            <button
              onClick={publishCourse}
              className="flex items-center gap-2 rounded-xl bg-[#E6B800] px-5 py-2.5 text-sm font-black text-[#06151b] shadow-lg shadow-[#E6B800]/20 transition hover:bg-[#E6B800] cursor-pointer"
            >
              <Send size={15} />

              Start New Course
            </button>

            <button
              onClick={publishCourse}
              className="flex items-center gap-2 rounded-xl bg-[#581C87] px-5 py-2.5 text-sm font-black text-[#ffffff] shadow-lg shadow-[#581C87]/20 transition hover:bg-[#581C87] cursor-pointer"
            >
              <Send size={15} />

              All Available Courses
            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-[1600px] px-7 py-8">

        {/* ===================================================
            COURSE HEADER
        =================================================== */}

        <div className="mb-7 flex items-end justify-between">

          <div>

            <div className="mb-3 flex items-center gap-2">

              <span className="inline-flex items-center gap-2 rounded-full border border-[#bcefe0] bg-[#e9fbf5] px-3 py-1.5 text-[11px] font-extrabold text-[#00a879]">

                <span className="h-1.5 w-1.5 rounded-full bg-[#00d39b]" />

                Text Course

              </span>


              {selectedCourse?.status && (
                <span
                  className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
                    selectedCourse.status === "Published"
                      ? "bg-[#e9fbf5] text-[#00a879]"
                      : "bg-[#fff7df] text-[#c18a00]"
                  }`}
                >
                  {selectedCourse.status}
                </span>
              )}

            </div>


            <h2 className="text-3xl font-black tracking-tight text-[#07111f]">

              {selectedCourse?.title ||
                "Create your first course"}

            </h2>


            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7890ad]">

              {selectedCourse?.description ||
                "Build structured learning content using modules, chapters and rich content blocks."}

            </p>

          </div>


          {/* STATS */}

          <div className="hidden items-center gap-3 lg:flex">

            <StatCard
              label="Modules"
              value={moduleCount}
            />

            <StatCard
              label="Chapters"
              value={chapterCount}
            />

            <StatCard
              label="Content Blocks"
              value={blockCount}
            />

          </div>

        </div>


        {/* ===================================================
            BUILDER
        =================================================== */}

        {activeMode === "editor" ? (

          <div className="grid min-h-[700px] grid-cols-[320px_minmax(0,1fr)] gap-6">


            {/* =================================================
                LEFT SIDEBAR
            ================================================= */}

            <aside className="overflow-hidden rounded-3xl border border-[#e3e9f1] bg-white shadow-sm">

              {/* SIDEBAR HEADER */}

              <div className="border-b border-[#e9eef4] p-5">

                <div className="mb-4 flex items-start justify-between">

                  <div>

                    <h3 className="font-black text-[#07111f]">
                      Course Content
                    </h3>

                    <p className="mt-1 text-xs text-[#8aa0b7]">
                      Organize your learning material
                    </p>

                  </div>


                  <button
                    onClick={() =>
                      setModal("module")
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#00b987] transition hover:bg-[#d9f8ef]"
                  >
                    <Plus size={17} />
                  </button>

                </div>


                {/* SEARCH */}

                <div className="relative mb-3">

                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0afbf]"
                  />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search courses..."
                    className="w-full rounded-xl border border-[#e3e9f1] bg-[#fbfcfe] py-2.5 pl-9 pr-3 text-xs font-medium text-[#526984] outline-none transition placeholder:text-[#aab7c5] focus:border-[#00d39b]"
                  />

                </div>


                {/* ADD MODULE */}

                <button
                  onClick={() =>
                    selectedCourse
                      ? setModal("module")
                      : setModal("course")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00d39b] px-4 py-3 text-sm font-black text-[#06151b] shadow-md shadow-[#00d39b]/15 transition hover:bg-[#00c991]"
                >
                  <Plus size={17} />

                  Add Module
                </button>

              </div>


              {/* COURSE TREE */}

              <div className="max-h-[620px] overflow-y-auto p-3">

                {filteredCourses.length === 0 && (

                  <div className="px-4 py-10 text-center">

                    <BookOpen
                      size={28}
                      className="mx-auto mb-3 text-[#c4ced9]"
                    />

                    <p className="text-sm font-bold text-[#526984]">
                      No courses found
                    </p>

                  </div>

                )}


                {filteredCourses.map((course) => (

                  <div key={course.id}>

                    {/* COURSE */}

                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id);

                        const firstModule =
                          course.modules?.[0];

                        setSelectedModuleId(
                          firstModule?.id || null
                        );

                        setSelectedChapterId(
                          firstModule?.chapters?.[0]
                            ?.id || null
                        );
                      }}
                      className={`mb-2 flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                        selectedCourseId === course.id
                          ? "border-[#bcefe0] bg-[#e9fbf5]"
                          : "border-transparent hover:bg-[#f7f9fc]"
                      }`}
                    >

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          selectedCourseId === course.id
                            ? "bg-white text-[#00b987]"
                            : "bg-[#f2f5f9] text-[#7890ad]"
                        }`}
                      >
                        <BookOpen size={17} />
                      </div>


                      <div className="min-w-0 flex-1">

                        <p
                          className={`truncate text-sm font-black ${
                            selectedCourseId === course.id
                              ? "text-[#00a879]"
                              : "text-[#152238]"
                          }`}
                        >
                          {course.title}
                        </p>

                        <p className="mt-0.5 text-[10px] font-semibold text-[#8fa1b4]">
                          {course.modules.length} modules
                        </p>

                      </div>

                    </button>


                    {/* MODULES */}

                    {selectedCourseId === course.id && (

                      <div className="ml-3 border-l border-[#e5ebf1] pl-2">

                        {course.modules.map(
                          (module, moduleIndex) => {

                            const isExpanded =
                              expandedModules[
                                module.id
                              ];

                            const isSelected =
                              selectedModuleId ===
                              module.id;

                            return (
                              <div
                                key={module.id}
                                className="mb-1"
                              >

                                {/* MODULE HEADER */}

                                <div
                                  className={`group flex items-center gap-2 rounded-xl px-2 py-2 ${
                                    isSelected
                                      ? "bg-[#f7f9fc]"
                                      : ""
                                  }`}
                                >

                                  <button
                                    onClick={() =>
                                      setExpandedModules(
                                        (previous) => ({
                                          ...previous,
                                          [module.id]:
                                            !isExpanded,
                                        })
                                      )
                                    }
                                    className="text-[#8aa0b7]"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown
                                        size={14}
                                      />
                                    ) : (
                                      <ChevronRight
                                        size={14}
                                      />
                                    )}
                                  </button>


                                  <button
                                    onClick={() => {
                                      setSelectedModuleId(
                                        module.id
                                      );

                                      setSelectedChapterId(
                                        module
                                          .chapters?.[0]
                                          ?.id || null
                                      );
                                    }}
                                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                                  >

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f1f4f8] text-[9px] font-black text-[#7890ad]">
                                      {String(
                                        moduleIndex + 1
                                      ).padStart(2, "0")}
                                    </div>

                                    <div className="min-w-0">

                                      <p className="truncate text-xs font-extrabold text-[#526984]">
                                        {module.title}
                                      </p>

                                      <p className="text-[9px] font-semibold text-[#a1afbd]">
                                        {
                                          module.chapters
                                            .length
                                        }{" "}
                                        chapters
                                      </p>

                                    </div>

                                  </button>


                                  <button
                                    onClick={() =>
                                      deleteModule(
                                        module.id
                                      )
                                    }
                                    className="opacity-0 transition group-hover:opacity-100"
                                  >
                                    <Trash2
                                      size={13}
                                      className="text-[#aab6c3] hover:text-red-500"
                                    />
                                  </button>

                                </div>


                                {/* CHAPTERS */}

                                {isExpanded && (

                                  <div className="ml-8 space-y-1">

                                    {module.chapters.map(
                                      (
                                        chapter,
                                        chapterIndex
                                      ) => {

                                        const selected =
                                          selectedChapterId ===
                                          chapter.id;

                                        return (
                                          <button
                                            key={
                                              chapter.id
                                            }
                                            onClick={() => {
                                              setSelectedModuleId(
                                                module.id
                                              );

                                              setSelectedChapterId(
                                                chapter.id
                                              );
                                            }}
                                            className={`group flex w-full items-center gap-2 rounded-xl px-2 py-2.5 text-left transition ${
                                              selected
                                                ? "bg-[#e9fbf5]"
                                                : "hover:bg-[#f7f9fc]"
                                            }`}
                                          >

                                            <div
                                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                                selected
                                                  ? "bg-white text-[#00b987]"
                                                  : "bg-[#f3f6fa] text-[#9aaaba]"
                                              }`}
                                            >
                                              {selected ? (
                                                <Check
                                                  size={13}
                                                />
                                              ) : (
                                                <span className="text-[9px] font-black">
                                                  {chapterIndex +
                                                    1}
                                                </span>
                                              )}
                                            </div>


                                            <div className="min-w-0 flex-1">

                                              <p
                                                className={`truncate text-[11px] font-bold ${
                                                  selected
                                                    ? "text-[#00a879]"
                                                    : "text-[#526984]"
                                                }`}
                                              >
                                                {
                                                  chapter.title
                                                }
                                              </p>

                                              <p
                                                className={`mt-0.5 text-[9px] font-semibold ${
                                                  chapter.status ===
                                                  "Published"
                                                    ? "text-[#00b987]"
                                                    : "text-[#a0afbf]"
                                                }`}
                                              >
                                                {
                                                  chapter.status
                                                }
                                              </p>

                                            </div>


                                            <span
                                              onClick={(
                                                event
                                              ) => {
                                                event.stopPropagation();

                                                deleteChapter(
                                                  module.id,
                                                  chapter.id
                                                );
                                              }}
                                              className="opacity-0 transition group-hover:opacity-100"
                                            >
                                              <Trash2
                                                size={12}
                                                className="text-[#b0bbc7] hover:text-red-500"
                                              />
                                            </span>

                                          </button>
                                        );
                                      }
                                    )}


                                    {/* ADD CHAPTER */}

                                    <button
                                      onClick={() => {
                                        setSelectedModuleId(
                                          module.id
                                        );

                                        setModal(
                                          "chapter"
                                        );
                                      }}
                                      className="flex w-full items-center gap-2 rounded-xl px-2 py-2.5 text-[10px] font-extrabold text-[#8aa0b7] transition hover:bg-[#f7f9fc] hover:text-[#00a879]"
                                    >
                                      <Plus size={13} />

                                      Add Chapter
                                    </button>

                                  </div>

                                )}

                              </div>
                            );
                          }
                        )}

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </aside>


            {/* =================================================
                EDITOR
            ================================================= */}

            <section className="min-w-0 overflow-hidden rounded-3xl border border-[#e3e9f1] bg-white shadow-sm">

              {/* EDITOR TOP */}

              <div className="flex items-center justify-between border-b border-[#e9eef4] px-7 py-5">

                <div>

                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8aa0b7]">
                    Chapter Editor
                  </p>

                  <h3 className="mt-1 text-lg font-black text-[#07111f]">
                    {selectedChapter?.title ||
                      "Select a chapter"}
                  </h3>

                </div>


                <div className="flex items-center gap-2">

                  {selectedChapter && (
                    <select
                      value={
                        selectedChapter.status
                      }
                      onChange={(event) =>
                        updateChapterStatus(
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-[10px] font-black outline-none ${
                        selectedChapter.status ===
                        "Published"
                          ? "bg-[#e9fbf5] text-[#00a879]"
                          : "bg-[#fff7df] text-[#c18a00]"
                      }`}
                    >
                      <option>Draft</option>
                      <option>Published</option>
                    </select>
                  )}


                  <button
                    onClick={() =>
                      setActiveMode("preview")
                    }
                    disabled={!selectedChapter}
                    className="flex items-center gap-2 rounded-xl border border-[#e3e9f1] px-3 py-2 text-xs font-bold text-[#526984] transition hover:bg-[#f7f9fc] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Eye size={14} />

                    Preview
                  </button>

                </div>

              </div>


              {/* EDITOR BODY */}

              {!selectedChapter ? (

                <EmptyChapterState
                  onCreate={() => {
                    if (selectedModule) {
                      setModal("chapter");
                    } else {
                      setModal("course");
                    }
                  }}
                />

              ) : (

                <div className="mx-auto max-w-[920px] px-10 py-10">

                  {/* BREADCRUMB */}

                  <div className="mb-7 flex items-center gap-2 text-[10px] font-bold text-[#9aabba]">

                    <span>
                      {selectedCourse?.title}
                    </span>

                    <ChevronRight size={12} />

                    <span>
                      {selectedModule?.title}
                    </span>

                    <ChevronRight size={12} />

                    <span className="text-[#526984]">
                      {selectedChapter.title}
                    </span>

                  </div>


                  {/* TITLE */}

                  <div className="mb-10">

                    <div className="mb-3 flex items-center gap-2">

                      <span className="rounded-full bg-[#e9fbf5] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#00a879]">
                        Chapter
                      </span>

                      <span className="text-[10px] font-semibold text-[#9aabba]">
                        {wordCount} words
                      </span>

                    </div>


                    <input
                      value={selectedChapter.title}
                      onChange={(event) =>
                        updateChapterTitle(
                          event.target.value
                        )
                      }
                      placeholder="Chapter title..."
                      className="w-full border-none bg-transparent text-4xl font-black tracking-tight text-[#07111f] outline-none placeholder:text-[#c1ccd8]"
                    />


                    <p className="mt-3 text-sm leading-6 text-[#8aa0b7]">
                      Create a clear and engaging lesson
                      for your students.
                    </p>

                  </div>


                  {/* CONTENT */}

                  <div className="space-y-4">

                    {selectedChapter.content?.length ===
                      0 && (

                      <div className="rounded-3xl border border-dashed border-[#cdd8e4] bg-[#fbfcfe] px-8 py-16 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9fbf5] text-[#00b987]">
                          <FileText size={24} />
                        </div>

                        <h3 className="text-sm font-black text-[#152238]">
                          Start writing your chapter
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#8aa0b7]">
                          Add headings, paragraphs, code,
                          lists, quotes, images and more to
                          build your lesson.
                        </p>

                      </div>

                    )}


                    {selectedChapter.content?.map(
                      (block, index) => (

                        <ContentBlock
                          key={block.id}
                          block={block}
                          index={index}
                          onChange={(value) =>
                            updateBlock(
                              block.id,
                              value
                            )
                          }
                          onDelete={() =>
                            deleteBlock(block.id)
                          }
                        />

                      )
                    )}

                  </div>


                  {/* ADD CONTENT */}

                  <div className="relative mt-6">

                    {showBlockMenu && (

                      <div className="absolute bottom-full left-0 z-30 mb-3 w-[360px] rounded-2xl border border-[#e3e9f1] bg-white p-2 shadow-xl shadow-[#07111f]/10">

                        <div className="mb-2 px-3 py-2">

                          <p className="text-xs font-black text-[#152238]">
                            Add Content
                          </p>

                          <p className="mt-1 text-[10px] text-[#8aa0b7]">
                            Choose a content block
                          </p>

                        </div>


                        <div className="grid grid-cols-2 gap-1">

                          <BlockMenuButton
                            icon={<Type size={17} />}
                            title="Heading"
                            description="Section heading"
                            onClick={() =>
                              addContentBlock(
                                "heading"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={
                              <FileText size={17} />
                            }
                            title="Paragraph"
                            description="Normal text"
                            onClick={() =>
                              addContentBlock(
                                "paragraph"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={<List size={17} />}
                            title="List"
                            description="Bullet points"
                            onClick={() =>
                              addContentBlock(
                                "list"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={<Code2 size={17} />}
                            title="Code"
                            description="Code snippet"
                            onClick={() =>
                              addContentBlock(
                                "code"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={<Quote size={17} />}
                            title="Quote"
                            description="Important note"
                            onClick={() =>
                              addContentBlock(
                                "quote"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={
                              <ImageIcon size={17} />
                            }
                            title="Image"
                            description="Add image"
                            onClick={() =>
                              addContentBlock(
                                "image"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={<Video size={17} />}
                            title="Video"
                            description="Video lesson"
                            onClick={() =>
                              addContentBlock(
                                "video"
                              )
                            }
                          />

                          <BlockMenuButton
                            icon={<Link2 size={17} />}
                            title="Link"
                            description="External link"
                            onClick={() =>
                              addContentBlock(
                                "link"
                              )
                            }
                          />

                        </div>

                      </div>

                    )}


                    <button
                      onClick={() =>
                        setShowBlockMenu(
                          (previous) => !previous
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#cdd8e4] bg-white py-5 text-sm font-black text-[#7890ad] transition hover:border-[#00d39b] hover:bg-[#e9fbf5] hover:text-[#00a879]"
                    >
                      <Plus size={18} />

                      Add Content Block
                    </button>

                  </div>


                  {/* BOTTOM */}

                  <div className="mt-8 flex items-center justify-between border-t border-[#edf1f5] pt-6">

                    <div className="flex items-center gap-4 text-[10px] font-semibold text-[#9aabba]">

                      <span>
                        {blockCount} blocks
                      </span>

                      <span>
                        {wordCount} words
                      </span>

                    </div>


                    <button
                      onClick={() => {}}
                      className="flex items-center gap-2 rounded-xl bg-[#07111f] px-6 py-3 text-sm font-black text-white transition hover:bg-[#101e31]"
                    >
                      <Save size={15} />

                      Save Chapter
                    </button>

                  </div>

                </div>

              )}

            </section>

          </div>

        ) : (

          /* =================================================
             PREVIEW MODE
          ================================================= */

          <PreviewMode
            course={selectedCourse}
            module={selectedModule}
            chapter={selectedChapter}
            onBack={() => setActiveMode("editor")}
          />

        )}

      </main>


      {/* =====================================================
          MODALS
      ===================================================== */}

      {modal && (

        <Modal
          onClose={() => setModal(null)}
        >

          {/* CREATE COURSE */}

          {modal === "course" && (

            <div>

              <ModalHeader
                icon={<BookOpen size={20} />}
                title="Create New Course"
                description="Create a new text-based learning course."
                onClose={() =>
                  setModal(null)
                }
              />


              <div className="space-y-5">

                <FormInput
                  label="Course Title"
                  placeholder="e.g. Complete JavaScript Mastery"
                  value={courseForm.title}
                  onChange={(event) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        title: event.target.value,
                      })
                    )
                  }
                />


                <FormTextarea
                  label="Description"
                  placeholder="Describe what students will learn..."
                  value={courseForm.description}
                  onChange={(event) =>
                    setCourseForm(
                      (previous) => ({
                        ...previous,
                        description:
                          event.target.value,
                      })
                    )
                  }
                />


                <div className="grid grid-cols-2 gap-4">

                  <FormSelect
                    label="Category"
                    value={courseForm.category}
                    onChange={(event) =>
                      setCourseForm(
                        (previous) => ({
                          ...previous,
                          category:
                            event.target.value,
                        })
                      )
                    }
                    options={[
                      "Programming",
                      "DevOps",
                      "Cloud",
                      "Cyber Security",
                      "Databases",
                      "Other",
                    ]}
                  />

                  <FormSelect
                    label="Level"
                    value={courseForm.level}
                    onChange={(event) =>
                      setCourseForm(
                        (previous) => ({
                          ...previous,
                          level:
                            event.target.value,
                        })
                      )
                    }
                    options={[
                      "Beginner",
                      "Intermediate",
                      "Advanced",
                    ]}
                  />

                </div>


                <ModalFooter
                  onCancel={() =>
                    setModal(null)
                  }
                  onConfirm={createCourse}
                  confirmText="Create Course"
                />

              </div>

            </div>

          )}


          {/* CREATE MODULE */}

          {modal === "module" && (

            <div>

              <ModalHeader
                icon={<Layers3 size={20} />}
                title="Add New Module"
                description="Create a section to organize your chapters."
                onClose={() =>
                  setModal(null)
                }
              />


              <FormInput
                label="Module Name"
                placeholder="e.g. JavaScript Fundamentals"
                value={moduleName}
                onChange={(event) =>
                  setModuleName(
                    event.target.value
                  )
                }
              />


              <ModalFooter
                onCancel={() =>
                  setModal(null)
                }
                onConfirm={createModule}
                confirmText="Add Module"
              />

            </div>

          )}


          {/* CREATE CHAPTER */}

          {modal === "chapter" && (

            <div>

              <ModalHeader
                icon={<FileText size={20} />}
                title="Add New Chapter"
                description={`Add a chapter to ${
                  selectedModule?.title ||
                  "this module"
                }.`}
                onClose={() =>
                  setModal(null)
                }
              />


              <FormInput
                label="Chapter Name"
                placeholder="e.g. Understanding Variables"
                value={chapterName}
                onChange={(event) =>
                  setChapterName(
                    event.target.value
                  )
                }
              />


              <ModalFooter
                onCancel={() =>
                  setModal(null)
                }
                onConfirm={createChapter}
                confirmText="Add Chapter"
              />

            </div>

          )}

        </Modal>

      )}

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value }) {
  return (
    <div className="min-w-[115px] rounded-2xl border border-[#e3e9f1] bg-white px-5 py-3 shadow-sm">

      <p className="text-[10px] font-bold text-[#8aa0b7]">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-[#07111f]">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   CONTENT BLOCK
========================================================= */

function ContentBlock({
  block,
  index,
  onChange,
  onDelete,
}) {
  const config = {
    heading: {
      label: "Heading",
      icon: <Type size={14} />,
    },

    paragraph: {
      label: "Paragraph",
      icon: <FileText size={14} />,
    },

    list: {
      label: "List",
      icon: <List size={14} />,
    },

    code: {
      label: "Code",
      icon: <Code2 size={14} />,
    },

    quote: {
      label: "Quote",
      icon: <Quote size={14} />,
    },

    image: {
      label: "Image",
      icon: <ImageIcon size={14} />,
    },

    video: {
      label: "Video",
      icon: <Video size={14} />,
    },

    link: {
      label: "Link",
      icon: <Link2 size={14} />,
    },
  };

  const current = config[block.type] || {
    label: block.type,
    icon: <FileText size={14} />,
  };

  return (
    <div className="group rounded-2xl border border-[#e4eaf1] bg-[#fbfcfe] p-5 transition hover:border-[#d5dee8]">

      {/* HEADER */}

      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <GripVertical
            size={15}
            className="cursor-grab text-[#bdc8d4]"
          />

          <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#7890ad] shadow-sm">

            {current.icon}

            {current.label}

          </div>

          <span className="text-[9px] font-semibold text-[#b1bdca]">
            Block {index + 1}
          </span>

        </div>


        <button
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#b1bdc9] opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>

      </div>


      {/* HEADING */}

      {block.type === "heading" && (

        <input
          value={block.value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="Section heading..."
          className="w-full bg-transparent text-2xl font-black text-[#07111f] outline-none placeholder:text-[#bdc8d4]"
        />

      )}


      {/* PARAGRAPH */}

      {block.type === "paragraph" && (

        <textarea
          value={block.value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          rows={5}
          placeholder="Write your lesson content..."
          className="w-full resize-none bg-transparent text-[15px] leading-7 text-[#526984] outline-none placeholder:text-[#aebbc9]"
        />

      )}


      {/* LIST */}

      {block.type === "list" && (

        <div className="space-y-2">

          <p className="mb-3 text-[10px] font-bold text-[#9aabba]">
            Enter one item per line
          </p>

          <textarea
            value={block.value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            rows={5}
            placeholder={"First point\nSecond point\nThird point"}
            className="w-full resize-none bg-transparent text-[15px] leading-7 text-[#526984] outline-none placeholder:text-[#aebbc9]"
          />

        </div>

      )}


      {/* CODE */}

      {block.type === "code" && (

        <div className="overflow-hidden rounded-xl border border-[#dce4eb] bg-[#07111f]">

          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">

            <span className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
            <span className="h-2 w-2 rounded-full bg-[#ffd166]" />
            <span className="h-2 w-2 rounded-full bg-[#00d39b]" />

            <span className="ml-2 text-[9px] font-bold text-white/40">
              code
            </span>

          </div>


          <textarea
            value={block.value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            rows={8}
            spellCheck={false}
            className="w-full resize-none bg-transparent p-5 font-mono text-sm leading-7 text-[#00d39b] outline-none placeholder:text-white/20"
          />

        </div>

      )}


      {/* QUOTE */}

      {block.type === "quote" && (

        <div className="rounded-xl border-l-4 border-[#00d39b] bg-white px-5 py-4">

          <textarea
            value={block.value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            rows={3}
            placeholder="Important note..."
            className="w-full resize-none bg-transparent text-[15px] font-medium italic leading-7 text-[#526984] outline-none placeholder:text-[#aebbc9]"
          />

        </div>

      )}


      {/* IMAGE */}

      {block.type === "image" && (

        <div>

          <div className="mb-3 flex h-40 items-center justify-center rounded-xl border border-dashed border-[#cdd8e4] bg-white">

            <div className="text-center">

              <ImageIcon
                size={25}
                className="mx-auto mb-2 text-[#a7b5c4]"
              />

              <p className="text-xs font-bold text-[#7890ad]">
                Add an image URL
              </p>

            </div>

          </div>

          <input
            value={block.value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-[#e3e9f1] bg-white px-4 py-3 text-sm text-[#526984] outline-none focus:border-[#00d39b]"
          />

        </div>

      )}


      {/* VIDEO */}

      {block.type === "video" && (

        <div>

          <div className="mb-3 flex h-40 items-center justify-center rounded-xl border border-dashed border-[#cdd8e4] bg-white">

            <div className="text-center">

              <Video
                size={25}
                className="mx-auto mb-2 text-[#a7b5c4]"
              />

              <p className="text-xs font-bold text-[#7890ad]">
                Add video URL
              </p>

            </div>

          </div>

          <input
            value={block.value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            placeholder="YouTube / video URL"
            className="w-full rounded-xl border border-[#e3e9f1] bg-white px-4 py-3 text-sm text-[#526984] outline-none focus:border-[#00d39b]"
          />

        </div>

      )}


      {/* LINK */}

      {block.type === "link" && (

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#00b987]">
            <Link2 size={18} />
          </div>

          <input
            value={block.value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            placeholder="https://example.com"
            className="w-full rounded-xl border border-[#e3e9f1] bg-white px-4 py-3 text-sm text-[#526984] outline-none focus:border-[#00d39b]"
          />

        </div>

      )}

    </div>
  );
}


/* =========================================================
   BLOCK MENU BUTTON
========================================================= */

function BlockMenuButton({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#e9fbf5]"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f6fa] text-[#7890ad]">
        {icon}
      </div>

      <div>

        <p className="text-[11px] font-black text-[#152238]">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] font-medium text-[#9aabba]">
          {description}
        </p>

      </div>

    </button>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyChapterState({ onCreate }) {
  return (
    <div className="flex min-h-[650px] items-center justify-center px-8">

      <div className="text-center">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9fbf5] text-[#00b987]">
          <FileText size={28} />
        </div>

        <h3 className="text-lg font-black text-[#07111f]">
          No chapter selected
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8aa0b7]">
          Select a chapter from the course structure or
          create a new one to start writing.
        </p>

        <button
          onClick={onCreate}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00d39b] px-5 py-3 text-sm font-black text-[#06151b] shadow-lg shadow-[#00d39b]/15"
        >
          <Plus size={17} />

          Create Chapter
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   PREVIEW
========================================================= */

function PreviewMode({
  course,
  module,
  chapter,
  onBack,
}) {
  if (!chapter) {
    return (
      <div className="rounded-3xl border border-[#e3e9f1] bg-white p-20 text-center">
        <p className="font-bold text-[#7890ad]">
          Select a chapter to preview.
        </p>

        <button
          onClick={onBack}
          className="mt-5 rounded-xl bg-[#07111f] px-5 py-3 text-sm font-bold text-white"
        >
          Back to Editor
        </button>
      </div>
    );
  }

  return (
    <div>

      {/* PREVIEW BAR */}

      <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#e3e9f1] bg-white px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#00b987]">
            <Eye size={17} />
          </div>

          <div>

            <p className="text-xs font-black text-[#07111f]">
              Student Preview
            </p>

            <p className="text-[10px] text-[#8aa0b7]">
              This is how the chapter will appear to students.
            </p>

          </div>

        </div>


        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-[#e3e9f1] px-4 py-2.5 text-xs font-bold text-[#526984]"
        >
          <ArrowLeft size={14} />

          Back to Editor
        </button>

      </div>


      {/* ARTICLE */}

      <article className="mx-auto max-w-[900px] rounded-3xl border border-[#e3e9f1] bg-white px-10 py-12 shadow-sm">

        {/* COURSE */}

        <div className="mb-10">

          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold text-[#8aa0b7]">

            <span>{course?.title}</span>

            <ChevronRight size={12} />

            <span>{module?.title}</span>

          </div>


          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e9fbf5] px-3 py-1.5 text-[10px] font-black text-[#00a879]">

            <CircleCheck size={13} />

            {chapter.status}

          </div>


          <h1 className="text-5xl font-black tracking-tight text-[#07111f]">
            {chapter.title}
          </h1>

        </div>


        {/* CONTENT */}

        <div className="space-y-7">

          {chapter.content?.map((block) => {

            if (block.type === "heading") {
              return (
                <h2
                  key={block.id}
                  className="pt-4 text-2xl font-black text-[#07111f]"
                >
                  {block.value}
                </h2>
              );
            }


            if (block.type === "paragraph") {
              return (
                <p
                  key={block.id}
                  className="text-[16px] leading-8 text-[#526984]"
                >
                  {block.value}
                </p>
              );
            }


            if (block.type === "list") {
              return (
                <ul
                  key={block.id}
                  className="space-y-3 pl-6 text-[15px] leading-7 text-[#526984]"
                >
                  {block.value
                    .split("\n")
                    .filter(Boolean)
                    .map((item, index) => (
                      <li
                        key={index}
                        className="list-disc"
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              );
            }


            if (block.type === "code") {
              return (
                <pre
                  key={block.id}
                  className="overflow-x-auto rounded-2xl bg-[#07111f] p-6 font-mono text-sm leading-7 text-[#00d39b]"
                >
                  {block.value}
                </pre>
              );
            }


            if (block.type === "quote") {
              return (
                <blockquote
                  key={block.id}
                  className="rounded-r-xl border-l-4 border-[#00d39b] bg-[#e9fbf5] px-6 py-5 text-[15px] font-medium italic leading-7 text-[#526984]"
                >
                  {block.value}
                </blockquote>
              );
            }


            if (
              block.type === "image" &&
              block.value
            ) {
              return (
                <img
                  key={block.id}
                  src={block.value}
                  alt=""
                  className="w-full rounded-2xl border border-[#e3e9f1]"
                />
              );
            }


            if (
              block.type === "video" &&
              block.value
            ) {
              return (
                <div
                  key={block.id}
                  className="rounded-2xl border border-[#e3e9f1] bg-[#f7f9fc] p-8 text-center"
                >
                  <Video
                    size={30}
                    className="mx-auto mb-3 text-[#00b987]"
                  />

                  <p className="text-sm font-bold text-[#526984]">
                    Video Lesson
                  </p>

                  <a
                    href={block.value}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block truncate text-xs text-[#00a879]"
                  >
                    {block.value}
                  </a>
                </div>
              );
            }


            if (
              block.type === "link" &&
              block.value
            ) {
              return (
                <a
                  key={block.id}
                  href={block.value}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#bcefe0] bg-[#e9fbf5] p-4 text-sm font-bold text-[#00a879]"
                >
                  <Link2 size={17} />

                  {block.value}

                  <ArrowRight
                    size={15}
                    className="ml-auto"
                  />
                </a>
              );
            }


            return null;
          })}

        </div>

      </article>

    </div>
  );
}


/* =========================================================
   MODAL
========================================================= */

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07111f]/30 p-5 backdrop-blur-sm">

      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className="w-full max-w-[520px] rounded-3xl border border-[#e3e9f1] bg-white p-6 shadow-2xl shadow-[#07111f]/15"
      >
        {children}
      </div>

    </div>
  );
}


/* =========================================================
   MODAL HEADER
========================================================= */

function ModalHeader({
  icon,
  title,
  description,
  onClose,
}) {
  return (
    <div className="mb-7 flex items-start justify-between">

      <div className="flex gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#00b987]">
          {icon}
        </div>

        <div>

          <h2 className="text-lg font-black text-[#07111f]">
            {title}
          </h2>

          <p className="mt-1 max-w-[360px] text-xs leading-5 text-[#8aa0b7]">
            {description}
          </p>

        </div>

      </div>


      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9aabba] transition hover:bg-[#f7f9fc] hover:text-[#526984]"
      >
        <X size={17} />
      </button>

    </div>
  );
}


/* =========================================================
   MODAL FOOTER
========================================================= */

function ModalFooter({
  onCancel,
  onConfirm,
  confirmText,
}) {
  return (
    <div className="mt-7 flex justify-end gap-3 border-t border-[#edf1f5] pt-5">

      <button
        onClick={onCancel}
        className="rounded-xl border border-[#e3e9f1] px-5 py-2.5 text-sm font-bold text-[#526984] transition hover:bg-[#f7f9fc]"
      >
        Cancel
      </button>


      <button
        onClick={onConfirm}
        className="flex items-center gap-2 rounded-xl bg-[#00d39b] px-5 py-2.5 text-sm font-black text-[#06151b] shadow-md shadow-[#00d39b]/15 transition hover:bg-[#00c991]"
      >
        <Check size={15} />

        {confirmText}
      </button>

    </div>
  );
}


/* =========================================================
   FORM INPUT
========================================================= */

function FormInput({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-extrabold text-[#526984]">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3 text-sm font-medium text-[#526984] outline-none transition placeholder:text-[#abb8c5] focus:border-[#00d39b] focus:bg-white"
      />

    </div>
  );
}


/* =========================================================
   FORM TEXTAREA
========================================================= */

function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-extrabold text-[#526984]">
        {label}
      </label>

      <textarea
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3 text-sm font-medium leading-6 text-[#526984] outline-none transition placeholder:text-[#abb8c5] focus:border-[#00d39b] focus:bg-white"
      />

    </div>
  );
}


/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-extrabold text-[#526984]">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#e3e9f1] bg-[#fbfcfe] px-4 py-3 text-sm font-bold text-[#526984] outline-none focus:border-[#00d39b]"
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}