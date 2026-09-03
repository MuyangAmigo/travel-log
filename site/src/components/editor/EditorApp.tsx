"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from "react";
import TripDocumentRenderer from "@/components/TripDocumentRenderer";
import {
  EditorApi,
  EditorApiError,
  type EditorPublishResult,
  type EditorTripSnapshot,
  type EditorTripSummary,
} from "@/lib/editor-api";
import {
  addUploadedImage,
  cloneDocument,
  collectChangedLocalizedPaths,
  createBlock,
  createEditorId,
  createPage,
  detachImage,
  duplicateBlock,
  duplicatePage,
  editorDraftStorageKey,
  getEditorDraftRecovery,
  isEditorOperationCurrent,
  moveItem,
  parseStoredEditorDraft,
  referencedImageIds,
  type EditorDraftRecovery,
} from "@/lib/editor-state";
import {
  MICROSOFT_AUTH_SESSION_STORAGE_KEY,
  startMicrosoftAuthentication,
} from "@/lib/microsoft-auth";
import {
  isLocalEditorPreviewEnabled,
  TRAVEL_JOURNAL_EDIT_SCOPE,
} from "@/lib/microsoft-auth-policy";
import {
  parseTripDocument,
  validateTripDocument,
  type LocalizedText,
  type TripBlock,
  type TripDocument,
  type TripDocumentPage,
  type TripImageAsset,
} from "@/lib/trip-document";
import BlockEditor, {
  BLOCK_LABELS,
  BLOCK_TYPES,
} from "./BlockEditor";

type EditorSession = {
  accessToken: string;
  delegatedScope: string;
  expiresAt: number;
};

type InspectorTab = "metadata" | "block" | "images";
type PreviewViewport = "desktop" | "tablet" | "mobile";
type DragTarget = { kind: "page"; id: string };

function parseEditorSession(value: string | null): EditorSession | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<EditorSession>;
    if (
      typeof parsed.accessToken !== "string" ||
      parsed.accessToken.length < 20 ||
      parsed.delegatedScope !== TRAVEL_JOURNAL_EDIT_SCOPE ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= Date.now() + 30_000
    ) {
      return null;
    }
    return parsed as EditorSession;
  } catch {
    return null;
  }
}

function imageUrl(slug: string, filename: string): string {
  return `https://junjieblob.blob.core.windows.net/images/travel/${encodeURIComponent(
    slug
  )}/${encodeURIComponent(filename)}`;
}

function withZh(value: LocalizedText, zh: string): LocalizedText {
  return { ...value, zh };
}

function blockSummary(block: TripBlock): string {
  switch (block.type) {
    case "cover":
    case "header":
    case "note":
    case "highlight":
    case "rating":
    case "ending":
      return block.title.zh;
    case "prose":
      return block.paragraphs[0]?.zh ?? BLOCK_LABELS[block.type];
    case "gallery":
      return `${block.images.length} 张图片`;
    case "timeline":
      return `${block.items.length} 个时间点`;
    case "route":
      return `${block.stops.length} 个地点`;
    case "shopping":
      return `${block.products.length} 件物品`;
    case "expense":
      return block.title?.zh ?? `${block.rows.length} 条花费`;
    case "tags":
      return block.items.map((item) => item.label.zh).join(" · ");
    case "stamp":
      return block.text.zh;
    case "divider":
      return block.icon;
    case "spacer":
      return "留白";
  }
}

function pageSummary(page: TripDocumentPage, index: number): string {
  const lead = page.blocks[0];
  return lead
    ? `第 ${index + 1} 页 · ${blockSummary(lead)}`
    : `第 ${index + 1} 页`;
}

function errorMessage(error: unknown): string {
  if (error instanceof EditorApiError) {
    if (error.code === "editor_service_not_configured") {
      return "编辑服务配置不完整，请联系站点维护者。";
    }
    return error.message;
  }
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "无法连接编辑服务，请稍后重试。";
  }
  return error instanceof Error ? error.message : "操作没有完成，请稍后重试。";
}

function ActionButtons({
  label,
  index,
  length,
  onMove,
  onDuplicate,
  onRemove,
  removeDisabled = false,
}: {
  label: string;
  index: number;
  length: number;
  onMove: (index: number) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  removeDisabled?: boolean;
}) {
  return (
    <span className="editor-tree-actions">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMove(index - 1);
        }}
        disabled={index === 0}
        aria-label={`上移${label}`}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMove(index + 1);
        }}
        disabled={index === length - 1}
        aria-label={`下移${label}`}
      >
        ↓
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDuplicate();
        }}
        aria-label={`复制${label}`}
      >
        ⧉
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        disabled={removeDisabled}
        aria-label={`移除${label}`}
      >
        ×
      </button>
    </span>
  );
}

function ApprovalDialog({
  document,
  localPreview,
  publishing,
  onClose,
  onPublish,
}: {
  document: TripDocument;
  localPreview: boolean;
  publishing: boolean;
  onClose: () => void;
  onPublish: () => void;
}) {
  const [approved, setApproved] = useState(false);
  const issues = validateTripDocument(document);

  return (
    <div className="editor-dialog-backdrop" role="presentation">
      <section
        className="editor-approval-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="approval-title"
      >
        <header>
          <div>
            <p className="editor-eyebrow">BILINGUAL APPROVAL</p>
            <h2 id="approval-title">发布前双语审批</h2>
            <p>逐页核对中文与英文。此预览只读，不会自动发布。</p>
          </div>
          <button type="button" className="editor-icon-button" onClick={onClose}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">关闭审批预览</span>
          </button>
        </header>
        {issues.length > 0 && (
          <div className="editor-alert error" role="alert">
            <strong>文档还不能发布。</strong>
            <ul>
              {issues.slice(0, 8).map((issue) => (
                <li key={`${issue.path}-${issue.message}`}>
                  {issue.path}: {issue.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="editor-bilingual-preview">
          {(["zh", "en"] as const).map((locale) => (
            <article key={locale}>
              <h3>{locale === "zh" ? "中文" : "English"}</h3>
              <div className="editor-approval-scroll">
                <div className="trip-content">
                  <TripDocumentRenderer
                    document={document}
                    locale={locale}
                    imageUrl={(filename) => imageUrl(document.slug, filename)}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        <footer>
          <label className="editor-confirmation">
            <input
              type="checkbox"
              checked={approved}
              onChange={(event) => setApproved(event.target.checked)}
            />
            <span>
              {localPreview
                ? "我已核对中文与英文预览，并确认保存到本地预览会话。此操作不会写入 main。"
                : "我已核对中文与英文预览，并确认将此版本直接发布到 main。"}
            </span>
          </label>
          <div>
            <button type="button" className="editor-button secondary" onClick={onClose}>
              返回修改
            </button>
            <button
              type="button"
              className="editor-button primary"
              onClick={onPublish}
              disabled={!approved || publishing || issues.length > 0}
            >
              {publishing
                ? localPreview
                  ? "正在保存…"
                  : "正在发布…"
                : localPreview
                  ? "保存预览"
                  : "确认发布"}
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default function EditorApp() {
  const localPreview = isLocalEditorPreviewEnabled({
    flag: process.env.NEXT_PUBLIC_TRAVEL_LOG_EDITOR_PREVIEW,
    hostname: typeof window === "undefined" ? "" : window.location.hostname,
    nodeEnv: process.env.NODE_ENV,
  });
  const [session, setSession] = useState<EditorSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [trips, setTrips] = useState<EditorTripSummary[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [snapshot, setSnapshot] = useState<EditorTripSnapshot | null>(null);
  const [original, setOriginal] = useState<TripDocument | null>(null);
  const [translationBaseline, setTranslationBaseline] =
    useState<TripDocument | null>(null);
  const [document, setDocument] = useState<TripDocument | null>(null);
  const [recoverable, setRecoverable] =
    useState<EditorDraftRecovery | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("metadata");
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [newBlockType, setNewBlockType] =
    useState<TripBlock["type"]>("prose");
  const [busy, setBusy] = useState<"load" | "translate" | "upload" | "publish" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [publishResult, setPublishResult] = useState<EditorPublishResult | null>(
    null
  );
  const [dragTarget, setDragTarget] = useState<DragTarget | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const activeOperationRef = useRef<symbol | null>(null);
  const documentRef = useRef<TripDocument | null>(null);
  const documentRevisionRef = useRef(0);

  const beginOperation = useCallback(
    (kind: NonNullable<typeof busy>): symbol | null => {
      if (activeOperationRef.current) return null;
      const token = Symbol(kind);
      activeOperationRef.current = token;
      setBusy(kind);
      return token;
    },
    []
  );

  const finishOperation = useCallback((token: symbol) => {
    if (activeOperationRef.current !== token) return;
    activeOperationRef.current = null;
    setBusy(null);
  }, []);

  const dirty = useMemo(
    () =>
      Boolean(
        document &&
          original &&
          JSON.stringify(document) !== JSON.stringify(original)
      ),
    [document, original]
  );

  const signOut = useCallback(() => {
    if (localPreview) {
      setNotice("本地预览模式不需要退出登录。");
      return;
    }
    window.sessionStorage.removeItem(MICROSOFT_AUTH_SESSION_STORAGE_KEY);
    setSession(null);
    setTrips([]);
    setSnapshot(null);
    setDocument(null);
    setOriginal(null);
    setTranslationBaseline(null);
    setError("编辑会话已失效，请重新使用 Microsoft 登录。");
  }, [localPreview]);

  const api = useMemo(
    () => (session ? new EditorApi(session.accessToken, signOut) : null),
    [session, signOut]
  );

  const selectedPage = useMemo(
    () => document?.pages.find((page) => page.id === selectedPageId) ?? null,
    [document, selectedPageId]
  );
  const selectedTrip = useMemo(
    () => trips.find((trip) => trip.slug === document?.slug) ?? null,
    [document?.slug, trips]
  );
  const tripPickerPlaceholder = loadingTrips
    ? "正在载入旅程…"
    : trips.length === 0
      ? error
        ? "旅程载入失败"
        : "没有已登记旅程"
      : "选择已登记旅程";

  useEffect(() => {
    documentRef.current = document;
    documentRevisionRef.current += 1;
  }, [document]);

  useEffect(() => {
    if (localPreview) {
      setSession({
        accessToken: "local-editor-preview-token",
        delegatedScope: TRAVEL_JOURNAL_EDIT_SCOPE,
        expiresAt: Number.MAX_SAFE_INTEGER,
      });
      setNotice("本地预览模式：所有发布仅保存在内存中，不会写入 GitHub。");
      setCheckingSession(false);
      return;
    }
    const stored = parseEditorSession(
      window.sessionStorage.getItem(MICROSOFT_AUTH_SESSION_STORAGE_KEY)
    );
    if (!stored) {
      window.sessionStorage.removeItem(MICROSOFT_AUTH_SESSION_STORAGE_KEY);
    }
    setSession(stored);
    setCheckingSession(false);
  }, [localPreview]);

  useEffect(() => {
    if (!api) return;
    let active = true;
    setLoadingTrips(true);
    setError(null);
    api
      .listTrips()
      .then((result) => {
        if (active) setTrips(result.trips);
      })
      .catch((caught) => {
        if (active) setError(errorMessage(caught));
      })
      .finally(() => {
        if (active) setLoadingTrips(false);
      });
    return () => {
      active = false;
    };
  }, [api]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (!snapshot || !document || !dirty) return;
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(
        editorDraftStorageKey(document.slug),
        JSON.stringify({
          baseSha: snapshot.baseSha,
          baseBlobSha: snapshot.blobSha,
          document,
          savedAt: Date.now(),
        })
      );
    }, 250);
    return () => window.clearTimeout(timer);
  }, [dirty, document, snapshot]);

  const replaceDocument = useCallback(
    (mutate: (next: TripDocument) => void) => {
      setDocument((current) => {
        if (!current) return current;
        const next = cloneDocument(current);
        mutate(next);
        return next;
      });
      setNotice(null);
      setPublishResult(null);
    },
    []
  );

  const loadTrip = useCallback(
    async (slug: string) => {
      if (!api) return;
      if (
        dirty &&
        !window.confirm("当前旅程有尚未发布的修改。切换后仍可从本标签页恢复，确定继续吗？")
      ) {
        return;
      }
      const operation = beginOperation("load");
      if (!operation) return;
      setError(null);
      setNotice(null);
      setPublishResult(null);
      setApprovalOpen(false);
      try {
        const loaded = await api.loadTrip(slug);
        const loadedDocument = parseTripDocument(loaded.document);
        setSnapshot(loaded);
        setOriginal(loadedDocument);
        setTranslationBaseline(loadedDocument);
        setDocument(loadedDocument);
        setSelectedPageId(loadedDocument.pages[0].id);
        setInspectorTab("metadata");
        const stored = parseStoredEditorDraft(
          window.sessionStorage.getItem(editorDraftStorageKey(slug)),
          slug
        );
        setRecoverable(
          getEditorDraftRecovery(stored, loadedDocument, loaded.blobSha)
        );
      } catch (caught) {
        setError(errorMessage(caught));
      } finally {
        finishOperation(operation);
      }
    },
    [api, beginOperation, dirty, finishOperation]
  );

  const selectPage = (page: TripDocumentPage) => {
    setSelectedPageId(page.id);
    setInspectorTab("block");
  };

  const updateBlock = (updated: TripBlock) => {
    if (!selectedPageId) return;
    replaceDocument((next) => {
      const page = next.pages.find((candidate) => candidate.id === selectedPageId);
      if (!page) return;
      const index = page.blocks.findIndex((block) => block.id === updated.id);
      if (index >= 0) page.blocks[index] = updated;
    });
  };

  const movePage = (index: number, nextIndex: number) => {
    replaceDocument((next) => {
      next.pages = moveItem(next.pages, index, nextIndex);
    });
  };

  const moveBlock = (index: number, nextIndex: number) => {
    if (!selectedPageId) return;
    replaceDocument((next) => {
      const page = next.pages.find((candidate) => candidate.id === selectedPageId);
      if (page) page.blocks = moveItem(page.blocks, index, nextIndex);
    });
  };

  const moveBlockToPage = (blockId: string, targetPageId: string) => {
    if (!selectedPageId || targetPageId === selectedPageId) return;
    replaceDocument((next) => {
      const sourcePage = next.pages.find((page) => page.id === selectedPageId);
      const targetPage = next.pages.find((page) => page.id === targetPageId);
      if (!sourcePage || !targetPage) return;
      const sourceIndex = sourcePage.blocks.findIndex(
        (block) => block.id === blockId
      );
      if (sourceIndex < 0) return;
      const [block] = sourcePage.blocks.splice(sourceIndex, 1);
      if (!block) return;
      if (sourcePage.blocks.length === 0) {
        sourcePage.blocks.push({
          id: createEditorId("spacer"),
          type: "spacer",
        });
      }
      targetPage.blocks.push(block);
    });
    setSelectedPageId(targetPageId);
    setInspectorTab("block");
  };

  const addPage = () => {
    if (!document) return;
    const sectionId = selectedPage?.sectionId ?? document.sections[0].id;
    const page = createPage(sectionId, document.images[0].id);
    replaceDocument((next) => {
      const index = selectedPage
        ? next.pages.findIndex((candidate) => candidate.id === selectedPage.id) + 1
        : next.pages.length;
      next.pages.splice(index, 0, page);
    });
    selectPage(page);
  };

  const removePage = (page: TripDocumentPage) => {
    if (!document || document.pages.length <= 1) return;
    if (!window.confirm(`移除“${pageSummary(page, document.pages.indexOf(page))}”？`)) {
      return;
    }
    const index = document.pages.findIndex((candidate) => candidate.id === page.id);
    replaceDocument((next) => {
      next.pages = next.pages.filter((candidate) => candidate.id !== page.id);
      const usedSections = new Set(next.pages.map((candidate) => candidate.sectionId));
      next.sections = next.sections.filter((section) => usedSections.has(section.id));
    });
    const fallback = document.pages[index + 1] ?? document.pages[index - 1];
    if (fallback) selectPage(fallback);
  };

  const addBlock = () => {
    if (!document || !selectedPageId) return;
    const block = createBlock(newBlockType, document.images[0].id);
    replaceDocument((next) => {
      const page = next.pages.find((candidate) => candidate.id === selectedPageId);
      page?.blocks.push(block);
    });
    setInspectorTab("block");
  };

  const removeBlock = (block: TripBlock) => {
    if (!selectedPage || selectedPage.blocks.length <= 1) return;
    if (!window.confirm(`移除“${BLOCK_LABELS[block.type]}”内容块？`)) return;
    replaceDocument((next) => {
      const page = next.pages.find((candidate) => candidate.id === selectedPage.id);
      if (page) page.blocks = page.blocks.filter((candidate) => candidate.id !== block.id);
    });
  };

  const handleDrop = (
    event: DragEvent,
    target: DragTarget,
    targetIndex: number
  ) => {
    event.preventDefault();
    if (!dragTarget || !document) return;
    if (target.kind === "page") {
      const from = document.pages.findIndex((page) => page.id === dragTarget.id);
      movePage(from, targetIndex);
    }
    setDragTarget(null);
  };

  const uploadImage = async (file: File) => {
    if (!api || !document || !selectedPageId) return;
    const operation = beginOperation("upload");
    if (!operation) return;
    const requestedSlug = document.slug;
    const requestedPageId = selectedPageId;
    setError(null);
    try {
      const verified = await api.uploadImage(requestedSlug, file);
      const asset: TripImageAsset = {
        id: createEditorId("image"),
        filename: verified.filename,
        alt: { zh: file.name.replace(/\.[^.]+$/u, ""), en: "" },
      };
      const current = documentRef.current;
      if (
        current?.slug !== requestedSlug ||
        !current.pages.some((page) => page.id === requestedPageId)
      ) {
        setNotice(
          "图片已上传到 Blob，但原页面已切换或移除，因此没有自动加入草稿。"
        );
        return;
      }
      setDocument((latest) =>
        latest?.slug === requestedSlug &&
        latest.pages.some((page) => page.id === requestedPageId)
          ? addUploadedImage(latest, requestedPageId, asset)
          : latest
      );
      setInspectorTab("images");
      setNotice("图片已上传，并以单图内容块添加到当前页面。Blob 不会因后续移除而删除。");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      if (uploadInputRef.current) uploadInputRef.current.value = "";
      finishOperation(operation);
    }
  };

  const requestTranslation = async () => {
    if (!api || !snapshot || !document || !translationBaseline) return;
    const operation = beginOperation("translate");
    if (!operation) return;
    const requestedSlug = document.slug;
    const requestedRevision = documentRevisionRef.current;
    setError(null);
    setNotice(null);
    try {
      const changedPaths = collectChangedLocalizedPaths(
        translationBaseline,
        document
      );
      const translated = await api.translate(document.slug, {
        baseSha: snapshot.baseSha,
        baseBlobSha: snapshot.blobSha,
        document,
        changedPaths,
      });
      const translatedDocument = parseTripDocument(translated.document);
      if (
        !isEditorOperationCurrent(
          requestedSlug,
          requestedRevision,
          documentRef.current,
          documentRevisionRef.current
        )
      ) {
        setNotice("翻译完成，但草稿已继续修改，因此未覆盖当前内容。请重新生成英文。");
        return;
      }
      setDocument(translatedDocument);
      setTranslationBaseline(translatedDocument);
      setApprovalOpen(true);
      setNotice(
        changedPaths.length > 0
          ? `已翻译 ${changedPaths.length} 个中文字段，请完成双语审批。`
          : "没有待翻译文字，请完成双语审批。"
      );
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      finishOperation(operation);
    }
  };

  const publish = async () => {
    if (!api || !snapshot || !document) return;
    const operation = beginOperation("publish");
    if (!operation) return;
    const publishedSlug = document.slug;
    const publishedRevision = documentRevisionRef.current;
    setError(null);
    try {
      const result = await api.publish(publishedSlug, {
        approved: true,
        baseSha: snapshot.baseSha,
        baseBlobSha: snapshot.blobSha,
        document,
      });
      setPublishResult(result);
      setApprovalOpen(false);
      if (
        !isEditorOperationCurrent(
          publishedSlug,
          publishedRevision,
          documentRef.current,
          documentRevisionRef.current
        )
      ) {
        setNotice(
          "审批版本已发布；发布期间产生的本地修改仍保留在草稿中，请再次审批后发布。"
        );
        return;
      }
      window.sessionStorage.removeItem(editorDraftStorageKey(publishedSlug));
      setNotice(
        localPreview
          ? "预览已保存到本地内存；仓库和 GitHub Pages 均未更改。"
          : "发布成功。GitHub Pages 将通过现有工作流重新构建。"
      );
      const refreshed = await api.loadTrip(publishedSlug);
      const refreshedDocument = parseTripDocument(refreshed.document);
      setSnapshot(refreshed);
      setOriginal(refreshedDocument);
      setTranslationBaseline(refreshedDocument);
      setDocument(refreshedDocument);
      const list = await api.listTrips();
      setTrips(list.trips);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      finishOperation(operation);
    }
  };

  if (checkingSession) {
    return (
      <main className="editor-auth-state" aria-busy="true">
        <div className="editor-auth-card">
          <span className="editor-auth-mark">…</span>
          <h1>正在检查编辑会话</h1>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="editor-auth-state">
        <div className="editor-auth-card">
          <span className="editor-auth-mark">✎</span>
          <p className="editor-eyebrow">OWNER STUDIO</p>
          <h1>旅行日记编辑器</h1>
          <p>
            编辑器不会把旅程正文打包进静态页面。登录后，只有已登记的旅程会从安全 API
            加载。
          </p>
          {error && (
            <div className="editor-alert error" role="alert">
              {error}
            </div>
          )}
          <button
            className="editor-button primary"
            type="button"
            onClick={() =>
              void startMicrosoftAuthentication(window.location.href, "editor")
            }
          >
            使用 Microsoft 登录
          </button>
          <small>需要 TravelJournal.Edit 权限；私密口令不能进入编辑器。</small>
        </div>
      </main>
    );
  }

  return (
    <main className="editor-shell">
      <header className="editor-toolbar">
        <div>
          <p className="editor-eyebrow">OWNER STUDIO</p>
          <h1>旅行日记编辑器</h1>
        </div>
        <div className="editor-toolbar-actions">
          {localPreview && (
            <span className="editor-dirty-indicator">本地预览 · 不写入仓库</span>
          )}
          {dirty && <span className="editor-dirty-indicator">● 尚未发布</span>}
          <button
            type="button"
            className="editor-button secondary"
            onClick={signOut}
          >
            退出编辑
          </button>
          <button
            type="button"
            className="editor-button primary"
            disabled={!dirty || busy !== null}
            onClick={() => void requestTranslation()}
          >
            {busy === "translate" ? "正在翻译…" : "生成英文并审批"}
          </button>
        </div>
      </header>

      {error && (
        <div className="editor-global-message editor-alert error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)}>
            关闭
          </button>
        </div>
      )}
      {notice && (
        <div className="editor-global-message editor-alert success" role="status">
          <span>{notice}</span>
          {publishResult && !localPreview && (
            <a href={publishResult.commitUrl} target="_blank" rel="noreferrer">
              查看提交
            </a>
          )}
          <button type="button" onClick={() => setNotice(null)}>
            关闭
          </button>
        </div>
      )}

      <div className="editor-workspace">
        <aside className="editor-navigation" aria-label="旅程与页面">
          <section className="editor-trip-picker">
            <div className="editor-section-heading">
              <h2>当前旅程</h2>
              {loadingTrips && <span aria-label="正在载入">…</span>}
            </div>
            <label className="editor-trip-select">
              <span className="sr-only">选择已登记旅程</span>
              <select
                value={document?.slug ?? ""}
                disabled={busy !== null || loadingTrips || trips.length === 0}
                onChange={(event) => {
                  if (event.target.value) void loadTrip(event.target.value);
                }}
              >
                <option value="" disabled>
                  {tripPickerPlaceholder}
                </option>
                {trips.map((trip) => (
                  <option key={trip.slug} value={trip.slug}>
                    {trip.title.zh}
                  </option>
                ))}
              </select>
            </label>
            {selectedTrip && (
              <div className="editor-selected-trip">
                <strong>{selectedTrip.title.zh}</strong>
                <span>
                  {selectedTrip.dateRange} · {selectedTrip.location.zh}
                </span>
                {selectedTrip.private && <em>私密</em>}
              </div>
            )}
          </section>

          {document && (
            <>
              <section>
                <div className="editor-section-heading">
                  <h2>编辑内容</h2>
                  <button type="button" onClick={addPage}>
                    + 添加页面
                  </button>
                </div>
                <button
                  type="button"
                  className={
                    inspectorTab === "metadata" || inspectorTab === "images"
                      ? "editor-target-option active"
                      : "editor-target-option"
                  }
                  onClick={() => setInspectorTab("metadata")}
                >
                  <span aria-hidden="true">⌂</span>
                  <span>
                    <strong>总体信息</strong>
                    <small>标题、日期、封面、隐私与图片</small>
                  </span>
                </button>
                <ol className="editor-tree-list">
                  {document.pages.map((page, index) => (
                    <li
                      key={page.id}
                      draggable
                      onDragStart={() => setDragTarget({ kind: "page", id: page.id })}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) =>
                        handleDrop(event, { kind: "page", id: page.id }, index)
                      }
                    >
                      <button
                        type="button"
                        className={
                          inspectorTab === "block" && selectedPageId === page.id
                            ? "editor-tree-select active"
                            : "editor-tree-select"
                        }
                        onClick={() => selectPage(page)}
                      >
                        <span className="editor-drag-handle" aria-hidden="true">
                          ⋮⋮
                        </span>
                        <span>{pageSummary(page, index)}</span>
                      </button>
                      <ActionButtons
                        label={`第 ${index + 1} 页`}
                        index={index}
                        length={document.pages.length}
                        onMove={(nextIndex) => movePage(index, nextIndex)}
                        onDuplicate={() => {
                          const duplicate = duplicatePage(page);
                          replaceDocument((next) => {
                            next.pages.splice(index + 1, 0, duplicate);
                          });
                          selectPage(duplicate);
                        }}
                        onRemove={() => removePage(page)}
                        removeDisabled={document.pages.length <= 1}
                      />
                    </li>
                  ))}
                </ol>
              </section>

            </>
          )}
        </aside>

        <section className="editor-inspector" aria-label="内容属性">
          {!document || !selectedPage ? (
            <div className="editor-empty-state">
              <span>↖</span>
              <h2>选择一篇旅程开始编辑</h2>
              <p>这里只会显示 API 返回的已登记旅程，没有新建、删除或重命名入口。</p>
            </div>
          ) : (
            <>
              {recoverable && (
                <div className="editor-recovery" role="status">
                  <strong>找到本标签页保存的草稿</strong>
                  <p>
                    {recoverable.status === "safe"
                      ? "这篇旅程本身没有变化，可以安全恢复草稿。"
                      : "仓库中的这篇旅程已更新。为避免覆盖新内容，请下载草稿并手动合并。"}
                  </p>
                  <div>
                    {recoverable.status === "safe" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setDocument(recoverable.document);
                          setSelectedPageId(recoverable.document.pages[0].id);
                          setRecoverable(null);
                        }}
                      >
                        恢复草稿
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const blob = new Blob(
                            [JSON.stringify(recoverable.document, null, 2)],
                            { type: "application/json" }
                          );
                          const url = URL.createObjectURL(blob);
                          const link = window.document.createElement("a");
                          link.href = url;
                          link.download = `${recoverable.document.slug}-draft.json`;
                          link.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        下载草稿
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        window.sessionStorage.removeItem(
                          editorDraftStorageKey(document.slug)
                        );
                        setRecoverable(null);
                      }}
                    >
                      放弃草稿
                    </button>
                  </div>
                </div>
              )}
              {inspectorTab === "block" ? (
                <div className="editor-inspector-context">
                  <span>页面编辑</span>
                  <strong>
                    {pageSummary(
                      selectedPage,
                      document.pages.findIndex((page) => page.id === selectedPage.id)
                    )}
                  </strong>
                </div>
              ) : (
                <div className="editor-tabs" role="tablist" aria-label="总体信息面板">
                  {(
                    [
                      ["metadata", "总体信息"],
                      ["images", "图片"],
                    ] as const
                  ).map(([tab, label]) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={inspectorTab === tab}
                      className={inspectorTab === tab ? "active" : ""}
                      onClick={() => setInspectorTab(tab)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {inspectorTab === "metadata" && (
                <div className="editor-panel">
                  <div className="editor-panel-heading">
                    <div>
                      <p className="editor-eyebrow">TRIP METADATA</p>
                      <h2>总体信息</h2>
                    </div>
                    <span className="editor-readonly-slug">{document.slug}</span>
                  </div>
                  <label className="editor-field">
                    <span>中文标题</span>
                    <input
                      value={document.metadata.title.zh}
                      onChange={(event) =>
                        replaceDocument((next) => {
                          next.metadata.title = withZh(
                            next.metadata.title,
                            event.target.value
                          );
                        })
                      }
                    />
                  </label>
                  <label className="editor-field">
                    <span>中文副标题</span>
                    <textarea
                      rows={2}
                      value={document.metadata.subtitle.zh}
                      onChange={(event) =>
                        replaceDocument((next) => {
                          next.metadata.subtitle = withZh(
                            next.metadata.subtitle,
                            event.target.value
                          );
                        })
                      }
                    />
                  </label>
                  <label className="editor-field">
                    <span>地点</span>
                    <input
                      value={document.metadata.location.zh}
                      onChange={(event) =>
                        replaceDocument((next) => {
                          next.metadata.location = withZh(
                            next.metadata.location,
                            event.target.value
                          );
                        })
                      }
                    />
                  </label>
                  <div className="editor-form-row">
                    <label className="editor-field">
                      <span>排序日期</span>
                      <input
                        type="date"
                        value={document.metadata.date}
                        onChange={(event) =>
                          replaceDocument((next) => {
                            next.metadata.date = event.target.value;
                          })
                        }
                      />
                    </label>
                    <label className="editor-field">
                      <span>日期范围</span>
                      <input
                        value={document.metadata.dateRange}
                        onChange={(event) =>
                          replaceDocument((next) => {
                            next.metadata.dateRange = event.target.value;
                          })
                        }
                      />
                    </label>
                  </div>
                  <label className="editor-field">
                    <span>列表封面</span>
                    <select
                      value={document.metadata.coverImageId}
                      onChange={(event) =>
                        replaceDocument((next) => {
                          next.metadata.coverImageId = event.target.value;
                        })
                      }
                    >
                      {document.images.map((image) => (
                        <option key={image.id} value={image.id}>
                          {image.filename}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="editor-checkbox">
                    <input
                      type="checkbox"
                      checked={document.metadata.private}
                      onChange={(event) =>
                        replaceDocument((next) => {
                          next.metadata.private = event.target.checked;
                        })
                      }
                    />
                    <span>私密旅程（发布后继续由静态加密保护）</span>
                  </label>
                </div>
              )}

              {inspectorTab === "block" && (
                <div className="editor-panel">
                  <div className="editor-page-settings">
                    <h3>页面设置</h3>
                    <label className="editor-field">
                      <span>所属章节</span>
                      <select
                        value={selectedPage.sectionId}
                        onChange={(event) =>
                          replaceDocument((next) => {
                            const page = next.pages.find(
                              (candidate) => candidate.id === selectedPage.id
                            );
                            if (page) page.sectionId = event.target.value;
                          })
                        }
                      >
                        {document.sections.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.navigation?.label.zh ?? section.id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="editor-field">
                      <span>卡片样式</span>
                      <select
                        value={selectedPage.cardVariant ?? "default"}
                        onChange={(event) =>
                          replaceDocument((next) => {
                            const page = next.pages.find(
                              (candidate) => candidate.id === selectedPage.id
                            );
                            if (page) {
                              page.cardVariant = event.target.value as
                                | "default"
                                | "inset-cover";
                            }
                          })
                        }
                      >
                        <option value="default">默认</option>
                        <option value="inset-cover">内嵌封面</option>
                      </select>
                    </label>
                  </div>
                  <div className="editor-page-block-add">
                    <div>
                      <strong>页面内容</strong>
                      <span>{selectedPage.blocks.length} 个内容块</span>
                    </div>
                    <div className="editor-add-block">
                      <label>
                        <span className="sr-only">选择内容块类型</span>
                        <select
                          value={newBlockType}
                          onChange={(event) =>
                            setNewBlockType(event.target.value as TripBlock["type"])
                          }
                        >
                          {BLOCK_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {BLOCK_LABELS[type]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button type="button" onClick={addBlock}>
                        添加内容块
                      </button>
                    </div>
                  </div>
                  <div className="editor-inline-blocks">
                    {selectedPage.blocks.map((block, index) => (
                      <section className="editor-inline-block" key={block.id}>
                        <header className="editor-inline-block-header">
                          <div>
                            <span>内容块 {index + 1}</span>
                            <strong>{BLOCK_LABELS[block.type]}</strong>
                            <small>{blockSummary(block)}</small>
                          </div>
                          <ActionButtons
                            label={BLOCK_LABELS[block.type]}
                            index={index}
                            length={selectedPage.blocks.length}
                            onMove={(nextIndex) => moveBlock(index, nextIndex)}
                            onDuplicate={() => {
                              const duplicate = duplicateBlock(block);
                              replaceDocument((next) => {
                                const page = next.pages.find(
                                  (candidate) => candidate.id === selectedPage.id
                                );
                                page?.blocks.splice(index + 1, 0, duplicate);
                              });
                            }}
                            onRemove={() => removeBlock(block)}
                            removeDisabled={selectedPage.blocks.length <= 1}
                          />
                        </header>
                        <label className="editor-block-destination">
                          <span>移动到页面</span>
                          <select
                            value={selectedPage.id}
                            onChange={(event) =>
                              moveBlockToPage(block.id, event.target.value)
                            }
                          >
                            {document.pages.map((page, pageIndex) => (
                              <option key={page.id} value={page.id}>
                                {pageSummary(page, pageIndex)}
                              </option>
                            ))}
                          </select>
                        </label>
                        <BlockEditor
                          block={block}
                          images={document.images}
                          onChange={updateBlock}
                        />
                      </section>
                    ))}
                  </div>
                </div>
              )}

              {inspectorTab === "images" && (
                <div className="editor-panel">
                  <div className="editor-panel-heading">
                    <div>
                      <p className="editor-eyebrow">IMAGE LIBRARY</p>
                      <h2>图片</h2>
                    </div>
                    <button
                      type="button"
                      className="editor-button primary compact"
                      onClick={() => uploadInputRef.current?.click()}
                      disabled={localPreview || busy === "upload"}
                    >
                      {localPreview
                        ? "本地预览不支持上传"
                        : busy === "upload"
                          ? "上传中…"
                          : "+ 上传图片"}
                    </button>
                    <input
                      ref={uploadInputRef}
                      className="sr-only"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadImage(file);
                      }}
                    />
                  </div>
                  <p className="editor-help">
                    上传会直接写入旅程的 Blob 路径。移除只会从文档解除引用，不会删除原图。
                  </p>
                  <ul className="editor-image-list">
                    {document.images.map((image, index) => {
                      const used = referencedImageIds(document).has(image.id);
                      return (
                        <li key={image.id}>
                          <img
                            src={imageUrl(document.slug, image.filename)}
                            alt=""
                            aria-hidden="true"
                          />
                          <div>
                            <strong>{image.filename}</strong>
                            <span>{used ? "使用中" : "未使用"}</span>
                            <label className="editor-field">
                              <span>中文替代文字</span>
                              <input
                                value={image.alt.zh}
                                onChange={(event) =>
                                  replaceDocument((next) => {
                                    const asset = next.images.find(
                                      (candidate) => candidate.id === image.id
                                    );
                                    if (asset) {
                                      asset.alt = withZh(
                                        asset.alt,
                                        event.target.value
                                      );
                                    }
                                  })
                                }
                              />
                            </label>
                          </div>
                          <div className="editor-image-actions">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() =>
                                replaceDocument((next) => {
                                  next.images = moveItem(next.images, index, index - 1);
                                })
                              }
                              aria-label={`上移图片 ${image.filename}`}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              disabled={index === document.images.length - 1}
                              onClick={() =>
                                replaceDocument((next) => {
                                  next.images = moveItem(next.images, index, index + 1);
                                })
                              }
                              aria-label={`下移图片 ${image.filename}`}
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              disabled={document.images.length <= 1}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `从旅程中解除“${image.filename}”的所有引用？Blob 原图会保留。`
                                  )
                                ) {
                                  setDocument((current) =>
                                    current ? detachImage(current, image.id) : current
                                  );
                                }
                              }}
                            >
                              解除引用
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        <section className="editor-preview-panel" aria-label="实时预览">
          <header>
            <div>
              <p className="editor-eyebrow">LIVE PREVIEW</p>
              <h2>中文实时预览</h2>
            </div>
            <div className="editor-viewport-switch" role="group" aria-label="预览尺寸">
              {(["desktop", "tablet", "mobile"] as const).map((size) => (
                <button
                  type="button"
                  key={size}
                  className={viewport === size ? "active" : ""}
                  aria-pressed={viewport === size}
                  onClick={() => setViewport(size)}
                >
                  {size === "desktop" ? "桌面" : size === "tablet" ? "平板" : "手机"}
                </button>
              ))}
            </div>
          </header>
          <div className={`editor-preview-stage ${viewport}`}>
            {document ? (
              <div className="editor-preview-document">
                <div className="trip-content">
                  <TripDocumentRenderer
                    document={document}
                    locale="zh"
                    imageUrl={(filename) => imageUrl(document.slug, filename)}
                  />
                </div>
              </div>
            ) : (
              <div className="editor-preview-placeholder">
                <span>▧</span>
                <p>载入旅程后，这里会使用生产渲染器显示实时预览。</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {approvalOpen && document && (
        <ApprovalDialog
          document={document}
          localPreview={localPreview}
          publishing={busy === "publish"}
          onClose={() => setApprovalOpen(false)}
          onPublish={() => void publish()}
        />
      )}
    </main>
  );
}
