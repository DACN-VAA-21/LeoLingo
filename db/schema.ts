import { Description } from "@radix-ui/react-dialog";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Bảng khoá học (courses)
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // Khóa chính tự tăng
  title: text("title").notNull(), // Tiêu đề của khóa học, bắt buộc
  imageSrc: text("image_src").notNull(), // Đường dẫn hình ảnh đại diện của khóa học, bắt buộc
});

// Định nghĩa mối quan hệ của bảng khoá học với các bảng khác như user_progress và units
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress), // Một khoá học có thể có nhiều tiến độ người dùng
  units: many(units), // Một khoá học có thể có nhiều chương
}));

// Bảng các chương học (units)
export const units = pgTable("units", {
  id: serial("id").primaryKey(), // Khóa chính tự tăng
  title: text("title").notNull(), // Tiêu đề của chương, bắt buộc
  description: text("description").notNull(), // Mô tả của chương, bắt buộc
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" }) // Khóa ngoại liên kết với bảng courses
    .notNull(),
  order: integer("order").notNull(), // Thứ tự của chương trong khoá học
});

// Định nghĩa mối quan hệ giữa bảng units và courses
export const unitRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    // Một chương thuộc một khoá học
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons), // Một chương có thể có nhiều bài học
}));

// Bảng các bài học (lessons)
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(), // Khóa chính tự tăng
  title: text("title").notNull(), // Tiêu đề của bài học, bắt buộc
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" }) // Khóa ngoại liên kết với bảng units
    .notNull(),
  order: integer("order").notNull(),
});

// Định nghĩa mối quan hệ của bảng lessons
export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    // Một bài học thuộc một chương
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges), // Một bài học có thể có nhiều thử thách
}));

// Enum (liệt kê) cho loại thử thách
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

// Bảng các thử thách (challenges)
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(), // Khóa chính tự tăng
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" }) // Khóa ngoại liên kết với bảng lessons
    .notNull(),
  type: challengesEnum("type").notNull(), // Loại thử thách, bắt buộc
  question: text("question").notNull(), // Câu hỏi của thử thách, bắt buộc
  order: integer("order").notNull(), // Thứ tự của thử thách trong bài học
});

// Định nghĩa mối quan hệ của bảng challenges
export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    // Một thử thách thuộc một bài học
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions), // Một thử thách có thể có nhiều lựa chọn
  challengeProgress: many(challengeProgress), // Nhiều tiến độ thử thách có thể gắn với thử thách này
}));

// Bảng các lựa chọn thử thách (challenge_options)
export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(), // Khóa chính tự tăng
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" }) // Khóa ngoại liên kết với bảng challenges
    .notNull(),
  text: text("text").notNull(), // Văn bản lựa chọn, bắt buộc
  correct: boolean("correct").notNull(), // Đúng hoặc sai, bắt buộc
  imageSrc: text("image_src"), // Đường dẫn hình ảnh (nếu có)
  audioSrc: text("audio_src"), // Đường dẫn âm thanh (nếu có)
});

// Định nghĩa mối quan hệ của bảng challenge_options
export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      // Một lựa chọn thuộc về một thử thách
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

// Bảng lưu tiến độ thử thách của người dùng (challenge_progress)
export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(), // Khóa chính tự tăng
  userId: text("user_id").notNull(), // ID người dùng tham gia thử thách, bắt buộc
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" }) // Khóa ngoại liên kết với bảng challenges
    .notNull(),
  completed: boolean("completed").notNull().default(false), // Trạng thái hoàn thành
});

// Định nghĩa mối quan hệ của bảng challenge_progress
export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      // Một tiến độ thử thách thuộc về một thử thách
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

// Bảng lưu tiến độ của người dùng (user_progress)
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(), // ID người dùng là khóa chính
  userName: text("user_name").notNull().default("User"), // Tên người dùng, bắt buộc
  userImageSrc: text("user_image_src").notNull().default("/blink.png"), // Ảnh đại diện của người dùng
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }), // Khóa ngoại liên kết với khóa học hiện tại
  hearts: integer("hearts").notNull().default(5), // Số mạng của người dùng
  points: integer("points").notNull().default(0), // Điểm của người dùng
});

// Định nghĩa mối quan hệ của bảng user_progress
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    // Một tiến độ người dùng có liên kết với một khóa học
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

//======================================== Merge code
// Bảng phonemes
export const phonemes = pgTable("phonemes", {
  id: serial("id").primaryKey(), // ID tự động tăng
  description: text("description"), // Mô tả âm vị
  course_id: integer("course_id")
    .references(() => courses.id)
    .notNull(), // Liên kết với courses
  symbol: varchar("symbol", { length: 10 }).notNull(), // Ký hiệu âm vị
  audio_url: varchar("audio_url", { length: 255 }), // URL âm thanh
  example_word: varchar("example_word", { length: 100 }), // Từ ví dụ
});

// Bảng sentences
export const sentences = pgTable("sentences", {
  id: serial("id").primaryKey(),
  phoneme_id: integer("phoneme_id")
    .references(() => phonemes.id)
    .notNull(), // Khóa ngoại liên kết với bảng phonemes
  sentence: varchar("sentence", { length: 255 }), // Câu chứa từ vựng
  sentence_symbol: varchar("sentence_symbol", { length: 255 }), // Ký hiệu phiên âm
});

// Định nghĩa mối quan hệ của bảng sentences
export const sentenceRelations = relations(sentences, ({ one }) => ({
  phoneme: one(phonemes, {
    fields: [sentences.phoneme_id],
    references: [phonemes.id],
  }),
}));

// Định nghĩa mối quan hệ của bảng phonemes với các bảng khác như courses và vocabulary
export const phonemesRelations = relations(phonemes, ({ one, many }) => ({
  course: one(courses, {
    fields: [phonemes.course_id], // Khoá ngoại từ bảng phonemes
    references: [courses.id], // Khoá chính từ bảng courses
  }),
  vocabularies: many(vocabulary), // Một phiên âm có thể liên kết với nhiều từ vựng
  sentences: many(sentences), // Một từ có thể có nhiều câu liên quan.
}));

// Bảng vocabulary (liên kết gián tiếp với courses qua phonemes)
export const vocabulary = pgTable("vocabulary", {
  id: serial("id").primaryKey(), // ID tự động tăng
  course_id: integer("course_id")
    .references(() => courses.id)
    .notNull(), // Liên kết với courses
  word: varchar("word", { length: 50 }).notNull(), // Từ vựng
  phoneme_id: integer("phoneme_id")
    .references(() => phonemes.id)
    .notNull(), // Liên kết với phonemes
});

// Định nghĩa mối quan hệ của bảng vocabulary
export const vocabularyRelations = relations(vocabulary, ({ one, many }) => ({
  phoneme: one(phonemes, {
    fields: [vocabulary.phoneme_id],
    references: [phonemes.id],
  }),
}));
