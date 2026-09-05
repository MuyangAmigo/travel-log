export const SHA = "1".repeat(40);
export const BLOB_SHA = "2".repeat(40);
export const TREE_SHA = "3".repeat(40);
export const COMMIT_SHA = "4".repeat(40);

export function minimalTripDocument(slug = "existing-trip") {
  return {
    version: 1,
    slug,
    metadata: {
      date: "2026-08-26",
      dateRange: "2026.08.26",
      coverImageId: "cover",
      title: { zh: "测试旅行", en: "Test Trip" },
      subtitle: { zh: "副标题", en: "Subtitle" },
      location: { zh: "测试地", en: "Testville" },
      private: false,
    },
    images: [
      {
        id: "cover",
        filename: "cover.jpeg",
        alt: { zh: "封面", en: "Cover" },
      },
    ],
    sections: [{ id: "overview" }],
    pages: [
      {
        id: "cover-page",
        sectionId: "overview",
        blocks: [
          {
            id: "cover-block",
            type: "cover",
            eyebrow: { zh: "旅行日记", en: "Travel Journal" },
            title: { zh: "慢慢走", en: "Take It Slow" },
            subtitle: { zh: "测试之旅", en: "A Test Journey" },
            date: { zh: "2026.08.26", en: "2026.08.26" },
            intro: { zh: "这是一次测试。", en: "This is a test." },
          },
        ],
      },
    ],
  };
}

export const editorConfig = {
  allowedOrigin: "https://muyangamigo.github.io",
  allowedReaderSubjects: ["owner-subject"],
  allowedSubject: "owner-subject",
  azureOpenAiApiKey: "server-only-openai-key",
  azureOpenAiApiVersion: "2024-10-21",
  azureOpenAiDeployment: "travel-translator",
  azureOpenAiEndpoint: "https://example.openai.azure.com",
  clientId: "11111111-2222-3333-4444-555555555555",
  githubAppId: "123",
  githubInstallationId: "456",
  githubPrivateKey:
    "-----BEGIN PRIVATE KEY-----\ninvalid-in-tests\n-----END PRIVATE KEY-----",
  githubRepository: "owner/travel-log",
  storageAccountName: "junjieblob",
  storageContainerName: "images",
};
