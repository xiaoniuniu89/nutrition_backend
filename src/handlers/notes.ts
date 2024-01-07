import prisma from "../db";
import { startOfWeek, endOfWeek } from 'date-fns';

export const getDiaryEntries = async (req, res) => {
    try {
        const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
        const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });

        const notes = await prisma.diaryEntry.findMany({
            where: {
                userId: req.user.id, 
                createdAt: {
                    gte: startOfCurrentWeek,
                    lte: endOfCurrentWeek,
                },
            },
            orderBy: { createdAt: "asc" },
        });

        res.json({ data: notes });
    } catch (error) {
        console.error('Error fetching diary entries:', error);
        res.status(500).send('An error occurred while fetching diary entries');
    }
};
