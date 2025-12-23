"use server";

import { db } from "@/db";
import { ratings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function ratePlugin(pluginId: string, newRating: number) {
  if (newRating < 1 || newRating > 5) return { error: "Invalid rating" };

  try {
    const existing = await db.query.ratings.findFirst({
      where: eq(ratings.pluginId, pluginId),
    });

    if (existing) {
      const newTotal = existing.totalRatings + 1;
      const newAverage = (existing.averageRating * existing.totalRatings + newRating) / newTotal;

      await db
        .update(ratings)
        .set({
          averageRating: newAverage,
          totalRatings: newTotal,
          updatedAt: new Date(),
        })
        .where(eq(ratings.pluginId, pluginId));
    } else {
      await db.insert(ratings).values({
        pluginId,
        averageRating: newRating,
        totalRatings: 1,
        updatedAt: new Date(),
      });
    }

    // @ts-ignore - revalidateTag in Next.js 15/16 might have different signature in some environments
    revalidateTag("ratings");
    return { success: true };
  } catch (error) {
    console.error("Error rating plugin:", error);
    return { error: "Failed to save rating" };
  }
}
