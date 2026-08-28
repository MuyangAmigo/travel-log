"use client";

import type { ReactNode } from "react";
import { createEditorId, moveItem } from "@/lib/editor-state";
import type {
  LocalizedText,
  TripBlock,
  TripImageAsset,
} from "@/lib/trip-document";

export const BLOCK_LABELS: Record<TripBlock["type"], string> = {
  cover: "封面",
  header: "章节标题",
  prose: "正文",
  gallery: "照片墙",
  timeline: "时间线",
  route: "路线",
  divider: "分隔线",
  note: "便签",
  highlight: "亮点",
  rating: "评分",
  shopping: "购物",
  expense: "账单",
  tags: "标签",
  ending: "结尾",
  stamp: "印章",
  spacer: "留白",
};

export const BLOCK_TYPES = Object.keys(BLOCK_LABELS) as TripBlock["type"][];

function withZh(value: LocalizedText, zh: string): LocalizedText {
  return { ...value, zh };
}

function optionalText(
  current: LocalizedText | undefined,
  zh: string
): LocalizedText | undefined {
  if (!zh.trim()) return undefined;
  return { zh, en: current?.en ?? "" };
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  multiline?: boolean;
}) {
  return (
    <Field
      label={label}
      value={value.zh}
      multiline={multiline}
      onChange={(zh) => onChange(withZh(value, zh))}
    />
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="editor-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function ItemActions({
  label,
  index,
  length,
  onMove,
  onDuplicate,
  onRemove,
  minimum = 1,
}: {
  label: string;
  index: number;
  length: number;
  onMove: (nextIndex: number) => void;
  onDuplicate?: () => void;
  onRemove: () => void;
  minimum?: number;
}) {
  return (
    <div className="editor-item-actions" aria-label={`${label}操作`}>
      <button
        type="button"
        onClick={() => onMove(index - 1)}
        disabled={index === 0}
        aria-label={`上移${label}`}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={() => onMove(index + 1)}
        disabled={index === length - 1}
        aria-label={`下移${label}`}
      >
        ↓
      </button>
      {onDuplicate && (
        <button type="button" onClick={onDuplicate} aria-label={`复制${label}`}>
          复制
        </button>
      )}
      <button
        type="button"
        onClick={onRemove}
        disabled={length <= minimum}
        aria-label={`移除${label}`}
      >
        移除
      </button>
    </div>
  );
}

function ImageOptions({
  images,
  allowNone = false,
}: {
  images: TripImageAsset[];
  allowNone?: boolean;
}) {
  return (
    <>
      {allowNone && <option value="">不使用图片</option>}
      {images.map((image) => (
        <option key={image.id} value={image.id}>
          {image.filename}
        </option>
      ))}
    </>
  );
}

function SpacingEditor({
  block,
  onChange,
}: {
  block: TripBlock;
  onChange: (block: TripBlock) => void;
}) {
  return (
    <div className="editor-form-row editor-spacing-fields">
      <SelectField
        label="上方间距"
        value={block.spacing?.top?.toString() ?? ""}
        onChange={(value) => {
          const top = value ? (Number(value) as 8 | 12 | 16 | 20 | 24) : undefined;
          const spacing = { ...block.spacing, top };
          onChange({
            ...block,
            spacing:
              spacing.top === undefined && spacing.bottom === undefined
                ? undefined
                : spacing,
          });
        }}
      >
        <option value="">默认</option>
        {[8, 12, 16, 20, 24].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </SelectField>
      <SelectField
        label="下方间距"
        value={block.spacing?.bottom?.toString() ?? ""}
        onChange={(value) => {
          const bottom = value ? (Number(value) as 8 | 12 | 16 | 20) : undefined;
          const spacing = { ...block.spacing, bottom };
          onChange({
            ...block,
            spacing:
              spacing.top === undefined && spacing.bottom === undefined
                ? undefined
                : spacing,
          });
        }}
      >
        <option value="">默认</option>
        {[8, 12, 16, 20].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </SelectField>
    </div>
  );
}

type Props = {
  block: TripBlock;
  images: TripImageAsset[];
  onChange: (block: TripBlock) => void;
};

export default function BlockEditor({ block, images, onChange }: Props) {
  let fields: ReactNode;

  switch (block.type) {
    case "cover":
      fields = (
        <>
          <LocalizedField
            label="眉题"
            value={block.eyebrow}
            onChange={(eyebrow) => onChange({ ...block, eyebrow })}
          />
          <LocalizedField
            label="封面标题"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
            multiline
          />
          <LocalizedField
            label="副标题"
            value={block.subtitle}
            onChange={(subtitle) => onChange({ ...block, subtitle })}
          />
          <LocalizedField
            label="日期文案"
            value={block.date}
            onChange={(date) => onChange({ ...block, date })}
          />
          <LocalizedField
            label="引言"
            value={block.intro}
            onChange={(intro) => onChange({ ...block, intro })}
            multiline
          />
          <div className="editor-form-row">
            <SelectField
              label="引言样式"
              value={block.introStyle ?? "default"}
              onChange={(introStyle) =>
                onChange({
                  ...block,
                  introStyle: introStyle as "default" | "quote",
                })
              }
            >
              <option value="default">默认</option>
              <option value="quote">引用</option>
            </SelectField>
            <SelectField
              label="引言宽度"
              value={block.introWidth?.zh ?? "medium"}
              onChange={(introWidth) =>
                onChange({
                  ...block,
                  introWidth: {
                    zh: introWidth as "narrow" | "medium" | "full",
                    en: introWidth as "narrow" | "medium" | "full",
                  },
                })
              }
            >
              <option value="narrow">窄</option>
              <option value="medium">中</option>
              <option value="full">满宽</option>
            </SelectField>
          </div>
          <div className="editor-form-row">
            <SelectField
              label="背景图片"
              value={block.backgroundImageId ?? ""}
              onChange={(backgroundImageId) =>
                onChange({
                  ...block,
                  backgroundImageId: backgroundImageId || undefined,
                })
              }
            >
              <ImageOptions images={images} allowNone />
            </SelectField>
            <SelectField
              label="封面印章"
              value={block.stamp?.variant ?? ""}
              onChange={(variant) =>
                onChange({
                  ...block,
                  stamp: variant
                    ? {
                        variant: variant as "circle" | "box",
                        text: block.stamp?.text ?? {
                          zh: "旅途印记",
                          en: "",
                        },
                      }
                    : undefined,
                })
              }
            >
              <option value="">不显示</option>
              <option value="circle">圆形</option>
              <option value="box">方形</option>
            </SelectField>
          </div>
          {block.stamp && (
            <LocalizedField
              label="封面印章文字"
              value={block.stamp.text}
              onChange={(text) =>
                onChange({ ...block, stamp: { ...block.stamp!, text } })
              }
            />
          )}
          <Field
            label="附加方章文字"
            value={block.boxStamp?.zh ?? ""}
            onChange={(zh) =>
              onChange({
                ...block,
                boxStamp: optionalText(block.boxStamp, zh),
              })
            }
          />
          {block.boxStamp && (
            <SelectField
              label="附加方章间距"
              value={block.boxStampSpacing ?? "default"}
              onChange={(boxStampSpacing) =>
                onChange({
                  ...block,
                  boxStampSpacing: boxStampSpacing as "default" | "relaxed",
                })
              }
            >
              <option value="default">默认</option>
              <option value="relaxed">宽松</option>
            </SelectField>
          )}
          <CheckboxField
            label="显示装饰分隔线"
            checked={block.separators ?? false}
            onChange={(separators) => onChange({ ...block, separators })}
          />
        </>
      );
      break;
    case "header":
      fields = (
        <>
          <div className="editor-form-row">
            <LocalizedField
              label="标记"
              value={block.markerLabel}
              onChange={(markerLabel) => onChange({ ...block, markerLabel })}
            />
            <LocalizedField
              label="序号"
              value={block.markerValue}
              onChange={(markerValue) => onChange({ ...block, markerValue })}
            />
          </div>
          <LocalizedField
            label="章节标题"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          <LocalizedField
            label="章节副标题"
            value={block.subtitle}
            onChange={(subtitle) => onChange({ ...block, subtitle })}
          />
          <div className="editor-form-row">
            <Field
              label="天气 / 图标"
              value={block.icon ?? ""}
              onChange={(icon) => onChange({ ...block, icon: icon || undefined })}
            />
            <SelectField
              label="标记样式"
              value={block.markerVariant ?? "standard"}
              onChange={(markerVariant) =>
                onChange({
                  ...block,
                  markerVariant: markerVariant as "standard" | "category",
                })
              }
            >
              <option value="standard">日期</option>
              <option value="category">分类</option>
            </SelectField>
          </div>
          <SelectField
            label="标记色彩"
            value={block.markerTone ?? "default"}
            onChange={(markerTone) =>
              onChange({
                ...block,
                markerTone: markerTone as "default" | "coral",
              })
            }
          >
            <option value="default">默认</option>
            <option value="coral">珊瑚色</option>
          </SelectField>
        </>
      );
      break;
    case "prose":
      fields = (
        <>
          <div className="editor-form-row">
            <SelectField
              label="文字样式"
              value={block.style ?? "body"}
              onChange={(style) =>
                onChange({
                  ...block,
                  style: style as "body" | "handwritten" | "handwritten-cn",
                })
              }
            >
              <option value="body">正文</option>
              <option value="handwritten">手写英文</option>
              <option value="handwritten-cn">手写中文</option>
            </SelectField>
            <SelectField
              label="对齐"
              value={block.align ?? "left"}
              onChange={(align) =>
                onChange({ ...block, align: align as "left" | "center" })
              }
            >
              <option value="left">左对齐</option>
              <option value="center">居中</option>
            </SelectField>
          </div>
          <SelectField
            label="正文宽度"
            value={block.width?.zh ?? "full"}
            onChange={(width) =>
              onChange({
                ...block,
                width: {
                  zh: width as "narrow" | "medium" | "full",
                  en: width as "narrow" | "medium" | "full",
                },
              })
            }
          >
            <option value="narrow">窄</option>
            <option value="medium">中</option>
            <option value="full">满宽</option>
          </SelectField>
          {block.paragraphs.map((paragraph, index) => (
            <div className="editor-subitem" key={index}>
              <LocalizedField
                label={`段落 ${index + 1}`}
                value={paragraph}
                onChange={(value) => {
                  const paragraphs = [...block.paragraphs];
                  paragraphs[index] = value;
                  onChange({ ...block, paragraphs });
                }}
                multiline
              />
              <ItemActions
                label={`段落 ${index + 1}`}
                index={index}
                length={block.paragraphs.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    paragraphs: moveItem(block.paragraphs, index, nextIndex),
                  })
                }
                onDuplicate={() => {
                  const paragraphs = [...block.paragraphs];
                  paragraphs.splice(index + 1, 0, structuredClone(paragraph));
                  onChange({ ...block, paragraphs });
                }}
                onRemove={() =>
                  onChange({
                    ...block,
                    paragraphs: block.paragraphs.filter(
                      (_, paragraphIndex) => paragraphIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                paragraphs: [...block.paragraphs, { zh: "新的段落", en: "" }],
              })
            }
          >
            + 添加段落
          </button>
        </>
      );
      break;
    case "gallery":
      fields = (
        <>
          <div className="editor-form-row">
            <SelectField
              label="网格"
              value={block.layout}
              onChange={(layout) =>
                onChange({
                  ...block,
                  layout: layout as typeof block.layout,
                })
              }
            >
              <option value="one">单图</option>
              <option value="two">双图</option>
              <option value="three">三图</option>
              <option value="four">四图</option>
              <option value="weighted-left">左侧大图</option>
              <option value="weighted-right">右侧大图</option>
            </SelectField>
            <SelectField
              label="样式"
              value={block.variant ?? "framed"}
              onChange={(variant) =>
                onChange({
                  ...block,
                  variant: variant as "framed" | "polaroid",
                })
              }
            >
              <option value="framed">卡片</option>
              <option value="polaroid">拍立得</option>
            </SelectField>
          </div>
          <SelectField
            label="照片墙宽度"
            value={block.width ?? "full"}
            onChange={(width) =>
              onChange({
                ...block,
                width: width as "full" | "medium" | "narrow",
              })
            }
          >
            <option value="full">满宽</option>
            <option value="medium">中</option>
            <option value="narrow">窄</option>
          </SelectField>
          {block.images.map((item, index) => (
            <div className="editor-subitem" key={`${item.imageId}-${index}`}>
              <div className="editor-form-row">
                <SelectField
                  label={`图片 ${index + 1}`}
                  value={item.imageId}
                  onChange={(imageId) => {
                    const nextImages = [...block.images];
                    nextImages[index] = { ...item, imageId };
                    onChange({ ...block, images: nextImages });
                  }}
                >
                  <ImageOptions images={images} />
                </SelectField>
                <SelectField
                  label="画幅"
                  value={item.shape ?? "landscape"}
                  onChange={(shape) => {
                    const nextImages = [...block.images];
                    nextImages[index] = {
                      ...item,
                      shape: shape as NonNullable<typeof item.shape>,
                    };
                    onChange({ ...block, images: nextImages });
                  }}
                >
                  <option value="square">方形</option>
                  <option value="landscape">横图</option>
                  <option value="wide">宽幅</option>
                  <option value="portrait">竖图</option>
                  <option value="hero">主视觉</option>
                </SelectField>
              </div>
              <Field
                label="覆盖替代文字（中文，可选）"
                value={item.alt?.zh ?? ""}
                onChange={(zh) => {
                  const nextImages = [...block.images];
                  nextImages[index] = {
                    ...item,
                    alt: optionalText(item.alt, zh),
                  };
                  onChange({ ...block, images: nextImages });
                }}
              />
              <Field
                label="图片说明（中文）"
                value={item.caption?.zh ?? ""}
                onChange={(zh) => {
                  const nextImages = [...block.images];
                  nextImages[index] = {
                    ...item,
                    caption: optionalText(item.caption, zh),
                  };
                  onChange({ ...block, images: nextImages });
                }}
                multiline
              />
              <div className="editor-form-row">
                <SelectField
                  label="色调"
                  value={item.tone ?? "normal"}
                  onChange={(tone) => {
                    const nextImages = [...block.images];
                    nextImages[index] = {
                      ...item,
                      tone: tone as NonNullable<typeof item.tone>,
                    };
                    onChange({ ...block, images: nextImages });
                  }}
                >
                  {["normal", "warm", "cool", "soft", "golden", "vivid", "crisp"].map(
                    (tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    )
                  )}
                </SelectField>
                <SelectField
                  label="倾斜"
                  value={item.tilt ?? "none"}
                  onChange={(tilt) => {
                    const nextImages = [...block.images];
                    nextImages[index] = {
                      ...item,
                      tilt: tilt as "none" | "left" | "right",
                    };
                    onChange({ ...block, images: nextImages });
                  }}
                >
                  <option value="none">不倾斜</option>
                  <option value="left">左倾</option>
                  <option value="right">右倾</option>
                </SelectField>
              </div>
              <SelectField
                label="画面焦点"
                value={item.focus ?? "center"}
                onChange={(focus) => {
                  const nextImages = [...block.images];
                  nextImages[index] = {
                    ...item,
                    focus: focus as "center" | "upper",
                  };
                  onChange({ ...block, images: nextImages });
                }}
              >
                <option value="center">居中</option>
                <option value="upper">上方</option>
              </SelectField>
              <ItemActions
                label={`图片 ${index + 1}`}
                index={index}
                length={block.images.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    images: moveItem(block.images, index, nextIndex),
                  })
                }
                onDuplicate={() => {
                  const nextImages = [...block.images];
                  nextImages.splice(index + 1, 0, structuredClone(item));
                  onChange({ ...block, images: nextImages });
                }}
                onRemove={() =>
                  onChange({
                    ...block,
                    images: block.images.filter(
                      (_, imageIndex) => imageIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                images: [...block.images, { imageId: images[0].id }],
              })
            }
          >
            + 添加图片
          </button>
        </>
      );
      break;
    case "timeline":
      fields = (
        <>
          {block.items.map((item, index) => (
            <div className="editor-subitem" key={item.id}>
              <div className="editor-form-row">
                <LocalizedField
                  label="时间"
                  value={item.time}
                  onChange={(time) => {
                    const items = [...block.items];
                    items[index] = { ...item, time };
                    onChange({ ...block, items });
                  }}
                />
                <LocalizedField
                  label="事件"
                  value={item.event}
                  onChange={(event) => {
                    const items = [...block.items];
                    items[index] = { ...item, event };
                    onChange({ ...block, items });
                  }}
                />
              </div>
              <LocalizedField
                label="细节"
                value={item.detail}
                onChange={(detail) => {
                  const items = [...block.items];
                  items[index] = { ...item, detail };
                  onChange({ ...block, items });
                }}
                multiline
              />
              <ItemActions
                label={`时间线项目 ${index + 1}`}
                index={index}
                length={block.items.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    items: moveItem(block.items, index, nextIndex),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...block,
                    items: block.items.filter(
                      (_, itemIndex) => itemIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                items: [
                  ...block.items,
                  {
                    id: createEditorId("timeline-item"),
                    time: { zh: "12:00", en: "" },
                    event: { zh: "新的行程", en: "" },
                    detail: { zh: "补充细节", en: "" },
                  },
                ],
              })
            }
          >
            + 添加时间点
          </button>
        </>
      );
      break;
    case "route":
      fields = (
        <>
          <CheckboxField
            label="紧凑显示"
            checked={block.compact ?? false}
            onChange={(compact) => onChange({ ...block, compact })}
          />
          {block.stops.map((stop, index) => (
            <div className="editor-subitem" key={stop.id}>
              <div className="editor-form-row">
                <Field
                  label="图标"
                  value={stop.icon}
                  onChange={(icon) => {
                    const stops = [...block.stops];
                    stops[index] = { ...stop, icon };
                    onChange({ ...block, stops });
                  }}
                />
                <LocalizedField
                  label={`地点 ${index + 1}`}
                  value={stop.label}
                  onChange={(label) => {
                    const stops = [...block.stops];
                    stops[index] = { ...stop, label };
                    onChange({ ...block, stops });
                  }}
                />
              </div>
              <ItemActions
                label={`路线站点 ${index + 1}`}
                index={index}
                length={block.stops.length}
                minimum={2}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    stops: moveItem(block.stops, index, nextIndex),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...block,
                    stops: block.stops.filter(
                      (_, stopIndex) => stopIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                stops: [
                  ...block.stops,
                  {
                    id: createEditorId("route-stop"),
                    icon: "📍",
                    label: { zh: "新地点", en: "" },
                  },
                ],
              })
            }
          >
            + 添加站点
          </button>
        </>
      );
      break;
    case "divider":
      fields = (
        <Field
          label="分隔图标"
          value={block.icon}
          onChange={(icon) => onChange({ ...block, icon })}
        />
      );
      break;
    case "note":
      fields = (
        <>
          <SelectField
            label="便签样式"
            value={block.variant ?? "note"}
            onChange={(variant) =>
              onChange({ ...block, variant: variant as "note" | "warning" })
            }
          >
            <option value="note">普通便签</option>
            <option value="warning">提醒</option>
          </SelectField>
          <LocalizedField
            label="标题"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          <LocalizedField
            label="内容"
            value={block.body}
            onChange={(body) => onChange({ ...block, body })}
            multiline
          />
        </>
      );
      break;
    case "highlight":
      fields = (
        <>
          <SelectField
            label="亮点样式"
            value={block.tone ?? "default"}
            onChange={(tone) =>
              onChange({ ...block, tone: tone as "default" | "warning" })
            }
          >
            <option value="default">默认</option>
            <option value="warning">提醒</option>
          </SelectField>
          <LocalizedField
            label="标题"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          <LocalizedField
            label="内容"
            value={block.body}
            onChange={(body) => onChange({ ...block, body })}
            multiline
          />
        </>
      );
      break;
    case "rating":
      fields = (
        <>
          <SelectField
            label="评分样式"
            value={block.tone ?? "default"}
            onChange={(tone) =>
              onChange({ ...block, tone: tone as "default" | "warning" })
            }
          >
            <option value="default">默认</option>
            <option value="warning">提醒</option>
          </SelectField>
          <SelectField
            label="评分星形"
            value={block.starStyle ?? "solid"}
            onChange={(starStyle) =>
              onChange({ ...block, starStyle: starStyle as "solid" | "emoji" })
            }
          >
            <option value="solid">实心星</option>
            <option value="emoji">彩色星</option>
          </SelectField>
          <LocalizedField
            label="评分标题"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          {block.items.map((item, index) => (
            <div className="editor-subitem" key={item.id}>
              <div className="editor-form-row">
                <LocalizedField
                  label="项目"
                  value={item.name}
                  onChange={(name) => {
                    const items = [...block.items];
                    items[index] = { ...item, name };
                    onChange({ ...block, items });
                  }}
                />
                <SelectField
                  label="分数"
                  value={item.score === undefined ? "" : String(item.score)}
                  onChange={(score) => {
                    const items = [...block.items];
                    if (score === "") {
                      const { score: _removed, ...withoutScore } = item;
                      items[index] = withoutScore;
                    } else {
                      items[index] = { ...item, score: Number(score) };
                    }
                    onChange({ ...block, items });
                  }}
                >
                  <option value="">不显示评分</option>
                  {[0, 1, 2, 3, 4, 5].map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </SelectField>
              </div>
              <LocalizedField
                label="评价"
                value={item.comment}
                onChange={(comment) => {
                  const items = [...block.items];
                  items[index] = { ...item, comment };
                  onChange({ ...block, items });
                }}
                multiline
              />
              <ItemActions
                label={`评分项目 ${index + 1}`}
                index={index}
                length={block.items.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    items: moveItem(block.items, index, nextIndex),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...block,
                    items: block.items.filter(
                      (_, itemIndex) => itemIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                items: [
                  ...block.items,
                  {
                    id: createEditorId("rating-item"),
                    name: { zh: "新项目", en: "" },
                    score: 5,
                    comment: { zh: "写下评价", en: "" },
                  },
                ],
              })
            }
          >
            + 添加评分
          </button>
        </>
      );
      break;
    case "shopping":
      fields = (
        <>
          <SelectField
            label="价格位置"
            value={block.pricePosition ?? "before-detail"}
            onChange={(pricePosition) =>
              onChange({
                ...block,
                pricePosition: pricePosition as "before-detail" | "after-detail",
              })
            }
          >
            <option value="before-detail">说明之前</option>
            <option value="after-detail">说明之后</option>
          </SelectField>
          {block.products.map((product, index) => (
            <div className="editor-subitem" key={product.id}>
              <div className="editor-form-row">
                <LocalizedField
                  label="商品"
                  value={product.name}
                  onChange={(name) => {
                    const products = [...block.products];
                    products[index] = { ...product, name };
                    onChange({ ...block, products });
                  }}
                />
                <LocalizedField
                  label="价格"
                  value={product.price}
                  onChange={(price) => {
                    const products = [...block.products];
                    products[index] = { ...product, price };
                    onChange({ ...block, products });
                  }}
                />
              </div>
              <SelectField
                label="商品图片"
                value={product.imageId ?? ""}
                onChange={(imageId) => {
                  const products = [...block.products];
                  products[index] = {
                    ...product,
                    imageId: imageId || undefined,
                  };
                  onChange({ ...block, products });
                }}
              >
                <ImageOptions images={images} allowNone />
              </SelectField>
              <Field
                label="说明"
                value={product.detail?.zh ?? ""}
                onChange={(zh) => {
                  const products = [...block.products];
                  products[index] = {
                    ...product,
                    detail: optionalText(product.detail, zh),
                  };
                  onChange({ ...block, products });
                }}
              />
              <ItemActions
                label={`商品 ${index + 1}`}
                index={index}
                length={block.products.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    products: moveItem(block.products, index, nextIndex),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...block,
                    products: block.products.filter(
                      (_, productIndex) => productIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                products: [
                  ...block.products,
                  {
                    id: createEditorId("product"),
                    name: { zh: "新商品", en: "" },
                    price: { zh: "¥0", en: "" },
                  },
                ],
              })
            }
          >
            + 添加商品
          </button>
        </>
      );
      break;
    case "expense":
      fields = (
        <>
          <Field
            label="账单标题"
            value={block.title?.zh ?? ""}
            onChange={(zh) =>
              onChange({ ...block, title: optionalText(block.title, zh) })
            }
          />
          {block.rows.map((row, index) => (
            <div className="editor-subitem" key={row.id}>
              <div className="editor-form-row">
                <LocalizedField
                  label="项目"
                  value={row.label}
                  onChange={(label) => {
                    const rows = [...block.rows];
                    rows[index] = { ...row, label };
                    onChange({ ...block, rows });
                  }}
                />
                <LocalizedField
                  label="金额"
                  value={row.amount}
                  onChange={(amount) => {
                    const rows = [...block.rows];
                    rows[index] = { ...row, amount };
                    onChange({ ...block, rows });
                  }}
                />
              </div>
              <Field
                label="明细"
                value={row.detail?.zh ?? ""}
                onChange={(zh) => {
                  const rows = [...block.rows];
                  rows[index] = {
                    ...row,
                    detail: optionalText(row.detail, zh),
                  };
                  onChange({ ...block, rows });
                }}
              />
              <CheckboxField
                label="总计行"
                checked={row.total ?? false}
                onChange={(total) => {
                  const rows = [...block.rows];
                  rows[index] = { ...row, total };
                  onChange({ ...block, rows });
                }}
              />
              <ItemActions
                label={`账单项目 ${index + 1}`}
                index={index}
                length={block.rows.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    rows: moveItem(block.rows, index, nextIndex),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...block,
                    rows: block.rows.filter(
                      (_, rowIndex) => rowIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                rows: [
                  ...block.rows,
                  {
                    id: createEditorId("expense-row"),
                    label: { zh: "新项目", en: "" },
                    amount: { zh: "¥0", en: "" },
                  },
                ],
              })
            }
          >
            + 添加账单项
          </button>
        </>
      );
      break;
    case "tags":
      fields = (
        <>
          <SelectField
            label="标签样式"
            value={block.variant ?? "outlined"}
            onChange={(variant) =>
              onChange({
                ...block,
                variant: variant as "outlined" | "colored",
              })
            }
          >
            <option value="outlined">描边</option>
            <option value="colored">彩色</option>
          </SelectField>
          {block.items.map((item, index) => (
            <div className="editor-subitem" key={item.id}>
              <div className="editor-form-row">
                <LocalizedField
                  label="标签"
                  value={item.label}
                  onChange={(label) => {
                    const items = [...block.items];
                    items[index] = { ...item, label };
                    onChange({ ...block, items });
                  }}
                />
                <SelectField
                  label="颜色"
                  value={item.tone}
                  onChange={(tone) => {
                    const items = [...block.items];
                    items[index] = {
                      ...item,
                      tone: tone as typeof item.tone,
                    };
                    onChange({ ...block, items });
                  }}
                >
                  {["gold", "coral", "teal", "blue", "pink", "red", "yellow", "green"].map(
                    (tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    )
                  )}
                </SelectField>
              </div>
              <ItemActions
                label={`标签 ${index + 1}`}
                index={index}
                length={block.items.length}
                onMove={(nextIndex) =>
                  onChange({
                    ...block,
                    items: moveItem(block.items, index, nextIndex),
                  })
                }
                onRemove={() =>
                  onChange({
                    ...block,
                    items: block.items.filter(
                      (_, itemIndex) => itemIndex !== index
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            className="editor-inline-add"
            type="button"
            onClick={() =>
              onChange({
                ...block,
                items: [
                  ...block.items,
                  {
                    id: createEditorId("tag"),
                    label: { zh: "新标签", en: "" },
                    tone: "red",
                  },
                ],
              })
            }
          >
            + 添加标签
          </button>
        </>
      );
      break;
    case "ending":
      fields = (
        <>
          <Field
            label="图标"
            value={block.flag ?? ""}
            onChange={(flag) => onChange({ ...block, flag: flag || undefined })}
          />
          <LocalizedField
            label="结尾标题"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          <LocalizedField
            label="结尾副标题"
            value={block.subtitle}
            onChange={(subtitle) => onChange({ ...block, subtitle })}
          />
          <Field
            label="印章文字"
            value={block.stamp?.zh ?? ""}
            onChange={(zh) =>
              onChange({ ...block, stamp: optionalText(block.stamp, zh) })
            }
          />
        </>
      );
      break;
    case "stamp":
      fields = (
        <>
          <LocalizedField
            label="印章文字"
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
          <SelectField
            label="角度"
            value={block.tilt ?? "left"}
            onChange={(tilt) =>
              onChange({ ...block, tilt: tilt as "left" | "none" })
            }
          >
            <option value="left">左倾</option>
            <option value="none">水平</option>
          </SelectField>
        </>
      );
      break;
    case "spacer":
      fields = <p className="editor-help">留白块没有文字内容，可通过下方间距调整高度。</p>;
      break;
  }

  return (
    <div className="editor-block-form">
      <h3>{BLOCK_LABELS[block.type]}</h3>
      {fields}
      <SpacingEditor block={block} onChange={onChange} />
    </div>
  );
}
