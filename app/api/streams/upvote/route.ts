import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prismaClient } from '../../lib/db';

const UpVoteSchema = z.object({
    streamId: z.string()
});

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    
    //TODO: You can get rid of the DB call here
    const user = await prismaClient.user.findFirst({ 
        where : {
            email: session?.user?.email ?? ""
        }
     });

    if (!user) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 403 
        })    
    }

    try {
    const data = UpVoteSchema.parse(await req.json());

    await prismaClient.upvote.create({
        data: {
            userId: user.id,
            streamId: data.streamId
        }
    });
    } catch (e) { 
        console.error("Error while upvoting:", e);
        return NextResponse.json({
            message: "Error while upvoting"
        }, {
            status: 403 
        })  
    }
}