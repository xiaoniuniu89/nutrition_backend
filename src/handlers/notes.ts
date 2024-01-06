import prisma from "../db";
import { startOfWeek, endOfWeek, format } from 'date-fns';

export const getDiaryEtries = async (req, res) => {
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });

    const notes = await prisma.diaryEntry.findMany({
        where: { userId: req.user.id, createdAt: {
            gte: startOfCurrentWeek,
            lte: endOfCurrentWeek,
        }, },
        orderBy: { createdAt: "asc" },
    });

    // console.log(notes);

    res.json({ data: notes });
};