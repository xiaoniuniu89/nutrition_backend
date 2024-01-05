import prisma from "../db";

export const getDiaryEtries = async (req, res) => {
    console.log(req)
    const notes = await prisma.diaryEntry.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
    });

    console.log(notes);

    res.json({ data: notes });
};