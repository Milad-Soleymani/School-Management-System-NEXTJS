import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.upsert({
    where: { id: "admin1" },
    create: { id: "admin1", username: "admin1" },
    update: {},
  });
  await prisma.admin.upsert({
    where: { id: "admin2" },
    create: { id: "admin2", username: "admin2" },
    update: {},
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.upsert({
      where: { level: i },
      create: { level: i },
      update: {},
    });
  }

  // CLASS
  for (let i = 1; i <= 6; i++) {
    await prisma.class.upsert({
      where: { id: i },
      create: {
        id: i,
        name: `${i}A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
      update: {},
    });
  }

  // SUBJECT
  const subjectData = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "English" },
    { id: 4, name: "History" },
    { id: 5, name: "Geography" },
    { id: 6, name: "Physics" },
    { id: 7, name: "Chemistry" },
    { id: 8, name: "Biology" },
    { id: 9, name: "Computer Science" },
    { id: 10, name: "Art" },
  ];

  for (const subject of subjectData) {
    await prisma.subject.upsert({
      where: { id: subject.id },
      create: subject,
      update: {},
    });
  }

  // TEACHER
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.upsert({
      where: { id: `teacher${i}` },
      create: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 6) + 1 }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
      update: {},
    });
  }

  // LESSON
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.upsert({
      where: { id: i },
      create: {
        id: i,
        name: `Lesson${i}`,
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
      update: {},
    });
  }

  // PARENT
  for (let i = 1; i <= 25; i++) {
    await prisma.parent.upsert({
      where: { id: `parentId${i}` },
      create: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
      update: {},
    });
  }

  // STUDENT
  for (let i = 1; i <= 50; i++) {
    await prisma.student.upsert({
      where: { id: `student${i}` },
      create: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
        gradeId: (i % 6) + 1,
        classId: (i % 6) + 1,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
      update: {},
    });
  }

  // EXAM
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.upsert({
      where: { id: i },
      create: {
        id: i,
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: (i % 30) + 1,
      },
      update: {},
    });
  }

  // ASSIGNMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.upsert({
      where: { id: i },
      create: {
        id: i,
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: (i % 30) + 1,
      },
      update: {},
    });
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.upsert({
      where: { id: i },
      create: {
        id: i,
        score: 90,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
      update: {},
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.upsert({
      where: { id: i },
      create: {
        id: i,
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
      update: {},
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.upsert({
      where: { id: i },
      create: {
        id: i,
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 5) + 1,
      },
      update: {},
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.upsert({
      where: { id: i },
      create: {
        id: i,
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 5) + 1,
      },
      update: {},
    });
  }

  console.log("✅ Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
