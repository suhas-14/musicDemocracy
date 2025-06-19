import { NextRequest, NextResponse } from 'next/server';
// This file is used to handle API requests for streams in the Vibe Vault application.
import { z } from 'zod';
import { prismaClient } from '../lib/db';
import youtubesearchapi from "youtube-search-api";
import { number } from 'zod/v4';

const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:\S+)?$/;


const CreateStreamSchema = z.object({
    "creatorId": z.string(),
    "url": z.string() //youtube, spotify, etc.
});

export async function POST(req: NextRequest) {
    try 
    { 
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.exec(data.url);

        if (!isYt) {
            return NextResponse.json({
            message: "Incorrect URL format. Please provide a valid YouTube URL."
        },{ 
            status: 400
        })
        }

        const extractedId = isYt[1];

        const res = (await youtubesearchapi.GetVideoDetails(extractedId));
        const YT_title = res.title;
        const thumbnail = res.thumbnail.thumbnails;
        thumbnail.sort((a: {width: number}, b: {width: number}) => a.width < b.width ? -1 : 1);

        const stream =await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: YT_title ?? "Oops! No title found for this video.",
                smallImgUrl: (thumbnail.length > 1 ? thumbnail[thumbnail.length - 2].url : thumbnail[thumbnail.length - 1].url) ?? "",
                largeImgUrl: thumbnail[thumbnail.length - 1].url ?? ""
            }
         });

        return NextResponse.json({
            message: "Stream added successfully",
            id: stream.id
        })
    } 
    catch (e) {
        console.error("Error while adding stream:", e);

        if (e instanceof SyntaxError) {
            return NextResponse.json({
                message: "Invalid JSON format in request body"
            }, { 
                status: 400
            });
        }

        return NextResponse.json({
            message: e instanceof z.ZodError
            ? "Validation error: " + e.errors[0].message
            : "Failed to create stream."
        }, { 
            status: e instanceof z.ZodError ? 422 : 500
        })
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where : {
            userId: creatorId ?? ""
        }
    });

    return NextResponse.json({
        streams
    })
}