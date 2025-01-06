import { prisma } from "infra/prisma/prisma-client";
import { Trend } from "modules/accounts/domain/Trend";
import { TrendsMapper } from "modules/accounts/mappers/TrendMapper";
import { ITrendRepository } from "../ITrendRepository";

export class PrismaTrendsRepository implements ITrendRepository {
  async getTrending(): Promise<Trend[]> {
    const trends = await prisma.trend.findMany({
      select: {
        id: true,
        hashtag: true,
        counter: true,
        updatedAt: true,
      },
      orderBy: {
        counter: "desc",
      },
      take: 4,
    });

    return trends.map((trend) => TrendsMapper.toDomain(trend));
  }


  async create(hashtag: string): Promise<void> {
    const data = await TrendsMapper.toPersistence(hashtag)

    const existsHashtag = await prisma.trend.findFirst({
      where: {
        hashtag: hashtag,
      }
    });
    if (existsHashtag) {
      await prisma.trend.update({
        where: { id: existsHashtag.id },
        data: { counter: existsHashtag.counter + 1, updatedAt: new Date() }
      });
    } else {
      await prisma.trend.create({
        data: {
          ...data,
          hashtag: hashtag,
        }
      });
    }
  }

}
